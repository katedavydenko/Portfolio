import { useFetch } from "../../../hooks/useFetch";
import NewsPost from '../../molecules/Post/NewsPost';

const NewsFeed = () => {
  const {
    data: posts,
    isLoading,
    error,
  } = useFetch("https://jsonplaceholder.typicode.com/posts");

  if (isLoading) {
    return <div className="spinner">LoAdInG...</div>;
  }

  // 2. Стан помилки
  if (error) {
    return <div className="error-message">ErRoR: {error}</div>;
  }

  // 3. Стан успішного завантаження
  return (
    <div className="news-feed">
      <h2>latest news</h2>
      <div className="posts-grid">
        {posts &&
          posts
            .slice(0, 10)
            .map((post) => (
              <NewsPost key={post.id} title={post.title} body={post.body} />
            ))}
      </div>
    </div>
  );
};

export default NewsFeed;