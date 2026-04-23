import { useEffect, useState } from "react";
import styles from "./Home.module.css";

export default function ParallaxPage() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;

      setPos({ x, y });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div className={styles.container}>
      
      {/* BACKGROUND (moves less) */}
      <div
        className={styles.bg}
        style={{
          transform: `translate(${pos.x * 10}px, ${pos.y * 10}px)`
        }}
      />

      {/* MIDDLE */}
      <div
        className={styles.mid}
        style={{
          transform: `translate(${pos.x * 20}px, ${pos.y * 20}px)`
        }}
      />

      {/* FRONT (moves more) */}
      <div
        className={styles.front}
        style={{
          transform: `translate(${pos.x * 40}px, ${pos.y * 40}px)`
        }}
      >
      </div>

    </div>
  );
}