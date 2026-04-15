import { WeatherData } from "../interfaces/weather/weatherData";

type CacheEntry<T> = {
  data: T;
  expires: number;
};

let cache: CacheEntry<WeatherData> | null = null;
let pending: Promise<WeatherData> | null = null;

const TTL = 5 * 60 * 1000; // 5 minutes

export default async function getWeatherData(env): Promise<WeatherData> {
  const now = Date.now();

  if (cache && cache.expires > now) {
    return cache.data;
  }

  if (pending) {
    return pending;
  }

  pending = (async () => {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/kitzb%C3%BChel?unitGroup=metric&include=days,current&key=${env.WEATHER_SECRET}&contentType=json`,
    );

    if (!response.ok) {
      pending = null;
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: WeatherData = await response.json();

    if (!data.days || !Array.isArray(data.days)) {
      pending = null;

      console.error("Invalid API response:", data);

      throw new Error("Weather API returned invalid structure");
    }

    cache = {
      data,
      expires: Date.now() + TTL,
    };

    pending = null;
    return data;
  })();

  return pending;
}
