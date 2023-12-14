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
      <header>
        <Top></Top>
      </header>

      {
        usuarios.map((val, key) => {
          return <div key={key}>{val.user}</div>
        })
      }

      <div>
        <p>Nombre: {usuarios.nombre}</p>
        <p>Email: {usuarios.email}</p>
      </div>

      <div className="body">
        <div className="vh-100 row align-items-start position-relative">

          
          <div className="col vh-100" id="columna2">
            <div className="position-absolute top-50 start-50 translate-middle">
              <div className="row">
                <div className="login text-center">
                  <div className="body">
                    <div className="head">
                      <h1>Hola, Bienvenido</h1>
                    </div>

                    <form>
                      <div className="form-group">
                        <input
                          onChange={(event) => {
                            setUser(event.target.value);
                          }}
                          type="text"
                          className="form-control"
                          id="email"
                          placeholder="Ingrese su usuario"
                        />
                      </div>

                      

                      <div className="form-group">
                        <input
                          onChange={(event) => {
                            setContraseña(event.target.value);
                          }}
                          type="password"
                          className="form-control"
                          id="contraseña"
                          placeholder="Ingrese su contraseña"
                        />

                        
                      </div>

                      <p>
                        <a href="#">¿Olvidó su contraseña?</a>
                      </p>

                      <p>
                        <a href="/registroPage">¿No tienes cuenta?</a>
                      </p>
                    </form>

                    <button
                        id="btn-ingresar"
                        type="submit"
                        className="btn btn-primary"
                        onClick={ingresar}
                      >
                        Ingresar
                      </button> 
                    
                  </div>
                </div>
              </div>
            </div>
          </div>

          <form >
            <div className="col vh-100" id="titulo">
            <h2>CodeConnect</h2>
             </div>
             
             <div id="Logotype">
              <img src={Logoprofile}  />
             </div>
         </form>
          

           


        </div>
      </div>
    </div>
  );
}

export default LoginPage;