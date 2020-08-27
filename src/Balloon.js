/*
auto-generated by: https://github.com/react-spring/gltfjsx
*/

import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame, useLoader } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useSphere } from "use-cannon";
import niceColors from "nice-color-palettes";

const COUNT = 80;

export default function Balloons(props) {
  const time = useRef(COUNT * 40);

  const { nodes } = useLoader(GLTFLoader, "/balloon2.glb");

  const [body, api] = useSphere(() => ({
    mass: 1,
    linearDamping: 0.2,
    position: [
      10 * Math.random() * (Math.random() > 0.5 ? 1 : -1),
      -10 + Math.random() * -10,
      10 * Math.random() * (Math.random() > 0.5 ? 1 : -1),
    ],
    args: 0.5,
  }));

  const colors = useMemo(() => {
    const array = new Float32Array(COUNT * 3);
    const color = new THREE.Color();
    for (let i = 0; i < COUNT; i++)
      color
        .set(niceColors[23][Math.floor(Math.random() * 5)])
        .convertSRGBToLinear()
        .toArray(array, i * 3);
    return array;
  }, []);

  useFrame(() => {
    time.current -= 1;

    if (time.current === 0) {
      time.current = COUNT * 40;
    }

    if (time.current % 40 === 0) {
      api
        .at(time.current / 40)
        .position.set(
          10 * Math.random() * (Math.random() > 0.5 ? 1 : -1),
          -10 + Math.random() * -10,
          10 * Math.random() * (Math.random() > 0.5 ? 1 : -1)
        );
    }
  });

  const materialProps = {
    clearcoat: 1,
    clearcoatRoughness: 0,
    metalness: 0.2,
    roughness: 0.4,
    opacity: 0.9,
    transparent: true,
  };

  return (
    <group dispose={null} {...props}>
      <instancedMesh
        ref={body}
        args={[null, null, COUNT]}
        receiveShadow
        castShadow
      >
        <primitive attach="geometry" object={nodes.Sphere.geometry}>
          <instancedBufferAttribute
            attachObject={["attributes", "color"]}
            args={[colors, 3]}
          />
        </primitive>
        <meshPhysicalMaterial
          {...materialProps}
          vertexColors={THREE.VertexColors}
        />
      </instancedMesh>
    </group>
  );
}
