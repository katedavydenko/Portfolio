import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/templates/MainLayout/MainLayout';
import Home from './components/pages/Home/Home';
import Feed from './components/pages/Feed/Feed';
import PostPage from './components/pages/PostPage/PostPage';
import Profile from './components/pages/Profile/Profile'
import NotFound from './components/pages/NotFound/NotFound';
import ProfileSettings from './components/pages/Profile/ProfileSettings';
import ProfileOverview from './components/pages/Profile/ProfileOverview';
import Login from './components/pages/Login/Login';
import Register from './components/pages/Register/Register';
import ProtectedRoute from "./components/hoc/ProtectedRoute";
import Projects from "./components/pages/Projects/Projects";
import useOnlineStatus from "./hooks/useOnlineStatus";

function App()  {
  const isOnline = useOnlineStatus();

  return (
    <>
      

      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="feed" element={<Feed />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:id" element={<PostPage />} />
          <Route path="login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />

          <Route path="profile" element={<Profile />}>
            <Route index element={<ProfileOverview />} />
            <Route path="settings" element={<ProfileSettings />} />
          </Route>
       
        </Route>
      </Routes>
    </>
  );
}
export default App;