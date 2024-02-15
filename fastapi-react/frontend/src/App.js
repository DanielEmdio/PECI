import './App.css';
// import React, {useState} from 'react';
import LoginForm from './Components/LoginForm/LoginForm';
import RegisterForm from './Components/RegisterForm/RegisterForm';
//import api from './api';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return(
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm/>} />  
          <Route path="/register" element={<RegisterForm/>} />
        </Routes>
      </Router>
    </> 
  );
}

export default App;
