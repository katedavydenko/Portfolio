import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef, useMemo, useState } from "react";
import { Link } from 'react-router-dom';
import * as THREE from "three";
import styles from './About.module.css';
import RadarChart from '../../molecules/RadarChart/RadarChart.jsx';
import wallet from '/wallet.png'
import krita from '/krita.svg'
import blender from '/blender.png'
import aaf from '/aaf.png'
import canva from '/canva.svg'
import figma from '/figma.png'
import layer1 from '/wallet_l1.png'
function LenticularPlane({ width = 5, height = 3, radius = 0.3 }) {
  const meshRef = useRef();
  const { camera } = useThree();
  function RoundedPlane({ width = 5, height = 3, radius = 0.3 }) {
    const shape = useMemo(() => {
      const x = -width / 2;
      const y = -height / 2;

      const s = new THREE.Shape();

      s.moveTo(x + radius, y);

      s.lineTo(x + width - radius, y);
      s.quadraticCurveTo(x + width, y, x + width, y + radius);

      s.lineTo(x + width, y + height - radius);
      s.quadraticCurveTo(
        x + width,
        y + height,
        x + width - radius,
        y + height
      );

      s.lineTo(x + radius, y + height);
      s.quadraticCurveTo(x, y + height, x, y + height - radius);

      s.lineTo(x, y + radius);
      s.quadraticCurveTo(x, y, x + radius, y);

      return s;
    }, [width, height, radius]);

    return <shapeGeometry args={[shape]} />;
  }
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
        transparent: true,
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
            vec4 finalColor;

            if (gl_FrontFacing) {
              finalColor = mix(tex2, tex1, mixVal);
            } else {
              finalColor = tex3;
            }

            /* rounded corners */
            float radius = 0.02;

            vec2 dist = abs(vUv - 0.5) - 0.5 + radius;
            float corner = length(max(dist, 0.0)) - radius;

            if (corner > 0.0) discard;

            gl_FragColor = finalColor;
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
function AnimatedText({ children }) {
  return (
    <div className={styles.animatedText}>
      {children.split("").map((letter, index) => (
        <span
          key={index}
          style={{
            animationDelay: `${index * 0.05}s`
          }}
        >
          {letter === " "
            ? "\u00A0"
            : letter}
        </span>
      ))}
    </div>
  );
}
export default function Scene() {

  const [revealed, setRevealed] = useState(false);
  const [showText, setShowText] = useState(false);
  const [finalReveal, setFinalReveal] = useState(false);
  const handleClick = () => {

    // show text after image click
    setTimeout(() => {
      setShowText(true);

    }, 300);

    // reveal after 5 seconds
    setTimeout(() => {
      setFinalReveal(true);
      setRevealed(true);

    }, 5300);
  };
  const [showOptions, setShowOptions] = useState(false);
  const [hideCookie, setHideCookie] = useState(false);

  const handleCookieClick = () => {
    setShowOptions(true);
  };

  const handleEat = () => {
    setHideCookie(true);
    setShowOptions(false);
  };

  const handleLeave = () => {
    setShowOptions(false);
  };
  return (
    <div className={styles.layout}>

      <div className={`${styles.cover} ${finalReveal ? styles.hideCover : ""
        }`}>
        {showText && (
          <AnimatedText>
            Oh, you found a wallet!
          </AnimatedText>
        )}

        <div className={showText ? styles.lightUp : styles.wiggle}>
          <img
            className={revealed ? styles.hideImg : ""}
            src={wallet}
            alt="click me"
            onClick={handleClick}
          />
        </div>
      </div>
      <div className={revealed ? styles.mainContent : styles.noDisplay}>
        <div className={styles.left}>
          <div className={styles.wallet}>
            <div className={styles.layer1} ></div>
            <div className={styles.layer2} ></div>
            {!hideCookie && (
              <div
                className={styles.cookie}
                onClick={handleCookieClick}
              >
                {showOptions && (
                  <div
                    className={styles.options}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <p onClick={handleEat}>
                      EAT
                    </p>

                    <p onClick={handleLeave}>
                      LEAVE
                    </p>
                  </div>
                )}
              </div>
            )}

            <div className={styles.softwares}>
              {[krita, blender, aaf, canva, figma].map((img, i) => (
                <div
                  key={i}
                  className={styles.item}
                  style={{ "--i": i }}
                >
                  <img src={img} />
                  <p>
                    {[
                      "Krita",
                      "Blender",
                      "Adobe After Effects",
                      "Canva",
                      "Figma",
                    ][i]}
                  </p>
                </div>
              ))}
            </div>
          </div>


        </div>

        <div className={styles.canvas}>
          <Canvas camera={{ position: [0, 0, 5], fov: 100 }}>
            <ambientLight intensity={1} />

            <LenticularPlane />

            <OrbitControls />
          </Canvas>
        </div>
        <div className={styles.right}>
          <RadarChart />
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=katedavydenko245@gmail.com">Email</a>
          <a href="https://www.instagram.com/askellyapple">Instagram</a>
          <a href="www.linkedin.com/in/kate-davydenko">LinkedIn</a>
          <Link to={`/return_wallet`} className={styles.returnButton} data-back="&#x21E8;" data-front="RETURN THE WALLET"></Link>
        </div>
      </div>
    </div>

  );
}