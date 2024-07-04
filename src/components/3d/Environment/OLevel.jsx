import { RigidBody } from '@react-three/rapier';

export default function OLevel() {
  return (
    <>
      <RigidBody type="fixed" friction={5}>
        <mesh
          position-x={25}
          position-y={-5}
          rotation-x={-Math.PI * 0.5}
          scale={50}
        >
          <boxGeometry args={[1, 1, 0.1]} />
          <meshBasicMaterial color="#9ED999" />
        </mesh>
      </RigidBody>
    </>
  );
}
