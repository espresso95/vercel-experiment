import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, Html } from '@react-three/drei'
import * as THREE from 'three'

// Pin interface
interface Pin {
  id: string
  lat: number
  lng: number
  label: string
  color?: string
}

// ===== CONFIGURE YOUR PINS HERE =====
// Add, remove, or modify pins as needed
// Format: { id: 'unique-id', lat: latitude, lng: longitude, label: 'Name', color: '#hexcolor' }
// 
// Popular locations for reference:
// - New York: 40.7128, -74.0060
// - London: 51.5074, -0.1278  
// - Tokyo: 35.6762, 139.6503
// - Sydney: -33.8688, 151.2093
// - Paris: 48.8566, 2.3522
// - Los Angeles: 34.0522, -118.2437
// - Mumbai: 19.0760, 72.8777
// - Cairo: 30.0444, 31.2357
// - Moscow: 55.7558, 37.6176
// - São Paulo: -23.5505, -46.6333

const PREDEFINED_PINS: Pin[] = [
  {
    id: 'nyc',
    lat: 40.7128,
    lng: -74.0060,
    label: 'New York',
    color: '#ff4444'
  },
  {
    id: 'london',
    lat: 51.5074,
    lng: -0.1278,
    label: 'London',
    color: '#44ff44'
  },
  {
    id: 'tokyo',
    lat: 35.6762,
    lng: 139.6503,
    label: 'Tokyo',
    color: '#4444ff'
  },
  {
    id: 'sf',
    lat: 37.7749,
    lng: -122.4194,
    label: 'San Francisco',
    color: '#ff8800'
  },
  {
    id: 'sydney',
    lat: -33.8688,
    lng: 151.2093,
    label: 'Sydney',
    color: '#8844ff'
  }
  // Add more pins here following the same format:
  // {
  //   id: 'hometown',
  //   lat: YOUR_LATITUDE,
  //   lng: YOUR_LONGITUDE,
  //   label: 'My Hometown',
  //   color: '#your-favorite-color'
  // }
]

// Utility function for converting lat/lng to 3D coordinates
const latLngToVector3 = (lat: number, lng: number, radius: number = 2) => {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180)
  
  const x = -(radius * Math.sin(phi) * Math.cos(theta))
  const z = radius * Math.sin(phi) * Math.sin(theta)
  const y = radius * Math.cos(phi)
  
  return new THREE.Vector3(x, y, z)
}

// Pin Component
const PinMarker: React.FC<{ pin: Pin; globeRadius: number }> = ({ pin, globeRadius }) => {
  const position = latLngToVector3(pin.lat, pin.lng, globeRadius + 0.1)
  
  return (
    <group position={position}>
      {/* Pin stem */}
      <mesh>
        <cylinderGeometry args={[0.01, 0.01, 0.2]} />
        <meshStandardMaterial color={pin.color || '#ff4444'} />
      </mesh>
      {/* Pin head */}
      <mesh position={[0, 0.1, 0]}>
        <sphereGeometry args={[0.05]} />
        <meshStandardMaterial color={pin.color || '#ff4444'} />
      </mesh>
      {/* Label */}
      <Html position={[0, 0.2, 0]} center>
        <div style={{
          background: 'rgba(0, 0, 0, 0.8)',
          color: 'white',
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '12px',
          whiteSpace: 'nowrap',
          pointerEvents: 'none'
        }}>
          {pin.label}
        </div>
      </Html>
    </group>
  )
}

// Earth Globe Component
function EarthGlobe() {
  const meshRef = useRef<THREE.Mesh>(null!)
  
  // Create earth texture (you can replace this with an actual earth texture URL)
  const earthTexture = useMemo(() => {
    // Create a more detailed earth-like texture using canvas
    const canvas = document.createElement('canvas')
    canvas.width = 1024
    canvas.height = 512
    const context = canvas.getContext('2d')!
    
    // Create ocean background
    context.fillStyle = '#1E88E5' // Ocean blue
    context.fillRect(0, 0, 1024, 512)
    
    // Add continents (simplified representations)
    context.fillStyle = '#2E7D32' // Land green
    
    // North America
    context.beginPath()
    context.ellipse(200, 160, 80, 60, 0, 0, Math.PI * 2)
    context.fill()
    
    // South America
    context.beginPath()
    context.ellipse(250, 280, 40, 80, 0, 0, Math.PI * 2)
    context.fill()
    
    // Africa
    context.beginPath()
    context.ellipse(480, 200, 60, 100, 0, 0, Math.PI * 2)
    context.fill()
    
    // Europe
    context.beginPath()
    context.ellipse(450, 120, 40, 30, 0, 0, Math.PI * 2)
    context.fill()
    
    // Asia
    context.beginPath()
    context.ellipse(650, 140, 120, 80, 0, 0, Math.PI * 2)
    context.fill()
    
    // Australia
    context.beginPath()
    context.ellipse(750, 320, 50, 30, 0, 0, Math.PI * 2)
    context.fill()
    
    // Add some cloud-like patterns
    context.fillStyle = 'rgba(255, 255, 255, 0.3)'
    for (let i = 0; i < 30; i++) {
      const x = Math.random() * 1024
      const y = Math.random() * 512
      const radius = Math.random() * 30 + 10
      context.beginPath()
      context.arc(x, y, radius, 0, Math.PI * 2)
      context.fill()
    }
    
    return new THREE.CanvasTexture(canvas)
  }, [])

  // Auto-rotate the globe slowly
  useFrame((_state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1
    }
  })

  return (
    <group ref={meshRef}>
      <Sphere 
        args={[2, 64, 64]} 
        position={[0, 0, 0]}
      >
        <meshStandardMaterial 
          map={earthTexture}
          transparent={false}
        />
      </Sphere>
      
      {/* Render all predefined pins - these will rotate with the globe */}
      {PREDEFINED_PINS.map((pin) => (
        <PinMarker key={pin.id} pin={pin} globeRadius={2} />
      ))}
    </group>
  )
}

// Main Globe Component
const Globe: React.FC = () => {
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 1 }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'linear-gradient(to bottom, #000428 0%, #004e92 100%)' }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        {/* Earth Globe with predefined pins */}
        <EarthGlobe />
        
        {/* Controls for mouse/touch interaction */}
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          enableRotate={true}
          autoRotate={false}
          minDistance={3}
          maxDistance={10}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI - Math.PI / 6}
        />
      </Canvas>
    </div>
  )
}

export default Globe
