import React from 'react';
import ReactDOM from 'react-dom/client';
import CounterApp from './CounterApp';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CounterApp />
    </ThemeProvider>
  </React.StrictMode>
);
