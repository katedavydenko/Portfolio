1. https://katedavydenko.github.io/React_Project/
2. export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };
  const register = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  };


  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
3. <Route element={<ProtectedRoute />}>
        <Route path="profile" element={<Profile />}>
          <Route index element={<ProfileOverview />} />
          <Route path="settings" element={<ProfileSettings />} />
        </Route>
      </Route>
4. 1. Яку проблему вирішує Context API?
Context API вирішує проблему prop drilling — передачі пропсів через багато рівнів компонентів. Він дозволяє надавати дані (наприклад, стан авторизації) будь-якому компоненту без передачі їх через усі проміжні компоненти.

2. Чому іноді використовують Redux/Zustand замість Context API?
Redux або Zustand краще підходять для великих і складних додатків, бо мають зручніше управління глобальним станом, оптимізовану продуктивність, інструменти для дебагу та кращу масштабованість.

3. Роль патерна HOC для Protected Routes
HOC (Higher-Order Component) обгортає компонент і додає перевірку авторизації. Якщо користувач авторизований — компонент рендериться, якщо ні — відбувається перенаправлення на сторінку входу.

4. Навіщо використовується replace: true у Navigate?
replace: true замінює поточний запис у стеку історії браузера, а не додає новий. Тому користувач не зможе натиснути кнопку «Назад» і повернутися на захищену сторінку після перенаправлення.