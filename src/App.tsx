import { useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import Navbar from './components/Navbar';
import GlobePage from './pages/GlobePage';
import PodcastPage from './pages/PodcastPage';
import EbookPage from './pages/EbookPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavigation = (page: string) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'globe':
        return <GlobePage />;
      case 'podcasts':
        return <PodcastPage onNavigate={handleNavigation} />;
      case 'ebooks':
        return <EbookPage onNavigate={handleNavigation} />;
      case 'home':
      default:
        return (
          <>
            <Navbar onNavigate={handleNavigation} />
            <Container
              maxWidth="lg"
              sx={{
                height: '80vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h2" component="h1" gutterBottom>
                  Welcome to Niks site
                </Typography>
                <Typography
                  variant="h5"
                  component="p"
                  color="text.secondary"
                  sx={{ mt: 2 }}
                >
                  Check out the interactive 3D Globe, Podcast Library, and Ebook
                  Collection in the navigation menu!
                </Typography>
              </Box>
            </Container>
          </>
        );
    }
  };

  // If we're on the globe, podcasts, or ebooks page, render them directly (they have their own navbar)
  if (currentPage === 'globe') {
    return <GlobePage onNavigate={handleNavigation} />;
  }

  if (currentPage === 'podcasts') {
    return <PodcastPage onNavigate={handleNavigation} />;
  }

  if (currentPage === 'ebooks') {
    return <EbookPage onNavigate={handleNavigation} />;
  }

  return renderPage();
}

export default App;
