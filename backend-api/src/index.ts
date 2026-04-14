import getSpotifyArtists from "./endpoints/getSpotifyArtists";
import getSpotifyTracks from "./endpoints/getSpotifyTracks";
import ytMusicWorker from "./endpoints/ytMusicWorker";

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext,
  ): Promise<Response> {
    const url = new URL(request.url);
    const { pathname } = url;

    if (pathname === "/api/spotify" && request.method === "GET") {
      const ids =
        "1t20wYnTiAT0Bs7H1hv9Wt,6f0SUJsj1yDGVOIChVQCwc,77SW9BnxLY8rJ0RciFqkHh,25jJ6vyXwTRa0e6XCcdR6U,3dz0NnIZhtKKeXZxLOxCam";
      const [artists, tracks] = await Promise.all([
        getSpotifyArtists(request, env, ctx, ids),
        getSpotifyTracks(request, env, ctx, ids),
      ]);
      return withCors(Response.json({ artists, tracks }));
    }

    if (pathname === "/api/ytmusic" && request.method === "GET") {
      const ids =
        "UC-ZsN5evqmSVo3_SJyQe9yA,UC0TOB111hqv6X75GYU_9sAQ,UCDAXusYwRJpiSP2CHnXnVnw,UCjc-CYTJexcR9I8J_5ELVlg,UCKKKYE55BVswHgKihx5YXew";
      url.searchParams.set("ids", ids);
      return ytMusicWorker.fetch(
        new Request(url.toString(), request),
        env,
        ctx,
      );
    }

    // Delegate image proxy + anything else to ytMusicWorker
    if (pathname === "/api/image") {
      return ytMusicWorker.fetch(request, env, ctx);
    }

    return new Response("Not Found", { status: 404 });
  },
};

function withCors(response: Response): Response {
  const headers = new Headers(response.headers);
  headers.set("Access-Control-Allow-Origin", "*");
  headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
