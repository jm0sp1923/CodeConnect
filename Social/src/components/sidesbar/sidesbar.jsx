import React from 'react';
import './sidesbar.css';
import { FaHome, FaBell, FaUser, FaUserFriends } from 'react-icons/fa';

function Sidebar({ menuOpen }) {
  return (
    <div className={`sidebar ${menuOpen ? '' : 'hidden'}`}>
     <a href="home">
        <FaHome /> Inicio
      </a>
     
      <a href="profile">
        <FaUser /> Perfil
      </a>
    </div>
  );
}

export default Sidebar;