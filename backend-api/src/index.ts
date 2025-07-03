import getSpotifyArtists from "./endpoints/getSpotifyArtists";

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
      return getSpotifyArtists(request, env, ctx);
    }

    return new Response("Not Found", { status: 404 });
  },
};
