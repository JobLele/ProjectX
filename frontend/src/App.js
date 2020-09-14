import React from 'react';
<<<<<<< HEAD
import logo from './logo.svg';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
// import Nav from './Components/Navbar/Navbar';
// import Footer from './Components/Footer/Footer';

const App=()=> {
  return (
  
    
      <div className="App">
       
        <h1>Just to chk whether running or not.Here homepage will come later.</h1>
       
      </div>
   
    
=======
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import NavBar from './Components/Navbar/Navbar';
import Login from './Components/Login/Login';
import JobList from './Components/Jobs/JobList/Joblist';
import PostJob from './Components/Jobs/PostJob/PostJob';
import Register from './Components/Register/Register';


// import Footer from './Components/Footer/Footer';


const App = () => {
  return (<div>
    <Router>
      <NavBar/>
      <Switch>
      <Route path="/" exact component={JobList}></Route>
        <Route path="/jobware" component={JobList}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/Register" component={Register}></Route>
        <Route path="/postjob" component={PostJob}></Route>
      </Switch>
    </Router>  
    </div>
>>>>>>> bc8ed00d2dcf9ba1393d17bac538bd6b673bcabb
  );
}

export default App
