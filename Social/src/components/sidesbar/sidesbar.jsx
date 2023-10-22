import React from 'react';
import './sidesbar.css';
import { FaHome, FaBell, FaUser, FaUserFriends } from 'react-icons/fa';

function Sidebar({ menuOpen }) {
  return (
    <div className={`sidebar ${menuOpen ? '' : 'hidden'}`}>
     <a href="/">
        <FaHome /> Inicio
      </a>
      <a href="#">
        <FaBell /> Notificaciones
      </a>
      <a href="#">
        <FaUserFriends /> Siguiendo
      </a>
      <a href="#">
        <FaUser /> Perfil
      </a>
    </div>
  );
}

export default Sidebar;