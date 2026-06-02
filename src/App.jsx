import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/templates/MainLayout/MainLayout';
import Home from './components/pages/Home/Home';
import Gallery from './components/pages/Gallery/Gallery';
import ProjectPage from './components/pages/ProjectPage/ProjectPage';
import Profile from './components/pages/About/About'
import NotFound from './components/pages/NotFound/NotFound';
import Projects from "./components/pages/Projects/Projects";
import ReturnWallet from "./components/pages/ReturnWallet/ReturnWallet";

function App() {

  return (
    <>


      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:id" element={<ProjectPage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="return_wallet" element={<ReturnWallet />} />
          <Route path="profile" element={<Profile />}>
          </Route>

        </Route>
      </Routes>
    </>
  );
}
export default App;