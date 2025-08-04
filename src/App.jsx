import React from 'react';
import Navbar from './Navbar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

function App() {
  return (
    <>
      <Navbar />
      <Container component="main" sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to nicks exploration site
        </Typography>
      </Container>
    </>
  );
}

export default App;
