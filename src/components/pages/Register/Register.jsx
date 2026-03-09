import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import Button from '../../atoms/Button/Button'; 
import Input from '../../atoms/Input/Input'; 
import styles from '../../../App.module.css';
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Імітація перевірки даних (у Лаб №6 тут буде запит до API)
    if (email && password) {
      register({ email, password});
      navigate("/profile", { replace: true });
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`${styles.box} ${styles.login}`}>
      <h2>REGISTRATION</h2>
      <Input
        label="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="enter email"
      /><Input
        label="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="enter password"
      />
      <Button type="submit" variant="primary">REGISTER</Button>
    </form>
  );
};

export default Register;