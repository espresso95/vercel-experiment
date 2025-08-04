import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  TextField,
  InputAdornment,
  CircularProgress,
  Alert,
  IconButton,
} from '@mui/material';
import {
  PlayArrow,
  Pause,
  Search as SearchIcon,
  Download,
  AccessTime,
} from '@mui/icons-material';
import Navbar from '../components/Navbar';
import PodcastPlayer from '../components/PodcastPlayer';
import {
  fetchPodcastsFromR2,
  buildAudioUrl,
  buildThumbnailUrl,
} from '../utils/r2Config';

interface Podcast {
  id: string;
  title: string;
  description: string;
  audioUrl: string;
  thumbnailUrl?: string;
  duration: number;
  publishDate: string;
  category: string;
  fileSize: number;
}

interface PodcastPageProps {
  onNavigate?: (page: string) => void;
}

const PodcastPage: React.FC<PodcastPageProps> = ({ onNavigate }) => {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [filteredPodcasts, setFilteredPodcasts] = useState<Podcast[]>([]);
  const [currentPodcast, setCurrentPodcast] = useState<Podcast | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch podcasts from R2
  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        setLoading(true);

        // Fetch podcast metadata from R2
        const data = await fetchPodcastsFromR2();

        // Transform the data to include full URLs
        const transformedPodcasts: Podcast[] = data.podcasts.map(podcast => ({
          ...podcast,
          audioUrl: buildAudioUrl(podcast.id),
          thumbnailUrl: buildThumbnailUrl(podcast.id),
        }));

        setPodcasts(transformedPodcasts);
        setFilteredPodcasts(transformedPodcasts);
        setError(null);
      } catch (err) {
        setError('Failed to load podcasts. Please try again later.');
        console.error('Error fetching podcasts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPodcasts();
  }, []); // Filter podcasts based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredPodcasts(podcasts);
    } else {
      const filtered = podcasts.filter(
        podcast =>
          podcast.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          podcast.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          podcast.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPodcasts(filtered);
    }
  }, [searchQuery, podcasts]);

  const handlePlayPause = (podcast: Podcast) => {
    if (currentPodcast?.id === podcast.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentPodcast(podcast);
      setIsPlaying(true);
    }
  };

  const handlePlayerStateChange = (playing: boolean) => {
    setIsPlaying(playing);
  };

  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  const formatFileSize = (bytes: number): string => {
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <>
        <Navbar onNavigate={onNavigate} />
        <Container maxWidth="lg" sx={{ mt: 4, textAlign: 'center' }}>
          <CircularProgress size={60} />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Loading podcasts...
          </Typography>
        </Container>
      </>
    );
  }

  return (
    <>
      <Navbar onNavigate={onNavigate} />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Podcast Library
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Discover and listen to our collection of podcasts
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Search Bar */}
        <Box sx={{ mb: 4 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search podcasts..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Podcast Grid */}
        <Grid container spacing={3}>
          {filteredPodcasts.map(podcast => (
            <Grid item xs={12} md={6} lg={4} key={podcast.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4,
                  },
                }}
                onClick={() => handlePlayPause(podcast)}
              >
                {podcast.thumbnailUrl && (
                  <CardMedia
                    component="img"
                    height="200"
                    image={podcast.thumbnailUrl}
                    alt={podcast.title}
                    onError={e => {
                      // Hide broken images
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                )}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="h2" gutterBottom>
                    {podcast.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {podcast.description}
                  </Typography>

                  <Box sx={{ mb: 2 }}>
                    <Chip
                      label={podcast.category}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      mb: 1,
                    }}
                  >
                    <Box
                      sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                    >
                      <AccessTime fontSize="small" color="action" />
                      <Typography variant="caption" color="text.secondary">
                        {formatDuration(podcast.duration)}
                      </Typography>
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      {formatFileSize(podcast.fileSize)}
                    </Typography>
                  </Box>

                  <Typography variant="caption" color="text.secondary">
                    Published: {formatDate(podcast.publishDate)}
                  </Typography>

                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mt: 2,
                    }}
                  >
                    <IconButton
                      color="primary"
                      size="large"
                      onClick={e => {
                        e.stopPropagation();
                        handlePlayPause(podcast);
                      }}
                    >
                      {currentPodcast?.id === podcast.id && isPlaying ? (
                        <Pause />
                      ) : (
                        <PlayArrow />
                      )}
                    </IconButton>
                    <IconButton
                      color="default"
                      onClick={e => {
                        e.stopPropagation();
                        window.open(podcast.audioUrl, '_blank');
                      }}
                    >
                      <Download />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {filteredPodcasts.length === 0 && !loading && (
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="h6" color="text.secondary">
              No podcasts found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {searchQuery
                ? 'Try adjusting your search terms'
                : 'Check back later for new content'}
            </Typography>
          </Box>
        )}

        {/* Podcast Player */}
        {currentPodcast && (
          <PodcastPlayer
            podcast={currentPodcast}
            isPlaying={isPlaying}
            onPlayStateChange={handlePlayerStateChange}
          />
        )}
      </Container>
    </>
  );
};

export default PodcastPage;
