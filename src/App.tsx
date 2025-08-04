import { 
  Container, 
  Typography, 
  Box
} from '@mui/material'
import Navbar from './components/Navbar'

function App() {

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ 
        height: '80vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to Niks site
          </Typography>
        </Box>
      </Container>
    </>
  )
}

export default App
