# Instagram Direct Media URL Extractor

A lightweight API service that extracts direct media URLs from Instagram posts, reels, and videos.

## Features

- Extract direct URLs from Instagram posts
- Support for images, videos, and posts with multiple images
- Automatic fallback to proxyless mode
- Simple JSON response format

## Usage

### API Endpoints

- `GET /`: Shows usage information
- `GET /dl?url=INSTAGRAM_URL`: Returns direct URLs to media

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

## Setup

1. Clone the repository
2. Install dependencies:
   ```sh
   bun install
   ```
3. Run the server:
   ```sh
   bun start
   ```

## Environment Variables

- `PORT` - Server port (default: 3000)
- `PROXY_URL` - HTTP proxy URL (optional)

## Running Modes

The API can operate in two modes:

- **Proxy Mode**: Uses the provided HTTP proxy to make requests to Instagram
- **Proxyless Mode**: Makes direct requests to Instagram without a proxy

## License

MIT

## Credits

This project was inspired by [instagram-direct-url](https://github.com/victorsouzaleal/instagram-direct-url)
