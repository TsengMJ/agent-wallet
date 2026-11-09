const ANKR_HOST = "https://rpc.ankr.com";

export function ankrRpcUrl(slug: string, apiKey?: string): string {
  const key = apiKey?.trim();
  if (!key) {
    return `${ANKR_HOST}/${slug}`;
  }
  return `${ANKR_HOST}/${slug}/${key}`;
}

export function ankrWsUrl(slug: string, apiKey?: string): string {
  return ankrRpcUrl(slug, apiKey).replace("https://", "wss://");
}
