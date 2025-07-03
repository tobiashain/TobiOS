let cachedToken: string = null;
let tokenExpiry: number = 0;

interface Data {
  access_token: string;
  token_type: string;
  scope: string;
  expires_in: number;
  refresh_token: string;
}

export default async function getSpotifyToken(env) {
  const now = Date.now() / 1000;
  if (cachedToken && now < tokenExpiry) {
    return cachedToken;
  }

  const credentials = btoa(`${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_SECRET}`);
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  if (!res.ok) throw new Error(`Failed to get token: ${res.statusText}`);
  const data: Data = await res.json();
  cachedToken = data.access_token;
  tokenExpiry = Date.now() / 1000 + data.expires_in - 60;

  return cachedToken;
}
