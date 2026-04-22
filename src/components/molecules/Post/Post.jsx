import Button from '../../atoms/Button/Button';
import styles from './Post.module.css';
import { Link } from 'react-router-dom';
import { useState, useRef } from 'react';

const Post = ({ id, title, preview, description, date, previewThumbnail }) => {
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef(null);

  const hasVideo = !!preview;;

  return (
    <div className={styles.layout}
      onMouseEnter={() => {
        setHovered(true);
        if (videoRef.current) videoRef.current.play();
      }}
      onMouseLeave={() => {
        setHovered(false);
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0; // reset
        }
      }}
    >
      {/* LEFT PREVIEW */}
      {hasVideo && hovered ? (
        <video
          ref={videoRef}
          src={preview}
          muted
          autoPlay
          className={`${styles.avatar} ${hovered ? styles.fadeIn : styles.fadeOut}`}
        />
      ) : (
        <img src={previewThumbnail} className={styles.avatar} />
      )}
      <div className={styles.right}>
        <div className={styles.top}>
          <div className={styles.info}>
            <span className={styles.title}>{title}</span>
            <p className={styles.description}>{description}</p>

          </div>
        </div>
        <div className={styles.bottom}>
          <span className={styles.description}>{date}</span>

          <Link to={`/Projects/${id}`} className={styles.button}>VIEW
          </Link>

        </div>
      </div>


    </div>
  );
};

export default Post;