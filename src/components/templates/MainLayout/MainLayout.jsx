import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import styles from './MainLayout.module.css';
import { useEffect, useState, useRef } from "react";
import Home from '../../pages/Home/Home';
import Gallery from '../../pages/Gallery/Gallery';
import Projects from '../../pages/Projects/Projects';
import Profile from '../../pages/About/About';

const MainLayout = () => {
    const getActiveClass = ({ isActive }) =>
        isActive ? `${styles.pageLink} ${styles.active}` : styles.pageLink;

    const location = useLocation();
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const pages = ["/", "/gallery", "/projects", "/profile"];
    const currentIndex = pages.indexOf(location.pathname);

    const [visualIndex, setVisualIndex] = useState(currentIndex !== -1 ? currentIndex : 0);
    const [transitionEnabled, setTransitionEnabled] = useState(true);
    const isAnimating = useRef(false);





    return (
        <>
            <div className={styles.container}>
                <aside
                    className={`${styles.sidebar} ${styles.left}`}
                    style={{ pointerEvents: isAnimating.current ? 'none' : 'auto' }}
                >
                    <NavLink to="/" className={getActiveClass}><span>MAIN</span></NavLink>
                    <NavLink to="/gallery" className={getActiveClass}><span>GALLERY</span></NavLink>
                    <NavLink to="/projects" className={getActiveClass}><span>PROJECTS</span></NavLink>
                    <NavLink to="/profile" className={getActiveClass}><span>ABOUT</span></NavLink>
                    <div className={`${styles.pageLink} ${open ? styles.active : ""}`}
                        onClick={() => setOpen(prev => !prev)}
                    >
                        <span>CONTACT</span>
                    </div>
                    {open && (
                        <div className={styles.contactList}>
                            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=katedavydenko245@gmail.com"> Email </a>
                            <a href="https://www.instagram.com/askellyapple">Instagram</a>
                            <a href="www.linkedin.com/in/kate-davydenko">LinkedIn</a>
                        </div>
                    )}
                </aside >
                <div className={styles.mainContent}>
                    <Outlet></Outlet>
                </div>
            </div >
        </>
    );
};

export default MainLayout;