export interface InstagramResponse {
  urls: string[];
  error?: string;
}

interface MediaNode {
  is_video: boolean;
  video_url?: string;
  display_url: string;
}

export interface InstagramMedia {
  node: MediaNode;
}

export interface InstagramApiResponse {
  data?: {
    xdt_shortcode_media?: {
      __typename: string;
    } & MediaNode & {
      edge_sidecar_to_children?: {
        edges: InstagramMedia[];
      };
    };
  };
}
