import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import styles from './About.module.css';
import RadarChart from '../../components/RadarChart/RadarChart.jsx';
import LenticularPlane from "../../components/LenticularPlane/LenticularPlane.jsx";
import { educationInfo } from "../../data/aboutData.js";

export default function Scene() {

  return (
    <div className={styles.layout}>

      <div className={styles.idContainer}>
        <Canvas camera={{ position: [0, 0, 5], fov: 70 }}>
          <ambientLight intensity={1} />
          <LenticularPlane />
          <OrbitControls />
        </Canvas>
      </div>

      <div className={styles.right}>
        <div className={styles.chartContainer}>
          <RadarChart />
        </div>
        <div className={styles.educationBlock}>
          <div className={styles.flipCard}>
            <div className={styles.flipCardInner}>
              <div className={styles.flipCardFront}>
                <img className={`${styles.paperClip} ${styles.front}`} src="/Portfolio/pc2.webp"></img>
                <div className = {styles.educationBlockLeft}><p>Education ;E</p></div>
                {educationInfo.map((item, index) => (
                  <div className = {styles.educationBlockRight} key={index}>
                    <p>{item.institution}</p>
                    <p>{item.years}</p>
                    <p>{item.specialty}</p>
                  </div>
                ))}
              </div>
              <div className={styles.flipCardBack}>
                <img className={`${styles.paperClip} ${styles.back}`} src="/Portfolio/pc1.webp"></img>
                <img src="/Portfolio/eti.webp" alt="eti"></img>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

  );
}