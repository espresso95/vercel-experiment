import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere } from '@react-three/drei'
import * as THREE from 'three'

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
    <Sphere ref={meshRef} args={[2, 64, 64]} position={[0, 0, 0]}>
      <meshStandardMaterial 
        map={earthTexture}
        transparent={false}
      />
    </Sphere>
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
        
        {/* Earth Globe */}
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
