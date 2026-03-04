import { NavLink, Outlet } from 'react-router-dom';
import styles from '../../../App.module.css';
const MainLayout = () => {
    const getActiveClass = ({ isActive }) =>
        isActive? `${styles.link} ${styles.active}` : styles.link;
    return (
        <div>
        <header>
            <div className= {styles.filters}>
                <NavLink to="/" className={getActiveClass}>Головна</NavLink>
                <NavLink to="/feed"
                className={getActiveClass}>Стрічка</NavLink>
                <NavLink to="/profile"
                className={getActiveClass}>Профіль</NavLink>
            </div>
        </header>
        <main className={styles.mainContent}>
            <Outlet />
        </main>
        </div>       
           
        
    );
};
export default MainLayout;