export const AppConfig = {
  port: Number(process.env.PORT) || 3000,
  proxyUrl: process.env.PROXY_URL || '',
};

export const CacheConfig = {
  ttlSeconds: Number(process.env.CACHE_TTL_SECONDS) || 3600,
};

export const InstagramApiConfig = {
  documentId: '9510064595728286',
  baseUrl: 'https://www.instagram.com/graphql/query',
  postPatterns: ['/p/', '/reel/', '/tv/', '/reels/'],
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  staticCsrfToken: 'static',
};