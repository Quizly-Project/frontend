/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export default function OBubble(props) {
  const { nodes, materials } = useGLTF('/Environment/OBubble.glb');
  return (
    <group {...props} dispose={null}>
      <mesh
        name="Bubble"
        castShadow
        receiveShadow
        geometry={nodes.Bubble.geometry}
        material={materials.mat21}
        position={[0, 1.662, 0]}
      />
      <mesh
        name="O"
        castShadow
        receiveShadow
        geometry={nodes.O.geometry}
        material={materials.O}
        position={[-0.197, -0.133, -0.011]}
      />
    </group>
  );
}

useGLTF.preload('/Environment/OBubble.glb');
