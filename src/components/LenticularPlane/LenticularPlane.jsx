import { useRef, useMemo } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

export default function LenticularPlane({
  width = 5,
  height = 3,
}) {
  const texture1 = useMemo(
    () =>
      new THREE.TextureLoader().load(
        `${import.meta.env.BASE_URL}/about_assets/front1.webp`
      ),
    []
  );

  const texture2 = useMemo(
    () =>
      new THREE.TextureLoader().load(
        `${import.meta.env.BASE_URL}/about_assets/front2.webp`
      ),
    []
  );

  const texture3 = useMemo(
    () =>
      new THREE.TextureLoader().load(
        `${import.meta.env.BASE_URL}/about_assets/back.webp`
      ),
    []
  );

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        uniforms: {
          uTexture1: { value: texture1 },
          uTexture2: { value: texture2 },
          uTexture3: { value: texture3 },
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
            vec4 finalColor;

            if (gl_FrontFacing) {
              finalColor = mix(tex2, tex1, mixVal);
            } else {
              finalColor = tex3;
            }

            float radius = 0.02;

            vec2 dist = abs(vUv - 0.5) - 0.5 + radius;
            float corner = length(max(dist, 0.0)) - radius;

            if (corner > 0.0) discard;

            gl_FragColor = finalColor;
          }
        `,
      }),
    [texture1, texture2, texture3]
  );

  return (
    <mesh>
      <planeGeometry args={[width, height]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}