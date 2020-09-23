import React, { Component } from 'react'
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

    componentDidMount(){
        fetch(`http://localhost:2000/logout`)
            .then(res => res.json())
            .then(data => { this.getData(data)})
    }
    
    getData=(data)=>{
        if(this.state.err===null && this.state.msg==="Logged out successfully"){
            alert(this.state.msg);
            localStorage.removeItem("logged");
            localStorage.removeItem("id");
        }
        else{
            alert(this.state.err);
        }
        
        window.location.href="/"
    }
    render(){
        return(
            <h1>
            {this.state.msg}
            </h1>
        )
    }
}
export default DeleteJob