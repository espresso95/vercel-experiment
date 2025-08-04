import { useState } from 'react'
import { 
  Container, 
  Typography, 
  Button, 
  Box, 
  Card, 
  CardContent,
  Avatar,
  Stack
} from '@mui/material'
import { GitHub, Language } from '@mui/icons-material'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 3 }}>
            <Avatar
              src={viteLogo}
              alt="Vite logo"
              sx={{ width: 80, height: 80 }}
            />
            <Avatar
              src={reactLogo}
              alt="React logo"
              sx={{ width: 80, height: 80, animation: 'spin 20s linear infinite' }}
            />
          </Stack>
          
          <Typography variant="h2" component="h1" gutterBottom>
            Vite + React
          </Typography>
          
          <Card sx={{ maxWidth: 400, mx: 'auto', mb: 3 }}>
            <CardContent>
              <Button
                variant="contained"
                size="large"
                onClick={() => setCount((count) => count + 1)}
                sx={{ mb: 2 }}
              >
                count is {count}
              </Button>
              <Typography variant="body1" color="text.secondary">
                Edit <code>src/App.tsx</code> and save to test HMR
              </Typography>
            </CardContent>
          </Card>
          
          <Typography variant="body2" color="text.secondary">
            Click on the Vite and React logos to learn more
          </Typography>
          
          <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 3 }}>
            <Button
              variant="outlined"
              startIcon={<Language />}
              href="https://vite.dev"
              target="_blank"
            >
              Vite
            </Button>
            <Button
              variant="outlined"
              startIcon={<GitHub />}
              href="https://react.dev"
              target="_blank"
            >
              React
            </Button>
          </Stack>
        </Box>
      </Container>
      
      <style>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  )
}

export default App
