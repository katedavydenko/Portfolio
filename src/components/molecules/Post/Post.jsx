import Button from '../../atoms/Button/Button'; // 3 Лаб 1
import Card from '../Card/Card'; // 3 Лаб 1
import styles from './Post.module.css';
import { Link } from 'react-router-dom';

const Post = ({ id, author, content, date, avatar }) => {
  
  return (
    <Card>
      <Link to={`/feed/${id}`}>
        <div className={styles.header}>
          <img src={avatar} alt="avatar" className={styles.avatar} />
          <div className={styles.info}>
            <span className={styles.author}>{author}</span>
            <span className={styles.date}>{date}</span>
          </div>
        </div>
       </Link>

      <p className={styles.content}>{content}</p>

      <div className={styles.actions}>
        <Button variant="secondary">Лайк</Button>
        <Button variant="primary">Коментувати</Button>
      </div>
    </Card>
  );
};


export default Post;
