import React from 'react';
import logo from './logo.svg';
import './App.css';
import Content from "./components/Content";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Patients from "./components/patients/Patients";

function App() {
  return (
    <div className="App">
      <div className="main-wrapper">
        <Header />
        <div className="sidebar" id="sidebar">
          <div className="sidebar-inner slimscroll">
            <NavBar />
          </div>
        </div>
        <div className="page-wrapper">
          <div className="content">
            <Patients />
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
