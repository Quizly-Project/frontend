/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';

export default function BrokenLand(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF('/Environment/OLand.glb');
  const { actions, mixer } = useAnimations(animations, group);

  useEffect(() => {
    if (!actions['break']) return;
    const action = actions['break'];

    // 한 번만 실행
    action.setLoop(THREE.LoopOnce, 1);
    action.clampWhenFinished = true;

    // 재생
    action.reset().fadeIn(0.3).play();

    // 액션 종료 리스너
    const onFinished = e => {
      if (e.action === action) {
        // console.log('Animation finished');
        // 애니메이션을 첫 프레임으로 리셋하고 정지
        action.reset();
        action.stop();
      }
    };

    mixer.addEventListener('finished', onFinished);

    return () => {
      if (action) {
        action.fadeOut(0.5);
        mixer.removeEventListener('finished', onFinished);
      }
      group.current = null;
    };
  }, [actions, mixer]);

  // 일정한 프레임 유지
  useFrame((state, delta) => {
    if (mixer) {
      mixer.update(delta);
    }
  });

  return (
    <RigidBody type="fixed" colliders="hull" friction={5}>
      <group ref={group} {...props} dispose={null}>
        <group name="Scene">
          <mesh
            name="Xland_cell"
            geometry={nodes.Xland_cell.geometry}
            material={materials['Dirt.001']}
            position={[59.492, -26.874, -17.878]}
          />
          <mesh
            name="Xland_cell001"
            geometry={nodes.Xland_cell001.geometry}
            material={materials['Dirt.001']}
            position={[62.887, -54.061, -13.564]}
          />
          <mesh
            name="Xland_cell002"
            geometry={nodes.Xland_cell002.geometry}
            material={materials['Dirt.001']}
            position={[46.281, -11.6, 10.581]}
          />
          <group name="Xland_cell003" position={[61.049, 5.845, 29.417]}>
            <mesh
              name="Xland_cell002_1"
              geometry={nodes.Xland_cell002_1.geometry}
              material={materials['Dirt.001']}
            />
            <mesh
              name="Xland_cell002_2"
              geometry={nodes.Xland_cell002_2.geometry}
              material={materials['Grass.001']}
            />
          </group>
          <group name="Xland_cell004" position={[44.898, 5.423, 19.931]}>
            <mesh
              name="Xland_cell003_1"
              geometry={nodes.Xland_cell003_1.geometry}
              material={materials['Dirt.001']}
            />
            <mesh
              name="Xland_cell003_2"
              geometry={nodes.Xland_cell003_2.geometry}
              material={materials['Grass.001']}
            />
          </group>
          <group name="Xland_cell005" position={[59.563, -2.263, -33.43]}>
            <mesh
              name="Xland_cell004_1"
              geometry={nodes.Xland_cell004_1.geometry}
              material={materials['Dirt.001']}
            />
            <mesh
              name="Xland_cell004_2"
              geometry={nodes.Xland_cell004_2.geometry}
              material={materials['Grass.001']}
            />
          </group>
          <group name="Xland_cell006" position={[54.585, 5.748, 35.879]}>
            <mesh
              name="Xland_cell005_1"
              geometry={nodes.Xland_cell005_1.geometry}
              material={materials['Dirt.001']}
            />
            <mesh
              name="Xland_cell005_2"
              geometry={nodes.Xland_cell005_2.geometry}
              material={materials['Grass.001']}
            />
          </group>
          <mesh
            name="Xland_cell007"
            geometry={nodes.Xland_cell007.geometry}
            material={materials['Dirt.001']}
            position={[70.559, -29.587, 9.541]}
          />
          <mesh
            name="Xland_cell008"
            geometry={nodes.Xland_cell008.geometry}
            material={materials['Dirt.001']}
            position={[49.383, -50.634, 13.461]}
          />
          <mesh
            name="Xland_cell009"
            geometry={nodes.Xland_cell009.geometry}
            material={materials['Dirt.001']}
            position={[39.618, -34.788, 3.682]}
          />
          <mesh
            name="Xland_cell010"
            geometry={nodes.Xland_cell010.geometry}
            material={materials['Dirt.001']}
            position={[73.903, -51.668, -4.748]}
          />
          <mesh
            name="Xland_cell011"
            geometry={nodes.Xland_cell011.geometry}
            material={materials['Dirt.001']}
            position={[72.658, -15.396, -11.554]}
          />
          <mesh
            name="Xland_cell012"
            geometry={nodes.Xland_cell012.geometry}
            material={materials['Dirt.001']}
            position={[60.96, -70.126, 4.661]}
          />
          <mesh
            name="Xland_cell013"
            geometry={nodes.Xland_cell013.geometry}
            material={materials['Dirt.001']}
            position={[70.515, -56.093, 7.327]}
          />
          <group name="Xland_cell014" position={[58.789, 4.685, -28.051]}>
            <mesh
              name="Xland_cell013_1"
              geometry={nodes.Xland_cell013_1.geometry}
              material={materials['Dirt.001']}
            />
            <mesh
              name="Xland_cell013_2"
              geometry={nodes.Xland_cell013_2.geometry}
              material={materials['Grass.001']}
            />
          </group>
          <mesh
            name="Xland_cell015"
            geometry={nodes.Xland_cell015.geometry}
            material={materials['Dirt.001']}
            position={[40.902, -27.573, -15.767]}
          />
          <group name="Xland_cell016" position={[72.813, 0.089, 18.893]}>
            <mesh
              name="Xland_cell015_1"
              geometry={nodes.Xland_cell015_1.geometry}
              material={materials['Dirt.001']}
            />
            <mesh
              name="Xland_cell015_2"
              geometry={nodes.Xland_cell015_2.geometry}
              material={materials['Grass.001']}
            />
          </group>
          <group name="Xland_cell017" position={[37.279, -3.265, -2.976]}>
            <mesh
              name="Xland_cell016_1"
              geometry={nodes.Xland_cell016_1.geometry}
              material={materials['Dirt.001']}
            />
            <mesh
              name="Xland_cell016_2"
              geometry={nodes.Xland_cell016_2.geometry}
              material={materials['Grass.001']}
            />
          </group>
          <mesh
            name="Xland_cell018"
            geometry={nodes.Xland_cell018.geometry}
            material={materials['Dirt.001']}
            position={[59.484, -70.248, -5.171]}
          />
          <group name="Xland_cell019" position={[73.6, 2.24, 0.767]}>
            <mesh
              name="Xland_cell018_1"
              geometry={nodes.Xland_cell018_1.geometry}
              material={materials['Dirt.001']}
            />
            <mesh
              name="Xland_cell018_2"
              geometry={nodes.Xland_cell018_2.geometry}
              material={materials['Grass.001']}
            />
          </group>
          <mesh
            name="Xland_cell020"
            geometry={nodes.Xland_cell020.geometry}
            material={materials['Dirt.001']}
            position={[60.048, -50.838, 18.655]}
          />
          <mesh
            name="Xland_cell021"
            geometry={nodes.Xland_cell021.geometry}
            material={materials['Dirt.001']}
            position={[57.504, -15.007, 21.695]}
          />
          <group name="Xland_cell022" position={[44.62, -1.817, -19.903]}>
            <mesh
              name="Xland_cell021_1"
              geometry={nodes.Xland_cell021_1.geometry}
              material={materials['Dirt.001']}
            />
            <mesh
              name="Xland_cell021_2"
              geometry={nodes.Xland_cell021_2.geometry}
              material={materials['Grass.001']}
            />
          </group>
          <group name="Xland_cell023" position={[72.602, 3.871, -21.495]}>
            <mesh
              name="Xland_cell022_1"
              geometry={nodes.Xland_cell022_1.geometry}
              material={materials['Dirt.001']}
            />
            <mesh
              name="Xland_cell022_2"
              geometry={nodes.Xland_cell022_2.geometry}
              material={materials['Grass.001']}
            />
          </group>
          <mesh
            name="Xland_cell024"
            geometry={nodes.Xland_cell024.geometry}
            material={materials['Dirt.001']}
            position={[52.18, -70.117, 1.223]}
          />
          <mesh
            name="Xland_cell025"
            geometry={nodes.Xland_cell025.geometry}
            material={materials['Dirt.001']}
            position={[47.599, -54.514, -5.996]}
          />
        </group>
      </group>
    </RigidBody>
  );
}

useGLTF.preload('/Environment/OLand.glb');
