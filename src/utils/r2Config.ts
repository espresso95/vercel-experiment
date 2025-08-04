// Configuration for Cloudfront R2 storage
export interface R2Config {
  bucketUrl: string;
  region?: string;
  accessKeyId?: string;
  secretAccessKey?: string;
}

// Default configuration - replace with your actual R2 bucket details
export const r2Config: R2Config = {
  bucketUrl: 'https://your-r2-bucket.cloudfront.net',
  // Add your R2 credentials here if needed for private content
  // Note: For security, consider using environment variables
  // region: process.env.VITE_R2_REGION,
  // accessKeyId: process.env.VITE_R2_ACCESS_KEY_ID,
  // secretAccessKey: process.env.VITE_R2_SECRET_ACCESS_KEY,
};

// Helper functions for working with R2 storage
export const buildR2Url = (path: string): string => {
  return `${r2Config.bucketUrl}/${path}`;
};

export const buildThumbnailUrl = (podcastId: string): string => {
  return buildR2Url(`thumbnails/${podcastId}.jpg`);
};

export const buildAudioUrl = (podcastId: string): string => {
  return buildR2Url(`podcasts/${podcastId}.mp3`);
};

// Function to fetch podcast metadata from R2 (you would implement this based on your setup)
export const fetchPodcastsFromR2 = async () => {
  // This is a placeholder - you would implement the actual R2 API calls here
  // You might use AWS SDK, fetch API, or your preferred method to connect to R2

  try {
    // Example implementation would be something like:
    // const response = await fetch(`${r2Config.bucketUrl}/podcasts/metadata.json`);
    // return await response.json();

    // For now, returning mock data
    return {
      podcasts: [
        {
          id: 'ai-development',
          title: 'The Future of AI Development',
          description:
            'A deep dive into the latest trends in artificial intelligence and machine learning.',
          duration: 3600,
          publishDate: '2024-08-01',
          category: 'Technology',
          fileSize: 52428800,
        },
        {
          id: 'web-development',
          title: 'Modern Web Development Practices',
          description:
            'Best practices for building scalable web applications in 2024.',
          duration: 2700,
          publishDate: '2024-07-28',
          category: 'Programming',
          fileSize: 41943040,
        },
        {
          id: 'cloud-infrastructure',
          title: 'Cloud Infrastructure Trends',
          description:
            'Exploring the latest developments in cloud computing and infrastructure.',
          duration: 4200,
          publishDate: '2024-07-25',
          category: 'Cloud Computing',
          fileSize: 61440000,
        },
      ],
    };
  } catch (error) {
    console.error('Error fetching podcasts from R2:', error);
    throw new Error('Failed to fetch podcasts');
  }
};
