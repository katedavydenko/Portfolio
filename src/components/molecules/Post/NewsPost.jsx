import Button from '../../atoms/Button/Button'; // 3 Лаб 1
import Card from '../Card/Card'; // 3 Лаб 1
import styles from './Post.module.css';

import { useDuckAvatar } from '../../../hooks/useDuckAvatar'

const NewsPost = ({ title, body }) => {
  const avatar = useDuckAvatar();
  return (
    <Card>
      <div >
        <div className={styles.header}>
            <img
            src={avatar || "https://via.placeholder.com/50"}
            alt="avatar"
            className={styles.avatar}
          />
          <div className={styles.info}>
          <span className={styles.author}>{title}</span>
          </div>
        </div>
      </div>

      <p className={styles.content}>{body}</p>

      
    </Card>
  );
};

export default NewsPost;
