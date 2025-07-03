import getSpotifyToken from "../shared/getSpotifyToken";
import { ArtistsResponse, Artists } from "../interfaces/spotify/artists";
export default async function getSpotifyArtists(
  request,
  env,
  ctx,
  ids
): Promise<Response> {
  try {
    const token = await getSpotifyToken(env);
    const res = await fetch(`https://api.spotify.com/v1/artists?ids=${ids}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const data: ArtistsResponse = await res.json();
    const artists: Artists = {
      artist: data.artists.map((artist) => ({
        followers: artist.followers.total,
        genres: artist.genres,
        image: artist.images[0]?.url || "",
        name: artist.name,
        url: artist.external_urls.spotify,
      })),
    };
    return Response.json(artists);
  } catch (error) {
    console.error("Error in getSpotifyArtists:", error);

    return new Response("Failed to get Spotify Artists", { status: 500 });
  }
}
