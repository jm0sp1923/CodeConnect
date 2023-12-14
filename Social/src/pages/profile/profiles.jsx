import React, { useState, useEffect } from "react";
import axio from "axios";
import "./profiles.css";
import Top from "../../components/top/top";
import { useNavigate } from "react-router-dom";

function ProfilePage() {

  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem('userData'));
  const [userInfo, setUserInfo] = useState(storedUser ? storedUser[0] : null);

  const errorInicioSesion = () => {
    navigate("/login");
  }

  useEffect(() => {
    if (userInfo === null) {
      alert("Inicie sesión primero");
      errorInicioSesion();
    }
  }, [userInfo]);

  if (userInfo === null) {
    return null; 
  }

  const editar = () => {
    axio.put('http://localhost:5500/changeUserInfo',userInfo)
    .then(response => {
      alert("Datos actualizados");
      console.log("Datos actualizados:", response.data);
      localStorage.setItem('userData', JSON.stringify(response.data));
    })
    .catch(error => {
      alert("Ha ocurrido un error: " + error.message); // Muestra el mensaje de error específico
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
        <div className="row vh-100 align-items-center ">
          <div className="col-md-8">
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
              <div className="EditarData" >
                <button onClick={editar}>
                  Editar
                  
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-4 d-flex justify-content-left">
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
