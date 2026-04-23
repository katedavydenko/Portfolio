import { NavLink, Outlet } from 'react-router-dom';
import styles from '../../../App.module.css';
const MainLayout = () => {
    const getActiveClass = ({ isActive }) =>
        isActive? `${styles.pageLink} ${styles.active}` : styles.pageLink;
    
    return (
        <div className={styles.container}>
             
        
        <aside  className={`${styles.sidebar} ${styles.left}`}>
            <NavLink to="/" className={getActiveClass}>MAIN</NavLink>
            
            <NavLink to="/feed"
            className={getActiveClass}>GALLERY</NavLink>
            <NavLink to="/projects"
            className={getActiveClass}>PROJECTS</NavLink>
            <NavLink to="/profile"
            className={getActiveClass}>ABOUT</NavLink>
        </aside>
        <main className={styles.mainContent}>
            
            <Outlet />
        </main>
        
        </div>       
           
        
    );
};
export default MainLayout;