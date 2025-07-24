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
GET /dl?url=https://www.instagram.com/p/BgSlRglAKBn
```

### Example Response

```json
{
  "urls": [
    "https://scontent-fra3-1.cdninstagram.com/o1/v/t16/f2/m84/AQOSM1RUWv-dukL6Q6ctpt60upNiJLWXk_iXV0Ee9YKYfrt9eMc_LQziON4Tgme8K4i3ar5Rcv5zQKacoeU7nq9VVLXLs7R3BSPTxgY.mp4?stp=dst-mp4&efg=eyJxZV9ncm91cHMiOiJbXCJpZ193ZWJfZGVsaXZlcnlfdnRzX290ZlwiXSIsInZlbmNvZGVfdGFnIjoidnRzX3ZvZF91cmxnZW4uZmVlZC5jMi42NDAuYmFzZWxpbmUifQ&_nc_cat=103&vs=851637283349429_3931091210&_nc_vs=HBksFQIYTGlnX2JhY2tmaWxsX3RpbWVsaW5lX3ZvZC9DRjQ4Qjk5MzAyMkU2RDFDQ0Q1RTE2M0RBQURENzVCOV92aWRlb19kYXNoaW5pdC5tcDQVAALIARIAFQIYOnBhc3N0aHJvdWdoX2V2ZXJzdG9yZS9HRWVhWkJkTUVkWjc1emtCQUtIM0JORGpMZUptYnBrd0FBQUYVAgLIARIAKAAYABsAFQAAJvzMh4fxlOQBFQIoAkMzLBdAIO6XjU%2FfOxgSZGFzaF9iYXNlbGluZV8xX3YxEQB16gdl8J0BAA%3D%3D&_nc_rid=67e894ed42&ccb=9-4&oh=00_AfR5PWU9vZN2NL6Apkjx3HoN36viC7O0hDoTJNqxqgRafA&oe=687DF52A&_nc_sid=d885a2"
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
- **Proxyless Mode**: Makes requests directly to Instagram (may be rate-limited)

## License

MIT License

## Credits

Inspired by [instagram-direct-url](https://github.com/victorsouzaleal/instagram-direct-url)
