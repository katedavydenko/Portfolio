import { useEffect, useRef } from "react";
import styles from "./Home.module.css";
import main from '../../pages/Feed/pics/main.png'

const Home = () => {
  const leftPupilRef = useRef(null);
  const rightPupilRef = useRef(null);

  useEffect(() => {
    const pupils = [leftPupilRef.current, rightPupilRef.current];

    const handleMouseMove = (e) => {
      pupils.forEach((pupil) => {
        if (!pupil) return;

        const eye = pupil.parentElement;
        if (!eye) return;

        const rect = eye.getBoundingClientRect();
        const eyeX = rect.left + rect.width / 2;
        const eyeY = rect.top + rect.height / 2;

        const dx = e.clientX - eyeX;
        const dy = e.clientY - eyeY;

        const angle = Math.atan2(dy, dx);
        const maxDistance =
          rect.width / 2 - pupil.offsetWidth / 2;

        const x = Math.cos(angle) * maxDistance;
        const y = Math.sin(angle) * maxDistance;

        pupil.style.transform =
          `translate(-50%, -50%) translate(${x}px, ${y}px)`;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className={styles.skelly}>
      
      <div className={styles.eye1}>
        <div ref={leftPupilRef} className={styles.pupil}></div>
      </div>

      <div className={styles.eye2}>
        <div ref={rightPupilRef} className={styles.pupil}></div>
      </div>
      <img src = {main}></img>
    </div>
  );
};

export default Home;