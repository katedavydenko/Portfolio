import styles from './ProjectCard.module.css';
import { Link } from 'react-router-dom';
import { useState, useRef } from 'react';

const Post = ({ id, title, thumbnail, shortDescription, link, tech_stack }) => {
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef(null);


  return (
    <div className={styles.layout} style={{
      background: `url(${thumbnail}) center/cover no-repeat`
    }}>
      <div className={styles.right}>
        <div className={styles.info}>
          <span className={styles.title}>{title}</span>
          <p className={styles.description}>{shortDescription}</p>

        </div>
        <div className={styles.buttons}>
          <a href={link} className={styles.link}>VISIT</a>

          <Link to={`/projects/${id}`} className={styles.viewBtn}>VIEW PROJECT
          </Link>
        </div>
        <div className={styles.tags}>
          {tech_stack?.map((tech) => (
            <span key={tech} className={styles.tag}>
              {tech}
            </span>
          ))}
        </div>

      </div>


    </div>
  );
};

export default Post;