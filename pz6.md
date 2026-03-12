1. export const useDuckAvatar = () => {
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    const fetchDuck = async () => {
      try {
        const res = await fetch("https://dog.ceo/api/breeds/image/random");
        const data = await res.json();
        setAvatar(data.message);
      } catch (error) {
        console.error("Duck API error:", error);
      }
    };

    fetchDuck();
  }, []);

  return avatar;
};
2. const Login = () => {
  const [email, setEmail] = useState("");
  const { login } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await login(email);
    setIsLoading(false);
    if (email) {
      
      login({ email });
      
      navigate("/profile", { replace: true });
    }
  };
3. const login = async (email) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users/1",
      );
      const userData = await response.json();

      setIsAuthenticated(true);
      setUser({ ...userData, email });
    } catch (error) {
      console.error("Помилка авторизації:", error);
    }
  };
  4. const NewsFeed = () => {
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
5. 1. Призначення AbortController
AbortController дозволяє скасувати HTTP-запит, якщо компонент розмонтовується або змінюється URL. Це запобігає витоку пам’яті та помилці оновлення стану для вже неіснуючого компонента.

2. Патерн “Тріада станів” (loading, error, data)
Це підхід, коли компонент має три можливі стани:

loading – дані завантажуються

error – сталася помилка

data – дані успішно отримані
Він покращує UX, бо користувач бачить індикатор завантаження і повідомлення про помилки, а не порожній екран.

3. Чому fetch виконується у useEffect
useEffect запускає запит після рендеру компонента і дозволяє контролювати, коли саме виконувати запит (наприклад, при зміні URL). Якщо викликати fetch прямо у функції компонента, запит буде виконуватись на кожному рендері, що може спричинити нескінченні запити.

4. Переваги axios над fetch

автоматичний парсинг JSON

краща обробка помилок HTTP-статусів

підтримка інтерцепторів (для авторизації, логування)

зручніший синтаксис і менше коду.

5. Ризик “Race Condition”
Якщо користувач швидко перемикає сторінки або параметри URL, може виникнути ситуація, коли старий запит завершується пізніше за новий і перезаписує стан застарілими даними. У результаті інтерфейс може показувати неправильну інформацію. Використання AbortController допомагає уникнути цієї проблеми.