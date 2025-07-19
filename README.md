# Instagram Direct Media URL Extractor

A lightweight API that extracts direct media URLs from Instagram posts, reels, and videos.

## Features

- Get direct URLs for images and videos
- Supports posts with multiple media items (carousels)
- Automatically falls back to proxyless mode
- Clean and simple JSON output

## Live Demo

You can test the API at:  
🔗 **https://insta.selfhoster.nl/**  
⚠️ *Note: This demo uses a free proxy and may not always be reliable.*

## API Endpoints

- `GET /` — Basic usage info
- `GET /dl?url=INSTAGRAM_URL` — Extracts direct media URLs

### Example Request

```sh
GET /dl?url=https://www.instagram.com/p/ABCDEFGH/
```

### Example Response

```json
{
  "urls": [
    "https://scontent-dus1-1.cdninstagram.com/v/t51.2885-15/520228584_18520721344034594_n.jpg?...",
    "https://scontent-dus1-1.cdninstagram.com/v/t51.2885-15/520742356_18520721368034594_n.jpg?..."
  ]
}
```

## Getting Started

1. Clone the repository:

   ```sh
   git clone https://github.com/mustafachyi/Instagram-Direct-Media-URL-Extractor.git
   cd Instagram-Direct-Media-URL-Extractor
   ```

2. Install dependencies:

   ```sh
   bun install
   ```

3. Start the server:

   ```sh
   bun start
   ```

## Environment Variables

- `PORT` — Port for the server (default: `3000`)
- `PROXY_URL` — Optional HTTP proxy URL

## Running Modes

- **Proxy Mode**: Uses the `PROXY_URL` to make requests to Instagram
- **Proxyless Mode**: Direct requests to Instagram (may be rate-limited)

## License

MIT License

## Credits

Inspired by [instagram-direct-url](https://github.com/victorsouzaleal/instagram-direct-url)
