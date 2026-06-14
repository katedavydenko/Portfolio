import { useParams } from "react-router-dom";
import projects from "../../../data/projects.js";
import styles from "./ProjectPage.module.css"
import { useRef, useEffect, useState } from "react";
import { getPaletteSync } from "colorthief";

export default function ProjectPage() {
  const { id } = useParams();

  const project = projects.find(p => p.id === id);
  const buttonRef = useRef(null);


  const imageRef = useRef(null);
  const [accentColor, setAccentColor] = useState("rgb(57,132,255)");
  const paletteRef = useRef(null);
  const [palette, setPalette] = useState({
    primary: "rgb(57,132,255)",
    secondary: "rgb(30,193,65)",
    accent: "rgb(255,170,0)",
    light: "rgb(240,240,240)",
    dark: "rgb(40,40,40)",
  });
  useEffect(() => {
    const img = paletteRef.current;

    if (!img) return;

    const extractPalette = () => {
      try {
        const colors = getPaletteSync(img, 5);

        const format = (c) => {
          if (!c) return "rgb(0,0,0)";
          return `rgb(${c._r}, ${c._g}, ${c._b})`;
        };

        setPalette({
          primary: format(colors[0]),
          secondary: format(colors[1]),
          accent: format(colors[2]),
          light: format(colors[3]),
          dark: format(colors[4]),
        });
      } catch (err) {
        console.error(err);
      }
    };

    if (img.complete) {
      extractPalette();
    } else {
      img.onload = extractPalette;
    }
  }, [project]);
  return (
    <div ref={buttonRef} className={styles.projectPageLayout} style={{
      "--primary-color": palette.primary,
      "--secondary-color": palette.secondary,
      "--accent-color": palette.accent,
      "--light-color": palette.light,
      "--dark-color": palette.dark,
    }}>
      <img
        ref={paletteRef}
        src={project.paletteImage}
        alt=""
        crossOrigin="anonymous"
        style={{ display: "none" }}
      />
      <div className={styles.container}>


        <div className={styles.projectDetails}>
          <div className={styles.projectTitle}>{project.title}</div>
          <div className={styles.fullDescription}>{project.fullDescription}</div>

          <div className={styles.roles}>
            <p>Roles:</p>
            {project.roles.map(feature => (
              <p key={feature}>{feature}</p>
            ))}
          </div>
        </div>



        <div className={styles.picDisplay}>
          {project.pics.map((pic, index) => (
            <div
              key={index}
              className={styles.slide}
              style={{ zIndex: index + 1 }}
            >
              <img
                src={pic}
                alt={`pic-${index}`}
                className={styles.picStyle}
              />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

