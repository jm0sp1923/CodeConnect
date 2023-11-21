import React, { useState, useEffect } from "react";
import axios from "axios";
import "./profiles.css";
import Top from "../../components/top/top";

function ProfilePage() {

  const [user,setUser] = useState("");
  const [nombre,setNombre] = useState("");
  const [edad,setEdad] = useState("");
  const [email,setEmail] = useState("");
  const [contraseña,setContraseña] = useState("");
  const [avatar,setAvatar] = useState(``);


  const editar = () => {
    axios.put('http://localhost:5500/changeUserInfo',{user,nombre,edad,email,contraseña,avatar})
      .then(response => {
        alert("datos actulizados")
        console.log("Datos actualizados:", response.data);
        alert(response.data)
      })
      .catch(error => {
        alert("Ha ocurrido un error" + error)
        console.error('Error al actualizar los datos del usuario:', error);
      });
  }


  

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'user':
        setUser(value);
        break;
      case 'nombre':
        setNombre(value);
        break;
      case 'edad':
        setEdad(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'contraseña':
        setContraseña(value);
        break;
      default:
        break;
    }
  };


  return (
    <>
      <header>
        <Top></Top>
      </header>
      <div className="container mt-4">
        <div className="row vh-100 align-items-center ">
          <div className="col-md-8">
            <div className="text-center" id="data">
              <div className="infoData">
                <p><strong>INFORMACION DE USUARIO:</strong>
                  <input type="text" name="user" placeholder="Nombre de usuario" value={user} onChange={handleChange} />
                </p>
                <p><strong>Nombre:</strong>
                  <input type="text" name="nombre" placeholder="Nombre completo" value={nombre} onChange={handleChange} />
                </p>
                <p><strong>Edad:</strong>
                  <input type="number" name="edad" placeholder="Edad" value={edad} onChange={handleChange} />
                </p>
                <p><strong>Contraseña:</strong>
                  <input type="password" name="contraseña" placeholder="Contraseña" value={contraseña} onChange={handleChange} />
                </p>
                <p><strong>Email:</strong>
                  <input type="email" name="email" placeholder="Email" value={email} onChange={handleChange} />
                </p>
              </div>
              <div className="editar">
                <button onClick={editar}>
                  Editar
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-4 d-flex justify-content-left">
            <img className="img-fluid rounded-circle" id='avatar' src={avatar} alt="User Avatar" />
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
