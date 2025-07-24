export class InstagramError extends Error {
  public readonly status: number;
  constructor(message: string, status = 500) {
    super(message);
    this.name = 'InstagramError';
    this.status = status;
  }
}

interface MediaNode {
  is_video: boolean;
  video_url?: string;
  display_url: string;
}

export interface MediaEdge {
  node: MediaNode;
}

interface Sidecar {
  __typename: 'XDTGraphSidecar';
  edge_sidecar_to_children: {
    edges: MediaEdge[];
  };
}

interface SingleMedia {
  __typename: 'XDTGraphImage' | 'XDTGraphVideo';
}

export type ShortcodeMedia = (SingleMedia | Sidecar) & MediaNode;

export interface InstagramApiResponse {
  data?: {
    xdt_shortcode_media?: ShortcodeMedia;
  };
}

export interface ExtractedMediaResponse {
  urls: string[];
}