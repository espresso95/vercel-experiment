import React, { useRef, useMemo, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Sphere, Html } from '@react-three/drei'
import * as THREE from 'three'

interface Pin {
  id: string
  lat: number
  lng: number
  label: string
  color?: string
}

const PINS: Pin[] = [
  { id: 'nyc', lat: 40.7128, lng: -74.0060, label: 'New York', color: '#ff4444' },
  { id: 'london', lat: 51.5074, lng: -0.1278, label: 'London', color: '#44ff44' },
  { id: 'tokyo', lat: 35.6762, lng: 139.6503, label: 'Tokyo', color: '#4444ff' },
  { id: 'sf', lat: 37.7749, lng: -122.4194, label: 'San Francisco', color: '#ff8800' },
  { id: 'sydney', lat: -33.8688, lng: 151.2093, label: 'Sydney', color: '#8844ff' }
]

const latLngToVector3 = (lat: number, lng: number, radius = 2) => {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180)
  
  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  )
}

const PinMarker: React.FC<{ pin: Pin }> = ({ pin }) => {
  const position = latLngToVector3(pin.lat, pin.lng, 2.1)
  const { camera } = useThree()
  const [isVisible, setIsVisible] = useState(true)
  const groupRef = useRef<THREE.Group>(null!)
  
  useFrame(() => {
    if (!groupRef.current) return
    
    const worldPosition = new THREE.Vector3()
    groupRef.current.getWorldPosition(worldPosition)
    
    const pinDirection = worldPosition.clone().normalize()
    const cameraDirection = camera.position.clone().normalize()
    const dotProduct = pinDirection.dot(cameraDirection)
    
    setIsVisible(dotProduct > 0.2)
  })
  
  return (
    <group ref={groupRef} position={position}>
      <mesh>
        <cylinderGeometry args={[0.01, 0.01, 0.2]} />
        <meshStandardMaterial color={pin.color} />
      </mesh>
      <mesh position={[0, 0.1, 0]}>
        <sphereGeometry args={[0.05]} />
        <meshStandardMaterial color={pin.color} />
      </mesh>
      {isVisible && (
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
      )}
    </group>
  )
}

const EarthGlobe = () => {
  const meshRef = useRef<THREE.Mesh>(null!)
  
  const earthTexture = useMemo(() => {
    const loader = new THREE.TextureLoader()
    return loader.load('https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
  }, [])

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1
    }
  })

  return (
    <group ref={meshRef}>
      <Sphere args={[2, 64, 64]}>
        <meshBasicMaterial map={earthTexture} />
      </Sphere>
      {PINS.map((pin) => (
        <PinMarker key={pin.id} pin={pin} />
      ))}
    </group>
  )
}

const Globe: React.FC = () => (
  <div style={{ 
    width: '100vw', 
    height: '100vh', 
    position: 'fixed', 
    top: 0, 
    left: 0, 
    zIndex: 1 
  }}>
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      style={{ background: 'linear-gradient(to bottom, #000428 0%, #004e92 100%)' }}
    >
      <ambientLight intensity={1.2} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <pointLight position={[-10, -10, -10]} intensity={0.8} />
      <pointLight position={[0, 10, 0]} intensity={0.6} />
      
      <EarthGlobe />
      
      <OrbitControls
        enablePan={false}
        minDistance={3}
        maxDistance={10}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI - Math.PI / 6}
      />
    </Canvas>
  </div>
)

export default Globe
