import React, { useState } from 'react';
import Navbar from './Navbar';
import SideMenu from './SideMenu';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

function ColorApp() {
  const colors = ['red', 'blue', 'green', 'yellow', 'purple'];
  const [color, setColor] = useState(colors[0]);

  const changeColor = () => {
    const next = colors[Math.floor(Math.random() * colors.length)];
    setColor(next);
  };

  return (
    <>
      <Navbar />
      <Box sx={{ display: 'flex' }}>
        <SideMenu />
        <Container component="main" sx={{ mt: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Color Experiment
          </Typography>
          <Box sx={{ width: 100, height: 100, bgcolor: color, mb: 2 }} />
          <Button variant="contained" onClick={changeColor}>
            Change Color
          </Button>
        </Container>
      </Box>
    </>
  );
}

export default ColorApp;
