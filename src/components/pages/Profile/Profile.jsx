import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function LenticularPlane() {
  const meshRef = useRef();
  const { camera } = useThree();

  // Load textures once
  const texture1 = useMemo(
    () =>
      new THREE.TextureLoader().load(
        `${import.meta.env.BASE_URL}IlyaRozey.png`
      ),
    []
  );

  const texture2 = useMemo(
    () =>
      new THREE.TextureLoader().load(
        `${import.meta.env.BASE_URL}IlyaRozey2.png`
      ),
    []
  );
  const texture3 = useMemo(
    () =>
      new THREE.TextureLoader().load(
        `${import.meta.env.BASE_URL}IlyaRozey3.png`
      ),
    []
  );

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTexture1: { value: texture1 },
          uTexture2: { value: texture2 },
          uTexture3: { value: texture3 }
        },
        side: THREE.DoubleSide,

        vertexShader: `
          varying vec2 vUv;
          varying vec3 vNormal;
          varying vec3 vViewDir;

          void main() {
            vUv = uv;

            vNormal = normalize(normalMatrix * normal);

            vec4 worldPos = modelMatrix * vec4(position, 1.0);
            vViewDir = normalize(cameraPosition - worldPos.xyz);

            gl_Position = projectionMatrix * viewMatrix * worldPos;
          }
        `,

        fragmentShader: `
          uniform sampler2D uTexture1;
          uniform sampler2D uTexture2;
          uniform sampler2D uTexture3;

          varying vec2 vUv;
          varying vec3 vNormal;
          varying vec3 vViewDir;

          void main() {
            float angle = dot(vNormal, vViewDir);

            vec4 tex1 = texture2D(uTexture1, vUv);
            vec4 tex2 = texture2D(uTexture2, vUv);
            vec4 tex3 = texture2D(uTexture3, vUv);


            float mixVal = smoothstep(0.2, 0.8, angle);

            if (gl_FrontFacing) {
              // FRONT → lenticular effect
              gl_FragColor = mix(tex2, tex1, mixVal);
            } else {
              // BACK → plain image
              gl_FragColor = tex3;
            }
          }
        `
      }),
    [texture1, texture2]
  );

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[5, 3]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}

export default function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      <ambientLight intensity={1} />

      <LenticularPlane />

      {/* THIS lets you rotate manually */}
      <OrbitControls />
    </Canvas>
  );
}