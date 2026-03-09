import { useState } from 'react';
import styles from '../../../App.module.css'
import Input from '../../atoms/Input/Input';
import Button from '../../atoms/Button/Button';
const ProfileSettings = () => {
  const [formData, setFormData] = useState({
    name: 'Kate Davydenko',
    email: 'kate@example.com',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated data:', formData);
    alert('Дані збережено!');
  };

  return (
    <div className={styles.container}>

      <form className={styles.box} onSubmit={handleSubmit} >
        
        <Input
          type="text"
          label="Name"
          value={formData.name}
          onChange={handleChange}
        />

        <Input
          type="email"
          label="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <Input
          type="password"
          label="New Password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Введіть новий пароль"
        />

        <Button type="submit">Зберегти зміни</Button>
      </form>
    </div>
  );
};

export default ProfileSettings;