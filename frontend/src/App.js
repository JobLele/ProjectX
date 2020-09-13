import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import NavBar from './Components/Navbar/Navbar';
import Login from './Components/Login/Login';
import JobList from './Components/Jobs/JobList/Joblist';
import PostJob from './Components/Jobs/PostJob/PostJob';


// import Footer from './Components/Footer/Footer';


const App = () => {
  return (<div>
    <Router>
      <NavBar/>
      <Switch>
      <Route path="/" exact component={JobList}></Route>
        <Route path="/jobware" component={JobList}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/postjob" component={PostJob}></Route>
      </Switch>
    </Router>  
    </div>
  );
}

export default App
