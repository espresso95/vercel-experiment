import React from 'react';
import ReactDOM from 'react-dom/client';
import ColorApp from './ColorApp';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ColorApp />
    </ThemeProvider>
  </React.StrictMode>
);
