import styles from './ProjectCard.module.css';
import { Link } from 'react-router-dom';

const ProjectCard = ({ id, title, thumbnail, shortDescription, link, techStack }) => {
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
          {techStack?.map((tech) => (
            <span key={tech} className={styles.tag}>
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;