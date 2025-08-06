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
        ? data.artists.artist.map((data) => {
            return (
              <>
                <div className="music-section">
                  <div
                    className="artist"
                    onClick={() => {
                      open(data.url, "_blank");
                    }}
                    key={data.name}
                  >
                    <div className="flex">
                      <img className="image" src={data.image} />
                      <div className="information">
                        <div className="name">{data.name}</div>
                        <div className="genre">
                          {data.genres[0] !== undefined
                            ? `Genre: ${data.genres}`
                            : ""}
                        </div>
                        <div className="followers">
                          {data.followers.toLocaleString()} Followers
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })
        : "Loading..."}
    </div>
  );
}
