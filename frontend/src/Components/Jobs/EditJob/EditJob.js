import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { GoogleComponent } from 'react-google-location'
import { useParams } from 'react-router-dom';
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
            msg: null
        }
        this.getData = this.getData.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInputChangeDateFrom = this.handleInputChangeDateFrom.bind(this);
        this.handleInputChangeDateTo = this.handleInputChangeDateTo.bind(this);
        this.submit = this.submit.bind(this);

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
    handleInputChange = (e) => {
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
    }
    render() {
        if (this.state.msg == "ID Job Procured" && this.state.err == null) {
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
                                    <input type="text" name="title" className="form-control" value={edit_job.title} onChange={this.handleInputChange}  placeholder="Job Title"  />
                                </div>
                                <div className="form-group">
                                    <label className="font-increase-label">Salary</label>
                                    <input type="number" id="salary" name="salary"value={edit_job.salary} onChange={this.handleInputChange}  className="form-control"></input>
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
                                    <textarea  name="description" value={edit_job.description} onChange={this.handleInputChange} className="form-control" rows={5} placeholder="Description" />

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
            return(<div>{this.state.err}</div>)
        }
        
    }

}
export default EditJob