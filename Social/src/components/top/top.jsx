import React, { useState } from "react";
import Sidebar from "../sidesbar/sidesbar";
import "./top.css";
import { AiOutlineMenu } from "react-icons/ai";
import { BiLogIn } from "react-icons/bi";
import { GoSearch } from "react-icons/go";

const Top = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const pHSearch = "Buscar";
  return (
    <div className="Top">
      <div id="row">
        <button id="sbutton" onClick={toggleMenu}>
          <AiOutlineMenu />
        </button>
        <div id="search">
          <div>
            <input id="sinputs" placeholder={pHSearch}></input>
            <button id="sbuttons">
              <GoSearch />
            </button>
          </div>
        </div>
        <div>
          <a href="loginPage">
            <button id="loginButton">
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
