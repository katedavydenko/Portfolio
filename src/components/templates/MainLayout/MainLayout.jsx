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

    return (
        <>
            {isHome && (
                <> <div className={styles.bgContainer}>
                    <div
                        className={styles.bg}
                        style={{
                            transform: `translate(${pos.x * 45}px, ${pos.y * 45}px)`
                        }}
                    />
                    <div
                        className={styles.stars}
                        style={{
                            transform: `translate(${pos.x * 30}px, ${pos.y * 30}px)`
                        }}
                    />

                    <div
                        className={styles.layer1}
                        style={{
                            transform: `translate(${pos.x * 20}px, ${pos.y * 20}px)`
                        }}
                    />
                    <div
                        className={styles.clouds}
                        style={{
                            transform: `translate(${pos.x * 15}px, ${pos.y * 15}px)`
                        }}
                    />
                    <div
                        className={styles.layer2}
                        style={{
                            transform: `translate(${pos.x * 10}px, ${pos.y * 10}px)`
                        }}
                    />
                    <div
                        className={styles.layer3}
                        style={{
                            transform: `translate(${pos.x * 5}px, ${pos.y * 5}px)`
                        }}
                    />
                    <div
                        className={styles.layer4}
                        style={{
                            transform: `translate(${pos.x * 50}px, ${pos.y * 50}px)
                            skewX(${pos.x * -10}deg)`
                        }}
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
                            <a href = "https://www.instagram.com/askellyapple">Instagram</a>
                            <a href = "www.linkedin.com/in/kate-davydenko">LinkedIn</a>
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