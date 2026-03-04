import { useParams, Link } from 'react-router-dom';
import { postsData } from '../../../data2';
import styles from '../../../App.module.css';

const PostPage = () => {
  const { id } = useParams();

  // Convert id to number because params are strings
  const post = postsData.find(p => p.id === Number(id));

  if (!post) {
    return (
      <div className={styles.appContainer}>
        <h2>Пост не знайдено</h2>
        <Link to="/feed">← Повернутися до стрічки</Link>
      </div>
    );
  }

  return (
    <div className={styles.appContainer}>
      <Link to="/feed" >
        ← Назад до стрічки
      </Link>

      <div className={styles.postPage}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img
            src={post.avatar}
            alt={post.author}
            width="50"
            height="50"
            style={{ borderRadius: '50%' }}
          />
          <div>
            <h3>{post.author}</h3>
            <p style={{ fontSize: '14px', opacity: 0.7 }}>{post.date}</p>
          </div>
        </div>

        <p>
          {post.content}
        </p>

        <div>
          <strong>Категорія:</strong> {post.category}
        </div>

        <div>
          ❤️ {post.likes} вподобань
        </div>
      </div>
    </div>
  );
};

export default PostPage;