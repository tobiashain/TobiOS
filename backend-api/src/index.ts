import getSpotifyArtists from "./endpoints/getSpotifyArtists";
import getSpotifyTracks from "./endpoints/getSpotifyTracks";

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    const url = new URL(request.url);
    const { pathname } = url;
    const method = request.method;

    if (pathname === "/api/spotify" && method === "GET") {
      const ids: string =
        "1t20wYnTiAT0Bs7H1hv9Wt,6f0SUJsj1yDGVOIChVQCwc,77SW9BnxLY8rJ0RciFqkHh,25jJ6vyXwTRa0e6XCcdR6U,3dz0NnIZhtKKeXZxLOxCam";
      const artists = getSpotifyArtists(request, env, ctx, ids);
      return getSpotifyTracks(request, env, ctx, ids);
    }

    return new Response("Not Found", { status: 404 });
  },
};
