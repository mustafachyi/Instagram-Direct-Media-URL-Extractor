import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { getInstagramUrls } from './instagram';
import type { InstagramResponse } from './types';

const app = new Hono();

app.use('*', cors());

app.get('/', (c) => c.json({ usage: 'GET /dl?url=<instagram_url>' }));

app.get('/dl', async (c) => {
  const url = c.req.query('url');
  if (!url) return c.json({ error: 'URL required' }, 400);
  try {
    const urls = await getInstagramUrls(url);
    return c.json({ urls } as InstagramResponse);
  } catch (error: any) {
    return c.json({ error: error.message }, error.status || 500);
  }
});


app.get('/favicon.ico', (c) => c.body(null, 204));
app.notFound((c) => c.json({ error: 'Not found' }, 404));

const port = Number(process.env.PORT) || 3000;
const proxyUrl = process.env.PROXY_URL || '';
const mode = proxyUrl ? 'proxy mode' : 'proxyless mode';
console.log(`API running in ${mode}`);

export default {
  port,
  fetch: app.fetch
};