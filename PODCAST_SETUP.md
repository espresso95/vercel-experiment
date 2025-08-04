# Podcast Player Setup with Cloudflare R2

This guide explains how to set up the podcast player to work with your Cloudflare R2 bucket.

## R2 Bucket Structure

Your R2 bucket should be organized as follows:

```
your-r2-bucket/
├── podcasts/
│   ├── ai-development.mp3
│   ├── web-development.mp3
│   └── cloud-infrastructure.mp3
├── thumbnails/
│   ├── ai-development.jpg
│   ├── web-development.jpg
│   └── cloud-infrastructure.jpg
└── metadata.json (optional)
```

## Configuration

1. **Update R2 Configuration**: Edit `src/utils/r2Config.ts` with your actual bucket URL:
   ```typescript
   export const r2Config: R2Config = {
     bucketUrl: 'https://your-actual-bucket.cloudfront.net',
   };
   ```

2. **Environment Variables** (Optional): For production, consider using environment variables:
   ```bash
   VITE_R2_BUCKET_URL=https://your-bucket.cloudfront.net
   VITE_R2_REGION=your-region
   VITE_R2_ACCESS_KEY_ID=your-access-key
   VITE_R2_SECRET_ACCESS_KEY=your-secret-key
   ```

## Setting Up Cloudflare R2

1. **Create an R2 Bucket**:
   - Go to Cloudflare Dashboard → R2 Object Storage
   - Create a new bucket
   - Configure public access if needed

2. **Upload Your Podcasts**:
   - Upload audio files to the `podcasts/` folder
   - Upload thumbnail images to the `thumbnails/` folder
   - Ensure file names match the podcast IDs

3. **Configure Custom Domain** (Recommended):
   - Set up a custom domain for your R2 bucket
   - This provides better caching and CDN benefits

## Podcast Metadata

Currently, the app uses mock data. To implement dynamic loading:

1. **Option 1**: Create a `metadata.json` file in your R2 bucket with podcast information
2. **Option 2**: Use Cloudflare Workers to generate metadata from bucket contents
3. **Option 3**: Implement a backend API that manages podcast metadata

### Example metadata.json structure:
```json
{
  "podcasts": [
    {
      "id": "ai-development",
      "title": "The Future of AI Development",
      "description": "A deep dive into the latest trends in AI and ML.",
      "duration": 3600,
      "publishDate": "2024-08-01",
      "category": "Technology",
      "fileSize": 52428800
    }
  ]
}
```

## Security Considerations

- For public podcasts, you can serve directly from R2 with public access
- For private content, implement authentication and use signed URLs
- Consider using Cloudflare Access for additional security
- Never expose access keys in client-side code

## Performance Optimization

- Enable Cloudflare caching for better performance
- Use appropriate audio formats (MP3 is widely supported)
- Optimize thumbnail images for web (JPEG/WebP recommended)
- Consider implementing progressive loading for large audio files

## Development

To test locally:
1. Update the bucket URL in `r2Config.ts`
2. Ensure your R2 bucket has proper CORS settings if accessing from localhost
3. Run `npm run dev` to start the development server

## Production Deployment

1. Update environment variables for production
2. Ensure your R2 bucket is properly configured for production access
3. Test audio playback across different devices and browsers
4. Monitor usage and costs through Cloudflare dashboard
