"use client";

import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

// ── Torus ─────────────────────────────────────────────────────────────────────
function FloatingTorus({
  position, rotation, scale, speed, color,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number; speed: number; color: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * speed * 0.4) * 0.3 + rotation[0];
    meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.3;
    meshRef.current.rotation.z = Math.cos(state.clock.elapsedTime * speed * 0.2) * 0.2 + rotation[2];
  });
  return (
    <Float speed={speed} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <torusGeometry args={[1, 0.35, 16, 50]} />
        <meshStandardMaterial color={color} wireframe transparent opacity={0.25} />
      </mesh>
    </Float>
  );
}

// ── Icosahedron ───────────────────────────────────────────────────────────────
function FloatingIco({
  position, scale, speed, color,
}: {
  position: [number, number, number];
  scale: number; speed: number; color: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.2;
    meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.3;
  });
  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial color={color} wireframe transparent opacity={0.2} />
      </mesh>
    </Float>
  );
}

// ── Distorted orb ─────────────────────────────────────────────────────────────
function FloatingOrb({
  position, scale,
}: {
  position: [number, number, number]; scale: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.z = state.clock.elapsedTime * 0.1;
  });
  return (
    <Float speed={1.5} floatIntensity={1.2}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <sphereGeometry args={[1, 32, 32]} />
        <MeshDistortMaterial color="#00FF9B" transparent opacity={0.12} distort={0.45} speed={2} />
      </mesh>
    </Float>
  );
}

// ── Octahedron ────────────────────────────────────────────────────────────────
function FloatingOcta({
  position, scale, speed,
}: {
  position: [number, number, number]; scale: number; speed: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.25;
    meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.15;
    meshRef.current.rotation.z = state.clock.elapsedTime * speed * 0.1;
  });
  return (
    <Float speed={speed} rotationIntensity={0.4} floatIntensity={0.9}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <octahedronGeometry args={[1]} />
        <meshStandardMaterial color="#00FF9B" wireframe transparent opacity={0.18} />
      </mesh>
    </Float>
  );
}

// ── Subtle camera drift on mouse ─────────────────────────────────────────────
function CameraDrift() {
  const { camera } = useThree();
  const target = useRef({ x: 0, y: 0 });

  useFrame(() => {
    camera.position.x += (target.current.x * 0.4 - camera.position.x) * 0.04;
    camera.position.y += (target.current.y * 0.3 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// ── Main export ───────────────────────────────────────────────────────────────
// NOTE: This component is meant to be placed inside a position:relative container.
// The Canvas will fill 100% width/height of that container.
// DO NOT wrap in absolute inset-0 here — the parent (page.tsx right panel) handles positioning.

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 55 }}
      style={{ width: "100%", height: "100%", background: "transparent" }}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#00FF9B" />
      <pointLight position={[-5, -3, 3]} intensity={0.5} color="#ffffff" />
      <pointLight position={[0, 8, 2]} intensity={0.3} color="#00FF9B" />

      <CameraDrift />

      {/* Large torus — dominant centerpiece */}
      <FloatingTorus
        position={[0.5, 0.5, 0]}
        rotation={[0.3, 0, 0.1]}
        scale={2.2}
        speed={0.7}
        color="#00FF9B"
      />

      {/* Medium torus — lower right, different axis */}
      <FloatingTorus
        position={[1.8, -2, -1]}
        rotation={[0.8, 0.3, 0]}
        scale={1.1}
        speed={1.1}
        color="#00FF9B"
      />

      {/* Icosahedron — upper left */}
      <FloatingIco
        position={[-2, 2, -1.5]}
        scale={1.3}
        speed={0.6}
        color="#00FF9B"
      />

      {/* Icosahedron — lower right small */}
      <FloatingIco
        position={[2.5, -1.5, -2]}
        scale={0.8}
        speed={1.3}
        color="#00FF9B"
      />

      {/* Octahedron — upper right */}
      <FloatingOcta
        position={[2.2, 2, -0.5]}
        scale={0.9}
        speed={0.9}
      />

      {/* Big distorted orb — center, very subtle */}
      <FloatingOrb position={[0, 0, -1]} scale={3} />

      {/* Tiny torus scattered */}
      <FloatingTorus
        position={[-1.5, -2.5, -1]}
        rotation={[0.5, 0, 0.3]}
        scale={0.5}
        speed={1.6}
        color="#00FF9B"
      />
    </Canvas>
  );
}