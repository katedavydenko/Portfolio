import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import Button from '../../atoms/Button/Button'; 
import Input from '../../atoms/Input/Input'; 
import styles from '../../../App.module.css';
const Login = () => {
  const [email, setEmail] = useState("");
  const { login } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await login(email);
    setIsLoading(false);
    if (email) {
      
      login({ email });
      
      navigate("/profile", { replace: true });
    }
  };

  return (
    <div>
    <form onSubmit={handleSubmit} className={`${styles.box} ${styles.login}`}>
      <h2>LOGIN INTO THE SYSTEM</h2>
      <Input
        label="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="enter email"
      />
      <Button type="submit" variant="primary" disabled={isLoading}>{isLoading ? " PLZ WAIT..." : "LOGIN"}</Button>
      
    </form>
    <div style={{ margin: "20px 0px" }}>
      <Link to="/register" className= {styles.link}>CREATE ACCOUNT</Link>
    </div>
    </div>
  );
};


export default Login;