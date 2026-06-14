import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import styles from './About.module.css';
import RadarChart from '../../RadarChart/RadarChart.jsx';
import LenticularPlane from "../../LenticularPlane/LenticularPlane.jsx";
import { educationInfo } from "../../../data/aboutData.js";

export default function Scene() {


  return (
    <div className={styles.layout}>

      <div className={styles.mainContent}>
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
            <p>Education</p>

            {educationInfo.map((item, index) => (
              <div key={index}>
                <p>{item.institution}</p>
                <p>{item.years}</p>
                <p>{item.specialty}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

  );
}