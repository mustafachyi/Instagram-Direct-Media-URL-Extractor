import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { getInstagramUrls } from './instagram';
import { AppConfig } from './config';
import { InstagramError, ExtractedMediaResponse } from './types';
import { StatusCode } from 'hono/utils/http-status';

const app = new Hono();

app.use('*', cors());

app.get('/', (c) => c.json({
  message: 'Service is operational.',
  usage: 'GET /dl?url=<instagram_post_url>',
}));

app.get('/dl', async (c) => {
  const url = c.req.query('url');
  if (!url) {
    c.status(400);
    return c.json({ error: 'The "url" query parameter is required.' });
  }

  try {
    const urls = await getInstagramUrls(url);
    return c.json({ urls } as ExtractedMediaResponse);
  } catch (error) {
    if (error instanceof InstagramError) {
      c.status(error.status as StatusCode);
      return c.json({ error: error.message });
    }
    c.status(500);
    return c.json({ error: 'An internal server error occurred.' });
  }
});

app.get('/favicon.ico', (c) => c.body(null, 204));
app.notFound((c) => c.json({ error: 'Endpoint not found.' }, 404));

const server = {
  port: AppConfig.port,
  fetch: app.fetch,
};

const mode = AppConfig.proxyUrl ? 'proxy' : 'proxyless';
console.log(`Server starting on port ${server.port} in ${mode} mode.`);

export default server;