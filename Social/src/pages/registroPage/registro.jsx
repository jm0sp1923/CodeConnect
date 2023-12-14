import React from "react";
import { useState } from "react";
 import Axios from "axios";
import "./registro.css";
import Top from "../../components/top/top";
import Logo from '../../assets/img/Logo.png';


 

function RegistroPage() {


const [user,setUser] = useState();
const [email,setEmail] = useState();
const [contraseña,setContraseña] = useState();

const registrar = ()=>{
  Axios.post("http://localhost:5500/registrar", {
  user: user,
  nombre: " ",
  edad: 0,
  email: email,
  contraseña: contraseña,
}).then((response) => {
  alert("Usuario creado");
}).catch((error) => {
  if (error.response.status === 409) {
    alert("El usuario ya existe");
  } else {
    alert("Error al crear usuario:", error);
  }
});

}

  return (
    <div>
      <header>
        <Top>   
        </Top>
      </header>
      <div className="body">
      <div className="registro text-center d-flex align-items-center justify-content-center">
        <div className="col vh-100 d-flex flex-column align-items-center">
          <div className="registro text-center">
            

            
            <div id="head">
              <h1>Bienvenido</h1>
            
            </div>

            <form>
              <div className="form-group">
                <label htmlFor="user" className="text-left">
                  User
                </label>
                <input
                onChange={(event)=>{
                  setUser(event.target.value);
                }}
                  type="text" 
                  className="form-control"
                  id="user"
                  placeholder="Ingrese su user"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="text-left">
                  Email
                </label>
                <input
                  onChange={(event)=>{
                    setEmail(event.target.value);
                  }}
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Ingrese su email"
                />
              </div>

              <div className="form-group">
                <label htmlFor="contraseña" className="text-left">
                  Contraseña
                </label>
                <input
                onChange={(event)=>{
                  setContraseña(event.target.value);
                }}
                  type="password"
                  className="form-control"
                  id="contraseña"
                  placeholder="Ingrese su contraseña"
                />

              </div>

              <button
                onClick={registrar}
                id="btn-ingresar"
                type="submit"
                className="btn btn-primary"
              >
                Crear Usuario
              </button>
            </form>

            <div className="footer mt-3">
              <div className="icons">
                {/*iconos de redes sociales*/}
              </div>
             
            </div>
            <form >
             <div id="Logotyp">
              <img src={Logo}  />
             </div>
         </form>
          </div>
          <div>
          <p>
                <a href="/login" className="text-black">
                  ¿Ya Tienes Cuenta?
                </a>
              </p>

          </div>
        </div>
      </div>
      </div>
    </div>
    
  );
}

export default RegistroPage;
