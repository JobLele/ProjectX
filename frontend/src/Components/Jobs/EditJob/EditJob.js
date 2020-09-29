import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import DatePicker from "react-datepicker";
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import "react-datepicker/dist/react-datepicker.css";
import { GoogleComponent } from 'react-google-location'
const API_KEY = "AIzaSyBG0T-DKPFzsOMPmPVa0zzOZ1bYof9858A";

class EditJob extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            values: {
                salary: 0,
                title: "",
                description: "",
                from:new Date(),
                to:new Date(),
                x:0,
                y:0
            },
            err: null,
            msg: null,
            fields: {},
            errors: {}
        }
        this.getData = this.getData.bind(this);
        //this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInputChangeDateFrom = this.handleInputChangeDateFrom.bind(this);
        this.handleInputChangeDateTo = this.handleInputChangeDateTo.bind(this);
        this.submit = this.submit.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
    }

    componentDidMount(){
        const array = window.location.pathname.split('/');
        const id = array[2];
        console.log(id);
        fetch(`http://localhost:2000/job/${id}`)
            .then(res => res.json())
            .then(data => { this.getData(data)})
    }

    getData = (data) => {
        this.setState({
            values:{
                salary: data.obj.salary,
                title: data.obj.title,
                description: data.obj.description,
                from:new Date(data.obj.duration[0]),
                to:new Date (data.obj.duration[1]),
                x:data.obj.location[0],
                y:data.obj.location[1]
            },
            err: data.err,
            msg: data.msg
        })
        console.log(this.state.values);
    }
    handleInputChange = (field, e) => {
        let fields = this.state.fields;
            fields[field] = e.target.value;        
            this.setState({fields});
        this.setState({
            values: {
                ...this.state.values,
                [e.target.name]: e.target.value
            }
        });
    }
    handleInputChangeDateFrom = (e) => {
        this.setState({
            values: {
                ...this.state.values,
                from: e
            }
        })
    }
    handleValidation(){
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //Name
        if(!fields["title"]){
           formIsValid = false;
           errors["title"] = "Cannot be empty";
        }if(!fields["salary"]){
            formIsValid = false;
            errors["salary"] = "Cannot be empty";
         }
         if(!fields["description"]){
            formIsValid = false;
            errors["description"] = "Cannot be empty";
         }
         this.setState({errors: errors});
         console.log(this.state.errors);
           return formIsValid;
        }
    handleInputChangeDateTo = (e) => {
        if (this.state.values.from > e) {
            console.log("end date cant be lesser than start date");
        }
        else {
            this.setState({
                values: {
                    ...this.state.values,
                    to: e
                }
            })
        }

    }

    submit=()=>{
        if(this.handleValidation()){
            alert("Form submitted");
        var updated_job={
            title:this.state.values.title,
            salary:this.state.values.salary,
            description:this.state.values.description,
            location:[this.state.values.x,this.state.values.y],
            duration:[this.state.values.from,this.state.values.to]
        }

        console.log("updated_job",updated_job);
        const array = window.location.pathname.split('/');
        const id = array[2];
        fetch(`http://localhost:2000/job/${id}`, {
            method: 'PUT',
            body: JSON.stringify(updated_job),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => {
            this.setState({ err: false, msg: res.msg });
            return res.json();
        })
        .then(data => {
            if (data.err) {
                this.setState({err: true, msg: data.err});
                console.log(this.msg);
            }
            else{
                window.location.href="/"
            }
            this.setState({obj : data.obj});
            console.log(this.state.obj);
        })
    }else{
        alert("Form has errors.")
     }
    }
    render() {
        if (this.state.msg === "ID Job Procured" && this.state.err === null) {
            var edit_job=this.state.values; 
            console.log("sainya2",edit_job)
        return (
            <div>
                <center>
                    <form>
                        <Card className="text-center post-job-form" >
                            <Card.Header>
                                <h3>Edit Job</h3>
                            </Card.Header>
                            <Card.Body>

                                <div className="form-group">
                                    <label className="font-increase-label">Job Title</label>
                                    <input type="text" name="title" className="form-control" value={edit_job.title} onChange={this.handleInputChange.bind(this,"title")}  placeholder="Job Title"  />
                                    <span style={{color: "red"}}>{this.state.errors["title"]}</span>
                                    <br/>
                                </div>
                                <div className="form-group">
                                    <label className="font-increase-label">Salary</label>
                                    <input type="number" id="salary" name="salary"value={edit_job.salary} onChange={this.handleInputChange.bind(this,"salary")}  className="form-control"></input>
                                    <span style={{color: "red"}}>{this.state.errors["salary"]}</span>
                                    <br/>
                                </div>

                                <div className="form-group">
                                    <label className="font-increase-label">Location</label>
                                    <br />
                                    <GoogleComponent apiKey={API_KEY} language={'en'} country={'country:in|country:us'} coordinates={true} className="form-control" />
                                </div>
                                <div className="date-box-postjob form-group">
                                    <div className="p-2 col-example text-left">
                                        <label>Start Date</label><br />
                                        <DatePicker
                                            
                                            selected={this.state.values.from}
                                            value={new Date(edit_job.from)}
                                            onChange={this.handleInputChangeDateFrom}
                                            name="from"
                                            dateFormat="MM/dd/yyyy"
                                            className="form-control"
                                             />

                                    </div>
                                    <div className="p-2 col-example text-left">
                                        <label>End Date</label><br />
                                        <DatePicker
                                            value={new Date(edit_job.to)}
                                            selected={this.state.values.to}
                                            onChange={this.handleInputChangeDateTo}
                                            name="to"
                                            dateFormat="MM/dd/yyyy"
                                            className="form-control"
                                            
                                        />
                                    </div>
                                </div>
                                <div className="form-group" >
                                    <label className="font-increase-label">Description</label>
                                    <textarea  name="description" value={edit_job.description} onChange={this.handleInputChange.bind(this,"description")} className="form-control" rows={5} placeholder="Description" />
                                    <span style={{color: "red"}}>{this.state.errors["description"]}</span>
                                    <br/>
                                </div>
                                <Button  variant="dark"onClick={this.submit} className="btn btn-block">Edit Job</Button>
                            </Card.Body>
                        </Card>
                    </form>
                </center>
            </div>
           

        );
        }
        else{
            return( <Jumbotron fluid>
                <Container>
                <h1><center>{this.state.msg}</center></h1>
                </Container>
            </Jumbotron>)
        }
        
    }

}
export default EditJob