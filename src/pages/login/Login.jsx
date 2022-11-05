import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {Alert} from "../../components/alert"

export function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { login, loginWithGoogle, resetPassword } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(user.email, user.password);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleChange = ({ target: { value, name } }) =>
    setUser({ ...user, [name]: value });

  const handleGoogleSignin = async () => {
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!user.email) return setError("Write an email to reset password");
    try {
      await resetPassword(user.email);
      setError('CRIS te ha enviado un mensaje, por favor revise su correo seleccionado ')
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    
    <div className="w-full max-w-md m-auto">
      
      <div className="w-full max-w-3xl m-auto">
      <h1 className="text-center font-bold my-4 text-md flex justify-between px-3">Bienvenido a CRIS (Créditos Interactivos Sistematizados)</h1>
      </div>

    </div>
  );
}
export default Login;