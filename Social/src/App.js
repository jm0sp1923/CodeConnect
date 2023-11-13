import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home/home';
import LoginPage from './pages/loginPage/login';
import RegistroPage from './pages/registroPage/registro';
import React from 'react';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/loginPage"/>} />
        <Route path="/home" element={<Home/>} />
        <Route path='/loginPage' element= {<LoginPage/>}/>
        <Route path='/registroPage' element ={<RegistroPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;