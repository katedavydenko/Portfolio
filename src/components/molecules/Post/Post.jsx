import Button from '../../atoms/Button/Button';
import Card from '../Card/Card';
import styles from './Post.module.css';
import { Link } from 'react-router-dom';

const Post = ({ id, author, content, date, avatar }) => {
   const [likes, setLikes] = useState(0);





  const handleLike = () => {
    setLikes(likes + 1);
  };

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
        <Button variant="secondary" onClick={handleLike}>LIKE ({likes})</Button>
        <Button variant="primary">COMMENT</Button>
      </div>
    </Card>
  );
};

export default Post;