import { useEffect, useState, useMemo } from "react";
import FetchService from "../shared/fetch.service";
import MusicData from "./interfaces/music";
import "./music.scss";

export default function MusicApp() {
  const fetchService = useMemo(() => new FetchService(), []); // create once

  const [data, setData] = useState<MusicData | null>(null);

  useEffect(() => {
    async function fetchData() {
      const result = await fetchService.get(
        "https://backend-api.hain-tobias.workers.dev/api/spotify"
      );
      setData(result);
    }

    fetchData();
  }, [fetchService]); // dependency on memoized instance

  return (
    <div className="music">
      {data
        ? data.artists.artist.map((artist, index) => {
            const artistTracks = data.tracks.artist[index]?.track ?? [];
            return (
              <>
                <div className="music-section">
                  <div
                    className="artist"
                    onClick={() => {
                      open(artist.url, "_blank");
                    }}
                    key={artist.name}
                  >
                    <div className="flex">
                      <div className="artistImage">
                        <img
                          className="image"
                          src={artist.image}
                          alt={artist.name}
                        />
                      </div>

                      <div className="information">
                        <div className="name">{artist.name}</div>
                        <div className="genre">
                          {artist.genres[0] !== undefined
                            ? `Genre: ${artist.genres}`
                            : ""}
                        </div>
                        <div className="followers">
                          {artist.followers.toLocaleString()} Followers
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tracks">
                    {artistTracks.map((track) => (
                      <div
                        className="track"
                        key={track.name}
                        onClick={() => open(track.url, "_blank")}
                      >
                        <div className="trackImage">
                          <img
                            className="image"
                            src={track.image}
                            alt={track.image}
                          ></img>
                        </div>
                        <div className="trackName">{track.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            );
          })
        : "Loading..."}
    </div>
  );
}
