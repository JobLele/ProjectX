import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Avv from './Components/Navbar/Navbar';
import Login from './Components/Login/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Footer from './Components/Footer/Footer';


const App = () => {
  return (<div>
    <Router>
      <Avv />
      <Switch>
        <Route path="/login" component={Login}></Route>
      </Switch>
    </Router>
     
      
      
         

          <h1>Just to chk whether running or not.Here homepage will come later.</h1>

       
    
    </div>
  );
}

export default App
