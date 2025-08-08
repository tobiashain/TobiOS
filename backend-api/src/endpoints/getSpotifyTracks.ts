import { TracksResponse, Tracks } from "../interfaces/spotify/tracks";
import getSpotifyToken from "../shared/getSpotifyToken";
export default async function getSpotifyTracks(
  request,
  env,
  ctx,
  ids
): Promise<Tracks> {
  try {
    const token = await getSpotifyToken(env);
    const idArray = ids.split(",");

    const fetchTracksForArtist = async (artistId: string) => {
      const res = await fetch(
        `https://api.spotify.com/v1/artists/${artistId}/top-tracks`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      const data: TracksResponse = await res.json();
      return data.tracks.map((track) => ({
        image: track.album.images[0]?.url || "",
        url: track.external_urls.spotify,
        name: track.name,
      }));
    };

    const artistTracks = await Promise.all(idArray.map(fetchTracksForArtist));

    const tracks: Tracks = {
      artist: artistTracks.map((trackArray) => ({ track: trackArray })),
    };

    return tracks;
  } catch (error) {
    console.error("Error in getSpotifyTracks:", error);
    throw new Error("Failed to get Spotify Tracks");
  }
}
