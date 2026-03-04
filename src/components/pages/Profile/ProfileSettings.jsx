import { useState } from 'react';

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
    <div>
      <h2>Налаштування профілю</h2>

      <form onSubmit={handleSubmit} >
        <label>
          Ім’я
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>

        <label>
          Email
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>

        <label>
          Новий пароль
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Введіть новий пароль"
          />
        </label>

        <button type="submit">Зберегти зміни</button>
      </form>
    </div>
  );
};

export default ProfileSettings;