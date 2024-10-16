import React from "react";
import "./login.css";
import Top from "../../components/top/top";
import Axio from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logoprofile from '../../assets/img/Logoprofile.png';


function LoginPage() {

  const [user, setUser] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [usuarios, setUsuarios] = useState([]);

  const navigate = useNavigate(); 

  const ingresar = () => {
    Axio.post("http://localhost:5500/login", { user, contraseña })
      .then((response) => {
        setUsuarios(response.data);
        if (response.data.length > 0) {
          localStorage.setItem('userData', JSON.stringify(response.data));
          navigate("/home");
          alert("Sesión iniciada correctamente");
        } else {
          alert("Credenciales inválidas. Intente de nuevo.");
        }
      })
      .catch((error) => {
        console.error("Error al iniciar sesión: ", error);
        alert("Ocurrió un error al iniciar sesión");
      });
  };

  return (
    <div className="LoginPage">
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet" />
      <div className="container">
        <div className="glass">
          {/* Logo */}
          <div id="Logotype">
            <img src={Logoprofile} alt="Logo" />
          </div>
  
          {/* Title */}
          <h1>Iniciar Sesión</h1>
  
          {/* Form */}
          <form>
            <div className="form-group">
              <input
                onChange={(event) => setUser(event.target.value)}
                type="text"
                className="form-control"
                id="email"
                placeholder="Usuario"
              />
            </div>
  
            <div className="form-group">
              <input
                onChange={(event) => setContraseña(event.target.value)}
                type="password"
                className="form-control"
                id="contraseña"
                placeholder="Contraseña"
              />
            </div>
  
            <p><a href="#">¿Olvidaste tu contraseña?</a></p>
            <p><a href="/registroPage">¿No tienes cuenta? Regístrate</a></p>
  
            {/* Submit Button */}
            <button
              id="btn-ingresar"
              type="submit"
              className="btn btn-primary"
              onClick={ingresar}
            >
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  );
  
  
}

export default LoginPage;
