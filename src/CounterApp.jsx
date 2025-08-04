import React, { useState } from 'react';
import Navbar from './Navbar';
import SideMenu from './SideMenu';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

function CounterApp() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <Box sx={{ display: 'flex' }}>
        <SideMenu />
        <Container component="main" sx={{ mt: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Counter Experiment
          </Typography>
          <Typography variant="h6" gutterBottom>{count}</Typography>
          <Button variant="contained" onClick={() => setCount(count + 1)}>
            Increment
          </Button>
        </Container>
      </Box>
    </>
  );
}

export default CounterApp;
