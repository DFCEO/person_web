"use client";

import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, PerspectiveCamera } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function Scene() {
  const meshRef = useRef<THREE.Mesh>(null!);

  // 这里的交互逻辑：模型会根据时间自转，并产生轻微扭动
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.x = time * 0.2;
    meshRef.current.rotation.y = time * 0.3;
  });

  return (
    <>
      <ambientLight intensity={1} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} color="#06b6d4" intensity={2} />
      
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <Sphere ref={meshRef} args={[1, 100, 200]} scale={1.8}>
          <MeshDistortMaterial
            color="#ffffff"     // 改成白色或浅灰色
            speed={4} 
            distort={0.3} 
            roughness={0}       // 粗糙度降为0（极亮）
            transmission={1}    // 开启透光性（需要组件包在一定的环境内）
            thickness={1}       // 增加厚度感
          />
        </Sphere>
      </Float>
    </>
  );
}

export default function Hero3D() {
  return (
    <div className="w-full h-[400px] md:h-[500px] cursor-pointer">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <Scene />
      </Canvas>
    </div>
  );
}