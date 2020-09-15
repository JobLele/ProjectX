import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import NavBar from './Components/Navbar/Navbar';
import Login from './Components/Login/Login';
import JobList from './Components/Jobs/JobList/Joblist';
import PostJob from './Components/Jobs/PostJob/PostJob';
import Register from './Components/Register/Register';
import Job from './Components/Jobs/Job/Job'

// import Footer from './Components/Footer/Footer';


const App = () => {
  return (<div>
    <Router>
      <NavBar/>
      <Switch>
        <Route path="/" exact component={JobList}></Route>
        <Route path="/jobware" exact component={JobList}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/Register" component={Register}></Route>
        <Route path="/jobware/postjob" component={PostJob}></Route>
        <Route path="/jobware/sainya" component={Job}></Route>
      </Switch>
    </Router>  
    </div>
  );
}

export default App
