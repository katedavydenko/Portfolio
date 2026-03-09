import styles from '../../../App.module.css'
import { AuthContext } from '../../../context/AuthContext';
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
const ProfileOverview = () => {
    const user = {
    name: 'Kate Davydenko',
    email: 'kate@example.com',
    };
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div>
        <div className={styles.box}>
            <div>
                <strong>Ім’я:</strong>
                <span>{user.name}</span>
            </div>

            <div >
                <strong>Email:</strong>
                <span>{user.email}</span>
            </div>
        </div>
        <button onClick={handleLogout} className= {styles.link}>
        LOGOUT
        </button>
        </div>
    );
};

export default ProfileOverview;