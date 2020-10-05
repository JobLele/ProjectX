import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import NavBar from './Components/Navbar/Navbar';
import Login from './Components/Login/Login';
import Logout from './Components/Logout/Logout';
import JobList from './Components/Jobs/JobList/Joblist';
import PostJob from './Components/Jobs/PostJob/PostJob';
import Register from './Components/Register/Register';
import Job from './Components/Jobs/Job/Job';
import EditJob from './Components/Jobs/EditJob/EditJob';
import PP from './Components/Profile/PP/PP';
import Prof from './Components/Profile/PP/Prof';
import EditProfile from './Components/Profile/EditProfile/EditProfile';
import Footer from './Components/Footer/Footer';



const App = () => {
  return (<div className = 'page-container'>
    <div className="content-wrap">
    <Router>
      <NavBar/>
      <Switch>
        <Route path="/" exact component={JobList}></Route>
        <Route path="/jobware" exact component={JobList}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/logout" component={Logout}></Route>
        <Route path="/register" component={Register}></Route>
        <Route path="/jobware/profile"exact  component={Prof}></Route>
        <Route path="/jobware/prof"exact  component={Prof}></Route>
        <Route path="/jobware/postjob"exact component={PostJob}></Route>
        <Route path="/jobware/:id" exact component={Job}></Route>
        <Route path="/jobware/:id/edit" component={EditJob}></Route>
        <Route path="/jobware/profile/:id/edit" component={EditProfile}></Route>
      </Switch>
    </Router> 
    </div>
    <Footer />
    </div>
  );
}

export default App
