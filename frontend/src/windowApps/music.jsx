import { useEffect, useState, useMemo } from "react";
import FetchService from "../shared/fetch.service";

export default function MusicApp() {
  const fetchService = useMemo(() => new FetchService(), []); // create once

  const [data, setData] = useState(null);

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
    <div className="music">{data ? JSON.stringify(data) : "Loading..."}</div>
  );
}
