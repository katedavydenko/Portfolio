import { NavLink, Outlet, useLocation } from 'react-router-dom';
import styles from '../../../App.module.css';
import { useEffect, useState } from "react";

const MainLayout = () => {
    const getActiveClass = ({ isActive }) =>
        isActive ? `${styles.pageLink} ${styles.active}` : styles.pageLink;
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const location = useLocation();
    const isHome = location.pathname === "/";
    const [open, setOpen] = useState(false);
    useEffect(() => {


        const handleMove = (e) => {
            if (!isHome) return;
            const x = (e.clientX / window.innerWidth - 0.5) * 2;
            const y = (e.clientY / window.innerHeight - 0.5) * 2;
            setPos({ x, y });

        };

        window.addEventListener("mousemove", handleMove);
        return () => window.removeEventListener("mousemove", handleMove);
    }, [isHome]);
    useEffect(() => {
        if (!isHome) return;

        const handleTouch = (e) => {
            const touch = e.touches[0];

            const x = (touch.clientX / window.innerWidth - 0.5) * 2;
            const y = (touch.clientY / window.innerHeight - 0.5) * 2;

            setPos({ x, y });
        };

        window.addEventListener("touchmove", handleTouch);

        return () => {
            window.removeEventListener("touchmove", handleTouch);
        };
    }, [isHome]);
    return (
        <>
            {isHome && (
                <> <div className={styles.bgContainer}
                    style={{
                        "--x": pos.x,
                        "--y": pos.y
                    }}>
                    <div
                        className={styles.bg}

                    />
                    <div
                        className={styles.stars}

                    />

                    <div
                        className={styles.layer1}

                    />
                    <div
                        className={styles.clouds}

                    />
                    <div
                        className={styles.layer2}

                    />
                    <div
                        className={styles.layer3}

                    />
                    <div
                        className={styles.layer4}

                    />
                </div>
                </>
            )}
            <div className={styles.container}>


                <aside className={`${styles.sidebar} ${styles.left}`}>
                    <NavLink to="/" className={getActiveClass}>MAIN</NavLink>

                    <NavLink to="/feed"
                        className={getActiveClass}>GALLERY</NavLink>
                    <NavLink to="/projects"
                        className={getActiveClass}>PROJECTS</NavLink>
                    <NavLink to="/profile"
                        className={getActiveClass}>ABOUT</NavLink>
                    <div className={`${styles.pageLink} ${open ? styles.active : ""}`}
                        onClick={() => setOpen(prev => !prev)}
                    >
                        CONTACT

                    </div>

                    {open && (
                        <div className={styles.contactList}>
                            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=katedavydenko245@gmail.com">
                                Email
                            </a>
                            <a href="https://www.instagram.com/askellyapple">Instagram</a>
                            <a href="www.linkedin.com/in/kate-davydenko">LinkedIn</a>
                        </div>
                    )}
                </aside>
                <main className={styles.mainContent}>

                    <Outlet />
                </main>



            </div>

        </>

    );
};
export default MainLayout;