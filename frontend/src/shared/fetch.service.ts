export default class FetchService {
  private static instance: FetchService;

  public static getInstance(): FetchService {
    if (!FetchService.instance) {
      FetchService.instance = new FetchService();
    }
    return FetchService.instance;
  }

  public constructor() {}

  public async get<T = any>(
    url: string,
    headers: Record<string, string> = {}
  ): Promise<T> {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        ...headers,
      },
    });

    if (!response.ok) {
      throw new Error(`GET request failed with status ${response.status}`);
    }

    return response.json();
  }

  public async graphql<T = any>(
    endpoint: string,
    query: string,
    variables: Record<string, any> = {},
    headers: Record<string, string> = {}
  ): Promise<T> {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...headers,
      },
      body: JSON.stringify({ query, variables }),
    });

    const result = await response.json();

    if (result.errors) {
      throw new Error(
        `GraphQL request failed: ${JSON.stringify(result.errors)}`
      );
    }

    return result.data;
  }
}
