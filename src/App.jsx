import React, { useState } from 'react';
import Navbar from './Navbar';
import SideMenu from './SideMenu';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

function App() {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <>
      <Navbar onMenuClick={handleToggle} />
      <SideMenu open={open} onClose={handleToggle} />
      <Container component="main" sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to nicks exploration site
        </Typography>
      </Container>
    </>
  );
}

export default App;
