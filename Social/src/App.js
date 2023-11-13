import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home/home';
import LoginPage from './pages/loginPage/login';
import ProfilePage from './pages/profile/profiles';
import React from 'react';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home"/>} />
        <Route path="/home" element={<Home/>} />
        <Route path='/loginPage' element= {<LoginPage/>}/>
        <Route path="/profile" element= {<ProfilePage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
