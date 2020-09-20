import React, { Component } from 'react'
import Job from '../Job/Job'
import './DeleteJob.css'

class DeleteJob extends Component{
    constructor(props){
        super(props)
        this.state={
            err: null,
            msg: "",
            delete_job: {}
        }
        this.getData=this.getData.bind(this);
    }

    componentDidMount(){
        const array = window.location.pathname.split('/');
        const id = array[2];
        console.log(id);
        fetch(`http://localhost:2000/job/${id}`,{
            method:'DELETE'
        })
            .then(res => res.json())
            .then(data => { this.getData(data)})
    }
    
    getData=(data)=>{
        const array = window.location.pathname.split('/');
        const id = array[2];
        this.setState({
            delete_job:data.obj,
            err:data.err,
            msg:data.msg
        })
        console.log(this.state.delete_job);
        if(this.state.err===null && this.state.msg==="Deleted Successfully"){
            alert(this.state.msg);
            window.location.href="/"
        }
        else{
            alert(this.state.msg);
            window.location.href=`/jobware/${id}`
        }
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