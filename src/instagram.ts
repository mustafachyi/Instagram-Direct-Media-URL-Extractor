import { InstagramApiConfig, AppConfig } from './config';
import { InstagramError, InstagramApiResponse, ShortcodeMedia, MediaEdge } from './types';

function extractShortcodeFromUrl(url: string): string {
  for (const pattern of InstagramApiConfig.postPatterns) {
    const startIndex = url.indexOf(pattern);
    if (startIndex !== -1) {
      const shortcode = url.substring(startIndex + pattern.length).split('/')[0];
      if (shortcode) {
        return shortcode;
      }
    }
  }
  throw new InstagramError('Invalid or unsupported Instagram URL', 400);
}

async function resolveShareUrl(url: string): Promise<string> {
  if (!url.includes('/share')) {
    return url;
  }
  const fetchOptions: RequestInit = { redirect: 'follow' };
  if (AppConfig.proxyUrl) {
    (fetchOptions as any).proxy = AppConfig.proxyUrl;
  }
  const response = await fetch(url, fetchOptions);
  return response.url;
}

function extractMediaUrls(media: ShortcodeMedia): string[] {
  if (media.__typename === 'XDTGraphSidecar') {
    return media.edge_sidecar_to_children.edges.map((edge: MediaEdge) =>
      edge.node.is_video ? edge.node.video_url! : edge.node.display_url
    );
  }

  return [media.is_video ? media.video_url! : media.display_url];
}

async function fetchPostDataFromApi(shortcode: string): Promise<InstagramApiResponse> {
  const variables = JSON.stringify({ shortcode });
  const body = new URLSearchParams({
    variables,
    doc_id: InstagramApiConfig.documentId,
  });

  const headers = {
    'X-CSRFToken': InstagramApiConfig.staticCsrfToken,
    'Content-Type': 'application/x-www-form-urlencoded',
    'User-Agent': InstagramApiConfig.userAgent,
  };

  const requestOptions: RequestInit = {
    method: 'POST',
    headers,
    body,
  };

  if (AppConfig.proxyUrl) {
    (requestOptions as any).proxy = AppConfig.proxyUrl;
  }

  const response = await fetch(InstagramApiConfig.baseUrl, requestOptions);

  if (!response.ok) {
    throw new InstagramError(`API request failed with status: ${response.status}`, response.status);
  }

  return response.json() as Promise<InstagramApiResponse>;
}

export async function getInstagramUrls(url: string): Promise<string[]> {
  try {
    const resolvedUrl = await resolveShareUrl(url);
    const shortcode = extractShortcodeFromUrl(resolvedUrl);
    const apiResponse = await fetchPostDataFromApi(shortcode);
    const media = apiResponse.data?.xdt_shortcode_media;

    if (!media) {
      throw new InstagramError('Media not found in API response', 404);
    }

    return extractMediaUrls(media);
  } catch (error) {
    if (error instanceof InstagramError) {
      throw error;
    }
    const unknownError = error as Error;
    throw new InstagramError(`An unexpected error occurred: ${unknownError.message}`, 500);
  }
}