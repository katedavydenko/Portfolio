import styles from '../../../App.module.css'

import React, { useState, useEffect } from "react";
import { AuthContext } from '../../../context/AuthContext';
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserInfo from "../../../components/UserInfo";
import ActivityList from "../../../components/ActivityList";
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
    
  const [userData, setUserData] = useState(null);
  const [activities, setActivities] = useState([]);
  useEffect(() => {
    // В реальному житті тут був би fetch() або axios
    setUserData({
      name: "kate davydenko",
      email: "coolafuser69@mail.com",
      role: "soup eater",
    });

    setActivities([
      { id: 1, action: "logged into the system", date: "today, 10:00 am" },
      { id: 2, action: "updated profile info", date: "yesterday, 3:30 pm" },
      { id: 3, action: "loaded a report", date: "may 12" },
    ]);
  }, []);

  // Поки дані "завантажуються"
  if (!userData) {
    return <div>lOADING pROFILE</div>;
  }
    return (
        <div>
            <div className={`${styles.box} ${styles.login}`}>
            
            <UserInfo
            name={userData.name}
            email={userData.email}
            role={userData.role}
            />
            <ActivityList activities={activities} />
        </div>
        <div style={{ margin: "20px 0px" }}>
            <button onClick={handleLogout} className= {styles.link}>
            LOGOUT
            </button>
        </div>
        </div>
    );
};

export default ProfileOverview;