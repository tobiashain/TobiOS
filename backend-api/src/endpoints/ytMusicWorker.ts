export default {
  async fetch(req: Request, env: any, ctx: ExecutionContext) {
    try {
      const url = new URL(req.url);

      // ---- IMAGE PROXY ----
      if (url.pathname === "/api/image") {
        const imageUrl = url.searchParams.get("url");
        if (!imageUrl) return new Response("Missing url", { status: 400 });

        const res = await fetch(imageUrl, {
          headers: { "User-Agent": "Mozilla/5.0" },
        });

        return new Response(res.body, {
          headers: {
            "Content-Type": res.headers.get("Content-Type") || "image/jpeg",
            "Cache-Control": "public, max-age=86400",
            "Access-Control-Allow-Origin": "*",
          },
        });
      }

      const idsParam = url.searchParams.get("ids");
      if (!idsParam) return new Response("Missing ids param", { status: 400 });

      const ids = idsParam.split(",");
      const workerBase = `${url.protocol}//${url.host}`;

      // ---- EDGE CACHE ----
      const cache = caches.default;
      const cacheKey = new Request(req.url, req);
      const cached = await cache.match(cacheKey);
      if (cached) return withCors(cached);

      // ---- IN-MEMORY CACHE ----
      const memoryCache: Map<string, any> =
        (globalThis as any).__artistCache ||
        ((globalThis as any).__artistCache = new Map());

      const ytMusicRequest = async (endpoint: string, body: any) => {
        const res = await fetch(
          `https://music.youtube.com/youtubei/v1/${endpoint}?prettyPrint=false`,
          {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
              context: {
                client: {
                  clientName: "WEB_REMIX",
                  clientVersion: "1.20240201.01.00",
                },
              },
              ...body,
            }),
          },
        );
        return res.json();
      };

      // Proxy image URLs through worker to avoid rate limits
      const proxyImage = (rawUrl: string) =>
        rawUrl
          ? `${workerBase}/api/image?url=${encodeURIComponent(rawUrl)}`
          : "";

      const extractTracks = (sections: any[]) => {
        // Try musicShelfRenderer first, then musicCarouselShelfRenderer
        for (const s of sections) {
          const shelf = s.musicShelfRenderer || s.musicCarouselShelfRenderer;
          if (!shelf) continue;

          const title = shelf.title?.runs?.[0]?.text?.toLowerCase() || "";
          // Accept any shelf that looks like songs/tracks, OR just grab first shelf as fallback
          const isSongShelf =
            title.includes("song") ||
            title.includes("track") ||
            title.includes("popular");

          if (!isSongShelf) continue;

          const contents = shelf.contents || [];
          return contents
            .map((item: any) => {
              const r =
                item.musicResponsiveListItemRenderer ||
                item.musicTwoRowItemRenderer;
              if (!r) return null;

              const title =
                r?.flexColumns?.[0]?.musicResponsiveListItemFlexColumnRenderer
                  ?.text?.runs?.[0]?.text || r?.title?.runs?.[0]?.text;

              const videoId =
                r?.playlistItemData?.videoId ||
                r?.navigationEndpoint?.watchEndpoint?.videoId ||
                r?.overlay?.musicItemThumbnailOverlayRenderer?.content
                  ?.musicPlayButtonRenderer?.playNavigationEndpoint
                  ?.watchEndpoint?.videoId;

              const rawImage =
                r?.thumbnail?.musicThumbnailRenderer?.thumbnail?.thumbnails?.slice(
                  -1,
                )[0]?.url || "";

              if (!title || !videoId) return null;

              return {
                name: title,
                url: `https://music.youtube.com/watch?v=${videoId}`,
                image: proxyImage(rawImage),
              };
            })
            .filter(Boolean);
        }

        return [];
      };

      const fetchArtist = async (browseId: string) => {
        if (memoryCache.has(browseId)) return memoryCache.get(browseId);

        const data: any = await ytMusicRequest("browse", { browseId });

        const header =
          data.header?.musicImmersiveHeaderRenderer ||
          data.header?.musicVisualHeaderRenderer;

        const tabs =
          data.contents?.singleColumnBrowseResultsRenderer?.tabs || [];
        const sections =
          tabs[0]?.tabRenderer?.content?.sectionListRenderer?.contents || [];

        const tracks = extractTracks(sections);

        const rawArtistImage =
          header?.thumbnail?.musicThumbnailRenderer?.thumbnail?.thumbnails?.slice(
            -1,
          )[0]?.url || "";

        const artist = {
          name: header?.title?.runs?.[0]?.text || "Unknown Artist",
          image: proxyImage(rawArtistImage),
          url: `https://music.youtube.com/channel/${browseId}`,
          tracks,
        };

        memoryCache.set(browseId, artist);
        return artist;
      };

      const artists = await Promise.all(ids.map(fetchArtist));

      const responseBody = {
        artists: {
          artist: artists.map((a) => ({
            followers: 0,
            genres: [],
            image: a.image,
            name: a.name,
            url: a.url,
          })),
        },
        tracks: {
          artist: artists.map((a) => ({ track: a.tracks })),
        },
      };

      const response = new Response(JSON.stringify(responseBody), {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=300",
        },
      });

      ctx.waitUntil(cache.put(cacheKey, response.clone()));
      return withCors(response);
    } catch (err) {
      console.error("YT Music Worker error:", err);
      return new Response("Internal Server Error", { status: 500 });
    }
  },
};

function withCors(response: Response): Response {
  const headers = new Headers(response.headers);
  headers.set("Access-Control-Allow-Origin", "*");
  headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type");
  return new Response(response.body, { status: response.status, headers });
}
