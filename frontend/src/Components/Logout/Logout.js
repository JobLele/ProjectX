import React, { Component } from 'react'
import Cookies from 'universal-cookie';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './Logout.css'

class Logout extends Component{
    constructor(props){
        super(props)
        this.state={
            err: null,
            msg: "",
            loggedout: null
        }
        this.getData=this.getData.bind(this);
    }

    getData=(data)=>{
        console.log(data);
        if(this.state.err===null){
            alert("yeet");
            const cookies = new Cookies();
<<<<<<< HEAD
            cookies.remove('uid',{ path: '/', secure: "false", strict: "none" });
            console.log("after removing cookies",cookies.get('uid'));
            alert("wait maadi");
=======
            cookies.remove('uid');
>>>>>>> 5abcc31219bc3106825bc2e7a63b497092482f73
        }
        else{
            alert(this.state.err);
        }
        
        window.location.href="/"
    }

    componentDidMount(){
        fetch(`http://localhost:2000/logout`)
            .then(res => res.json())
            .then(data => { this.getData(data)})
    }
    
    
    render(){
        return(
            <Jumbotron fluid>
                <Container>
                <h1><center>{this.state.msg}</center></h1>
                </Container>
            </Jumbotron>
        )
    }
}
export default Logout