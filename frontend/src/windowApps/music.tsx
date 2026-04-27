import { useEffect, useState, useMemo } from "react";
import FetchService from "../shared/fetch.service";
import MusicData from "./interfaces/music";
import "./music.scss";

export default function MusicApp() {
  const fetchService = useMemo(() => new FetchService(), []);
  const [data, setData] = useState<MusicData | null>(null);

  useEffect(() => {
    async function fetchData() {
      const result = await fetchService.get(
        "https://backend-api.hain-tobias.workers.dev/api/ytmusic",
      );
      console.log(result);
      setData(result);
    }
    fetchData();
  }, [fetchService]);

  if (!data) {
    return (
      <div className="music music--loading">
        <div className="music__loading-spinner">
          <div className="music__spinner"></div>
          <p>Loading your music experience...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="music">
      <div className="music__header">
        <h1 className="music__title">Music Explorer</h1>
        <p className="music__subtitle">Discover artists and their top tracks</p>
      </div>

      <div className="music__artists-grid">
        {data.artists.artist.map((artist, index) => {
          const artistTracks = data.tracks.artist[index]?.track ?? [];
          return (
            <div className="music__section" key={artist.name + index}>
              <div
                className="music__artist-card"
                onClick={() =>
                  open(artist.url, "_blank", "noopener noreferrer")
                }
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    open(artist.url, "_blank", "noopener noreferrer");
                  }
                }}
              >
                <div className="music__artist-avatar">
                  <img
                    className="music__artist-image"
                    src={artist.image}
                    alt={artist.name}
                    loading="lazy"
                  />
                </div>
                <div className="music__artist-info">
                  <h2 className="music__artist-name">{artist.name}</h2>
                  {artist.genres && artist.genres.length > 0 && (
                    <div className="music__genres-container">
                      {artist.genres.slice(0, 3).map((genre) => (
                        <span key={genre} className="music__genre-badge">
                          {genre}
                        </span>
                      ))}
                      {artist.genres.length > 3 && (
                        <span className="music__genre-badge music__genre-badge--more">
                          +{artist.genres.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                  {artist.followers > 0 && (
                    <div className="music__artist-stats">
                      <span className="music__followers">
                        `${artist.followers.toLocaleString()} followers`
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {artistTracks.length > 0 && (
                <div className="music__tracks-section">
                  <h3 className="music__tracks-title">Popular tracks</h3>
                  <div className="music__tracks-grid">
                    {artistTracks.map((track, tIndex) => (
                      <div
                        className="music__track-card"
                        key={track.name + tIndex}
                        onClick={() =>
                          open(track.url, "_blank", "noopener noreferrer")
                        }
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            open(track.url, "_blank", "noopener noreferrer");
                          }
                        }}
                      >
                        <div className="music__track-image-wrapper">
                          <img
                            className="music__track-image"
                            src={track.image}
                            alt={track.name}
                            loading="lazy"
                          />
                          <div className="music__track-overlay">
                            <span className="music__play-icon">▶</span>
                          </div>
                        </div>
                        <p className="music__track-name">{track.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
