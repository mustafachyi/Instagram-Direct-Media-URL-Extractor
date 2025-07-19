import type { InstagramApiResponse } from './types';

class InstagramError extends Error {
  status: number;
  constructor(message: string, status = 500) {
    super(message);
    this.status = status;
  }
}

const DOCUMENT_ID = '9510064595728286';
const BASE_URL = 'https://www.instagram.com/graphql/query';
const POST_PATTERNS = ['/p/', '/reel/', '/tv/', '/reels/'] as const;
const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36';
const STATIC_CSRF_TOKEN = 'static';
const PROXY_URL = process.env.PROXY_URL || '';

function extractShortcode(url: string): string {
  for (const pattern of POST_PATTERNS) {
    const index = url.indexOf(pattern);
    if (index !== -1) {
      const shortcode = url.substring(index + pattern.length).split('/')[0];
      if (shortcode) return shortcode;
    }
  }
  throw new InstagramError('Invalid Instagram URL', 400);
}

const extractUrls = (data: any): string[] => {
  if (!data) return [];
  
  const mediaItems = data.__typename === 'XDTGraphSidecar' 
    ? data.edge_sidecar_to_children.edges 
    : [{ node: data }];
  
  return mediaItems.map((item: any) => 
    item.node.is_video ? item.node.video_url : item.node.display_url
  );
};

export async function getInstagramUrls(url: string): Promise<string[]> {
  try {
    if (url.includes('/share')) {
      const fetchOptions: any = { redirect: 'follow' };
      if (PROXY_URL) fetchOptions.proxy = PROXY_URL;
      const response = await fetch(url, fetchOptions);
      url = response.url;
    }
    const shortcode = extractShortcode(url);
    const postOptions: any = {
      method: 'POST',
      headers: {
        'X-CSRFToken': STATIC_CSRF_TOKEN,
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': USER_AGENT
      },
      body: new URLSearchParams({
        variables: JSON.stringify({ shortcode }),
        doc_id: DOCUMENT_ID
      })
    };
    if (PROXY_URL) postOptions.proxy = PROXY_URL;
    const response = await fetch(BASE_URL, postOptions);
    if (!response.ok) {
      throw new InstagramError(`Request failed: ${response.status}`, response.status);
    }
    const json = await response.json() as InstagramApiResponse;
    const media = json.data?.xdt_shortcode_media;
    if (!media) throw new InstagramError('No media found', 404);
    return extractUrls(media);
  } catch (error) {
    if (error instanceof InstagramError) throw error;
    throw new InstagramError('Failed to fetch Instagram content', 500);
  }
}
