import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout/MainLayout.jsx';
import Home from './pages/Home/Home';
import Gallery from './pages/Gallery/Gallery';
import ProjectPage from './pages/ProjectPage/ProjectPage';
import About from './pages/About/About'
import NotFound from './pages/NotFound/NotFound';
import Projects from "./pages/Projects/Projects";

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
          <Route path="about" element={<About />}>
          </Route>

        </Route>
      </Routes>
    </>
  );
}
export default App;