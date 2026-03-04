import { Routes, Route, NavLink, Outlet } from 'react-router-dom'; 


import styles from '../../../App.module.css';
const Profile = () => {
    const getActiveClass = ({ isActive }) =>
            isActive? `${styles.link} ${styles.active}` : styles.link;
    return (
        <div className={styles.profileLayout}>
            <h3>Мій акаунт</h3>
            <div className={styles.filters}>
                <NavLink to="." end className={getActiveClass}>Інформація</NavLink>
                <NavLink to="settings" className={getActiveClass}>Налаштування</NavLink>
            </div>

            
            <div>
                <Outlet/>
            </div>

        </div>
        
    );
};
export default Profile;