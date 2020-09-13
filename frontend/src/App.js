import React from 'react';
import logo from './logo.svg';
import { BrowseRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Nav from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <h1>Just to chk whether running or not.Here homepage will come later.</h1>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
