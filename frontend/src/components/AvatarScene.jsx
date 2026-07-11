/* eslint-disable react/no-unknown-property */
import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/** Floating icosahedron avatar that tilts with cursor via THREE + a shared mouse ref. */
function Icosahedron({ mouseRef }) {
  const mesh = useRef();
  const wireMesh = useRef();

  useFrame((state, dt) => {
    const { x, y } = mouseRef.current;
    if (mesh.current) {
      // ease toward target rotation
      mesh.current.rotation.x = THREE.MathUtils.damp(
        mesh.current.rotation.x,
        y * 0.6,
        4,
        dt
      );
      mesh.current.rotation.y = THREE.MathUtils.damp(
        mesh.current.rotation.y,
        x * 0.6 + state.clock.elapsedTime * 0.15,
        4,
        dt
      );
    }
    if (wireMesh.current) {
      wireMesh.current.rotation.x = state.clock.elapsedTime * 0.1 - y * 0.4;
      wireMesh.current.rotation.y = -state.clock.elapsedTime * 0.15 + x * 0.4;
    }
  });

  return (
    <group>
      {/* Purple outer wireframe */}
      <mesh ref={wireMesh} scale={1.55}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial
          color="#7B2CBF"
          wireframe
          transparent
          opacity={0.55}
        />
      </mesh>

      {/* Neon core */}
      <mesh ref={mesh}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#0d0d11"
          emissive="#39FF14"
          emissiveIntensity={0.35}
          roughness={0.25}
          metalness={0.85}
          wireframe={false}
        />
      </mesh>

      {/* Inner pink glow shell */}
      <mesh scale={0.5}>
        <icosahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color="#FF00FF" wireframe transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

function Particles() {
  const points = useRef();
  const count = 500;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.03;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#7B2CBF"
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  );
}

export default function AvatarScene({ mouseRef }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.2], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[3, 3, 3]} color="#39FF14" intensity={1.2} />
      <pointLight position={[-3, -2, 2]} color="#FF00FF" intensity={1.1} />
      <pointLight position={[0, 0, 4]} color="#7B2CBF" intensity={0.6} />
      <Particles />
      <Icosahedron mouseRef={mouseRef} />
    </Canvas>
  );
}
