import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Paper,
  IconButton,
  Typography,
  Slider,
  useTheme,
  useMediaQuery,
  CardMedia,
} from '@mui/material';
import {
  PlayArrow,
  Pause,
  VolumeUp,
  VolumeDown,
  VolumeOff,
  Replay10,
  Forward30,
} from '@mui/icons-material';

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

interface PodcastPlayerProps {
  podcast: Podcast;
  isPlaying: boolean;
  onPlayStateChange: (playing: boolean) => void;
}

const PodcastPlayer: React.FC<PodcastPlayerProps> = ({
  podcast,
  isPlaying,
  onPlayStateChange,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Load audio when podcast changes
  useEffect(() => {
    if (audioRef.current && podcast) {
      setIsLoading(true);
      setError(null);
      audioRef.current.src = podcast.audioUrl;
      audioRef.current.load();
    }
  }, [podcast]);

  // Handle play/pause state changes
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error('Error playing audio:', error);
            setError('Failed to play audio. Please check your connection.');
            onPlayStateChange(false);
          });
        }
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, onPlayStateChange]);

  // Audio event handlers
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      setIsLoading(false);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleEnded = () => {
    onPlayStateChange(false);
    setCurrentTime(0);
  };

  const handleError = () => {
    setError('Failed to load audio file');
    setIsLoading(false);
    onPlayStateChange(false);
  };

  const handleCanPlay = () => {
    setIsLoading(false);
  };

  const handleWaiting = () => {
    setIsLoading(true);
  };

  const handleCanPlayThrough = () => {
    setIsLoading(false);
  };

  // Control handlers
  const handlePlayPause = () => {
    onPlayStateChange(!isPlaying);
  };

  const handleSeek = (_: Event, newValue: number | number[]) => {
    const time = newValue as number;
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVolumeChange = (_: Event, newValue: number | number[]) => {
    const vol = newValue as number;
    setVolume(vol);
    if (audioRef.current) {
      audioRef.current.volume = vol;
    }
    setIsMuted(vol === 0);
  };

  const handleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume;
        setIsMuted(false);
      } else {
        audioRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  const handleSkip = (seconds: number) => {
    if (audioRef.current) {
      const newTime = Math.max(0, Math.min(duration, currentTime + seconds));
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time: number): string => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getVolumeIcon = () => {
    if (isMuted || volume === 0) return <VolumeOff />;
    if (volume < 0.5) return <VolumeDown />;
    return <VolumeUp />;
  };

  return (
    <Paper
      elevation={8}
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1200,
        borderRadius: 0,
        borderTop: `1px solid ${theme.palette.divider}`,
      }}
    >
      <audio
        ref={audioRef}
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        onError={handleError}
        onCanPlay={handleCanPlay}
        onWaiting={handleWaiting}
        onCanPlayThrough={handleCanPlayThrough}
        preload="metadata"
      />

      <Box sx={{ p: 2 }}>
        {isMobile ? (
          // Mobile Layout
          <Box>
            {/* Podcast Info */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              {podcast.thumbnailUrl && (
                <CardMedia
                  component="img"
                  sx={{ width: 60, height: 60, borderRadius: 1, mr: 2 }}
                  image={podcast.thumbnailUrl}
                  alt={podcast.title}
                  onError={e => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              )}
              <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                <Typography variant="subtitle2" noWrap>
                  {podcast.title}
                </Typography>
                <Typography variant="caption" color="text.secondary" noWrap>
                  {podcast.category}
                </Typography>
              </Box>
            </Box>

            {/* Progress Bar */}
            <Box sx={{ mb: 2 }}>
              <Slider
                value={currentTime}
                max={duration}
                onChange={handleSeek}
                disabled={isLoading || !!error}
                size="small"
                sx={{
                  '& .MuiSlider-thumb': {
                    width: 16,
                    height: 16,
                  },
                }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="caption" color="text.secondary">
                  {formatTime(currentTime)}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {formatTime(duration)}
                </Typography>
              </Box>
            </Box>

            {/* Controls */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
              }}
            >
              <IconButton
                onClick={() => handleSkip(-10)}
                disabled={isLoading || !!error}
              >
                <Replay10 />
              </IconButton>
              <IconButton
                onClick={handlePlayPause}
                disabled={isLoading || !!error}
                sx={{
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                  '&:hover': { bgcolor: 'primary.dark' },
                  width: 48,
                  height: 48,
                }}
              >
                {isPlaying ? <Pause /> : <PlayArrow />}
              </IconButton>
              <IconButton
                onClick={() => handleSkip(30)}
                disabled={isLoading || !!error}
              >
                <Forward30 />
              </IconButton>
            </Box>

            {error && (
              <Typography
                variant="caption"
                color="error"
                sx={{ mt: 1, display: 'block', textAlign: 'center' }}
              >
                {error}
              </Typography>
            )}
          </Box>
        ) : (
          // Desktop Layout
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {/* Podcast Info */}
            <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 300 }}>
              {podcast.thumbnailUrl && (
                <CardMedia
                  component="img"
                  sx={{ width: 60, height: 60, borderRadius: 1, mr: 2 }}
                  image={podcast.thumbnailUrl}
                  alt={podcast.title}
                  onError={e => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              )}
              <Box sx={{ minWidth: 0 }}>
                <Typography variant="subtitle2" noWrap>
                  {podcast.title}
                </Typography>
                <Typography variant="caption" color="text.secondary" noWrap>
                  {podcast.category}
                </Typography>
              </Box>
            </Box>

            {/* Controls */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton
                onClick={() => handleSkip(-10)}
                disabled={isLoading || !!error}
              >
                <Replay10 />
              </IconButton>
              <IconButton
                onClick={handlePlayPause}
                disabled={isLoading || !!error}
                sx={{
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                  '&:hover': { bgcolor: 'primary.dark' },
                }}
              >
                {isPlaying ? <Pause /> : <PlayArrow />}
              </IconButton>
              <IconButton
                onClick={() => handleSkip(30)}
                disabled={isLoading || !!error}
              >
                <Forward30 />
              </IconButton>
            </Box>

            {/* Progress */}
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ minWidth: 'fit-content' }}
              >
                {formatTime(currentTime)}
              </Typography>
              <Slider
                value={currentTime}
                max={duration}
                onChange={handleSeek}
                disabled={isLoading || !!error}
                size="small"
              />
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ minWidth: 'fit-content' }}
              >
                {formatTime(duration)}
              </Typography>
            </Box>

            {/* Volume */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                minWidth: 120,
              }}
            >
              <IconButton onClick={handleMute} size="small">
                {getVolumeIcon()}
              </IconButton>
              <Slider
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                min={0}
                max={1}
                step={0.01}
                size="small"
                sx={{ width: 80 }}
              />
            </Box>

            {error && (
              <Typography variant="caption" color="error">
                {error}
              </Typography>
            )}
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default PodcastPlayer;
