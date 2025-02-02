'use client'
import { Environment, OrbitControls, useTexture } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { Avatar } from "./Avatar";

export const Experience = () => {
  const texture = useTexture("textures/youtubeBackground.jpg");
  const viewport = useThree((state) => state.viewport);

  return (
    <>
      <OrbitControls enableZoom={false}  enableRotate={false} enablePan={false}/>
      <Avatar position={[0, -3.25, 6]} scale={2} />
      <Environment preset="sunset" />
      <mesh>
        <planeGeometry args={[viewport.width, viewport.height]} />
        <meshBasicMaterial map={texture} />
      </mesh>
    </>
  );
};