import getSpotifyToken from "../shared/getSpotifyToken";
export default async function getSpotifyArtists(
  request,
  env,
  ctx
): Promise<Response> {
  try {
    const token = await getSpotifyToken(env);
    return Response.json({
      token: token,
    });
  } catch (error) {
    console.error("Error in getSpotifyArtists:", error);

    return new Response("Failed to get Spotify token", { status: 500 });
  }
}
