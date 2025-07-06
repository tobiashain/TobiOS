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

    if (method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*", // or specify your frontend origin
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      });
    }

    if (pathname === "/api/spotify" && method === "GET") {
      const ids: string =
        "1t20wYnTiAT0Bs7H1hv9Wt,6f0SUJsj1yDGVOIChVQCwc,77SW9BnxLY8rJ0RciFqkHh,25jJ6vyXwTRa0e6XCcdR6U,3dz0NnIZhtKKeXZxLOxCam";
      const artists = await getSpotifyArtists(request, env, ctx, ids);
      const tracks = await getSpotifyTracks(request, env, ctx, ids);

      const jsonResponse = Response.json({ artists, tracks });
      return withCors(jsonResponse);
    }

    return new Response("Not Found", { status: 404 });
  },
};

function withCors(response: Response): Response {
  const newHeaders = new Headers(response.headers);
  newHeaders.set("Access-Control-Allow-Origin", "*"); // or your frontend URL
  newHeaders.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  newHeaders.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders,
  });
}
