// Top.js
import React, { useState } from "react";
import Sidebar from "../sidesbar/sidesbar";
import "./top.css";
import { AiOutlineMenu } from "react-icons/ai";
import { BiLogIn } from "react-icons/bi";
import { GoSearch } from "react-icons/go";
import { useNavigate } from "react-router-dom";

const Top = ({ actions }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const cerrarSesion = () =>{
    localStorage.removeItem('userData');
    navigate("/login")
  }

  const pHSearch = "Buscar";

  const handleSearch = () => {
    // Llamar a la función de búsqueda pasando el término de búsqueda
    actions.onSearch(searchTerm);
  };

  return (
    <div className="Top">
      <div id="row">
        <button id="sbutton" onClick={toggleMenu}>
          <AiOutlineMenu />
        </button>
        <div id="search">
          <div>
            <input
              id="sinputs"
              placeholder={pHSearch}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button id="sbuttons" onClick={handleSearch}>
              <GoSearch />
            </button>
          </div>
        </div>
        <div>
          {/* Otros elementos del Top */}
        </div>
        <div>
          <a href="login">
            <button id="loginButton" onClick={cerrarSesion}>
              <BiLogIn />
            </button>
          </a>
        </div>
      </div>
      <Sidebar menuOpen={menuOpen}></Sidebar>
    </div>
  );
};

export default Top;
