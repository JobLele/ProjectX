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
            cookies.remove('uid');
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