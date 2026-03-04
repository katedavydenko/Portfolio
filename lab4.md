Лабораторна робота №4
1. https://github.com/katedavydenko/React_Project
2. https://katedavydenko.github.io/React_Project/
3. <Routes>
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Home />} />
      <Route path="feed" element={<Feed />} />
      <Route path="feed/:id" element={<PostPage />} />
      <Route path="profile" element={<Profile />}>
          <Route index element={<ProfileOverview />} />
          <Route path="settings" element={<ProfileSettings />} />
        </Route>
      <Route path="*" element={<NotFound />} />
  
      </Route>
  </Routes>
4. const Profile = () => {
    const getActiveClass = ({ isActive }) =>
            isActive? `${styles.link} ${styles.active}` : styles.link;
    return (
        <div className={styles.profileLayout}>
            <h3>Мій акаунт</h3>
            <div className={styles.filters}>
                <NavLink to="." end className={getActiveClass}>Інформація</NavLink>
                <NavLink to="settings" className={getActiveClass}>Налаштування</NavLink>
            </div>

            
            <div>
                <Outlet/>
            </div>

        </div>
        
    );
};
5. const PostPage = () => {
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
6. 1. У чому полягає фундаментальна різниця між клієнтською та серверною
маршрутизацією? Серверна маршрутизація вимагає повного перезавантаження
сторінки та запиту нового HTML-документа при кожній зміні URL. Клієнтська
маршрутизація (SPA) маніпулює DOM деревом за допомогою JavaScript, змінюючи
лише необхідні частини інтерфейсу без запиту всього документа.
2. Яку роль відіграє атрибут index у компоненті Route? Атрибут index вказує,
що даний маршрут є типовим (default) для батьківського маршруту. Він
відображається у батьківському Outlet, коли URL збігається точно зі шляхом батька.
3. Чому для програмної навігації в обробниках подій варто використовувати
useNavigate, а не Link? Link є декларативним компонентом для створення
клікабельних елементів у JSX. useNavigate повертає функцію, яку можна викликати
всередині будь-якої логіки (наприклад, після завершення fetch-запиту або валідації
форми), що забезпечує гнучкість управління потоком навігації.
4. Як реалізувати динамічне підсвічування активних посилань у навігаційній
панелі? Для цього використовується компонент NavLink. Його властивості

className та style можуть приймати функцію, яка отримує аргумент зі станом
isActive, що дозволяє застосовувати специфічні CSS-класи автоматично.
5. Що таке "catch-all" маршрут і де його слід розміщувати? Це маршрут із
шляхом *, який збігається з будь-яким URL. Його необхідно розміщувати останнім у
списку Routes, щоб він спрацював лише тоді, коли жоден інший визначений шлях не
підійшов.