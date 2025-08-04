import React from 'react'
import { Typography, Box } from '@mui/material'
import Navbar from '../components/Navbar'
import Globe from '../components/Globe'

interface GlobePageProps {
  onNavigate?: (page: string) => void;
}

const GlobePage: React.FC<GlobePageProps> = ({ onNavigate }) => {
  return (
    <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      {/* Navbar with higher z-index to stay on top */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <Navbar onNavigate={onNavigate} />
      </div>
      
      {/* Full-screen Globe */}
      <Globe />
      
      {/* Floating title overlay */}
      <Box sx={{ 
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        zIndex: 5,
        pointerEvents: 'none',
        color: 'white',
        textShadow: '2px 2px 4px rgba(0,0,0,0.7)'
      }}>
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Interactive Earth Globe
        </Typography>
        <Typography variant="h6" component="p" sx={{ opacity: 0.9 }}>
          Drag to rotate • Scroll to zoom • Pinch on mobile
        </Typography>
      </Box>
      
      {/* Instructions in bottom corner */}
      <Box sx={{ 
        position: 'absolute',
        bottom: 20,
        right: 20,
        zIndex: 5,
        backgroundColor: 'rgba(0,0,0,0.7)',
        color: 'white',
        padding: 2,
        borderRadius: 2,
        maxWidth: 300,
        pointerEvents: 'none'
      }}>
        <Typography variant="body2">
          This 3D globe is built with Three.js and React Three Fiber. 
          Interact with it using mouse drag or touch gestures.
        </Typography>
      </Box>
    </div>
  )
}

export default GlobePage
