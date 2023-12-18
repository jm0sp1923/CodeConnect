import React, { useState, useEffect } from "react";
import axio from "axios";
import "./profiles.css";
import Top from "../../components/top/top";

function ProfilePage() {

  const [userInfo, setUserInfo] = useState({
    user: 'JohnDoe',
    nombre: '',
    edad: 0,
    email: 'johndoe@example.com',
    contraseña: 'John Doe',
    avatar: 'https://ui-avatars.com/api/?name=jp'
  });

  const editar = () => {
    axio.put('http://localhost:5500/changeUserInfo', userInfo)
      .then(response => {
        alert("Datos actualizados");
        console.log("Datos actualizados:", response.data);
      })
      .catch(error => {
        alert("Ha ocurrido un error: " + error.message);
        console.error('Error al actualizar los datos del usuario:', error);
        if (error.response) {
          console.log("Respuesta del servidor:", error.response.data);
        }
      });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value
    });
  };

  return (
    <>
      <header>
        <Top></Top>
      </header>
      <div className="container mt-4">
        <div className="row vh-100 align-items-center">
          <div className="col-8">
            <div className="text-center" id="data">
              <div className="infoData">
                <p><strong>INFORMACION DE USUARIO:</strong>
                  <input type="text" name="user" placeholder="Nombre de usuario" value={userInfo.user} onChange={handleChange} />
                </p>
                <p><strong>Nombre:</strong>
                  <input type="text" name="nombre" placeholder="Nombre completo" value={userInfo.nombre} onChange={handleChange} />
                </p>
                <p><strong>Edad:</strong>
                  <input type="number" name="edad" placeholder="Edad" value={userInfo.edad} onChange={handleChange} />
                </p>
                <p><strong>Contraseña:</strong>
                  <input type="password" name="contraseña" placeholder="Contraseña" value={userInfo.contraseña} onChange={handleChange} />
                </p>
                <p><strong>Email:</strong>
                  <input type="email" name="email" placeholder="Email" value={userInfo.email} onChange={handleChange} />
                </p>
              </div>
              <div className="EditarData">
                <button onClick={editar}>
                  Editar
                </button>
              </div>
            </div>
          </div>
          <div className="col-4 d-flex justify-content-left" id="avatary">
            <img className="img-fluid rounded-circle" id='avatar' src={userInfo.avatar} alt="User Avatar" />
          </div>
          <div className="contenedor">
            <div className="cuadrado"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
  