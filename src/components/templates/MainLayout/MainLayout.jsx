import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import styles from './MainLayout.module.css';
import { useState } from "react";

const MainLayout = () => {
    const getActiveClass = ({ isActive }) =>
        isActive ? `${styles.pageLink} ${styles.active}` : styles.pageLink;

    const [open, setOpen] = useState(false);

    return (
        <>
            <div className={styles.container}>
                <aside
                    className={styles.sidebar}
                >
                    <NavLink to="/" className={getActiveClass}><span>MAIN</span></NavLink>
                    <NavLink to="/gallery" className={getActiveClass}><span>GALLERY</span></NavLink>
                    <NavLink to="/projects" className={getActiveClass}><span>PROJECTS</span></NavLink>
                    <NavLink to="/about" className={getActiveClass}><span>ABOUT</span></NavLink>
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
                            <a href="https://github.com/katedavydenko">GitHub</a>
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