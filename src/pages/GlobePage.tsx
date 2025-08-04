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
