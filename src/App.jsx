import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/templates/MainLayout/MainLayout';
import Home from './components/pages/Home/Home';
import Feed from './components/pages/Feed/Feed';
import PostPage from './components/pages/PostPage/PostPage';
import Profile from './components/pages/Profile/Profile'
import NotFound from './components/pages/NotFound/NotFound';
import ProfileSettings from './components/pages/Profile/ProfileSettings';
import ProfileOverview from './components/pages/Profile/ProfileOverview';
function App() {
  return (
  <Routes>
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
  );
}
export default App;