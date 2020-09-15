import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Postjob.css";
import { GoogleComponent } from 'react-google-location'
const API_KEY = "AIzaSyAVjo-bKTuYIr6i5qtybWmaaWOBM3UWgJQ";

class PostJob extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            values: {
                salary: 0,
                title: "",
                description: "",
                from: new Date(),
                to: new Date(),
                x: 0,
                y: 0
            },
            err: null,
            msg: null,
            obj: null
        };
        this.submit = this.submit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
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
        if (e < this.state.values.from) {
            console.log("end date can;t be lesser than start date");
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

    submit=(e)=>{
        e.preventdefault();

        console.log(this.state.values);
        fetch("http://localhost:2000/newjob", {
            method: 'POST',
            body: JSON.stringify(this.state.values),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => {
            this.setState({ err: false, msg: res.msg });
            return res.json();
        })
        .then(data => {
            this.setState({obj : data.obj});
            console.log(this.state.obj);
        })
    }

    render() {
        return (
            <div>
                <center>
                    <form>
                        <Card className="text-center post-job-form" >
                            <Card.Header>
                                <h3>Job Post</h3>
                            </Card.Header>
                            <Card.Body>

                                <div className="form-group">
                                    <label className="font-increase-label">Job Title</label>
                                    <input type="text" name="title" className="form-control" placeholder="Job Title" onChange={this.handleInputChange} />
                                </div>
                                <div className="form-group">
                                    <label className="font-increase-label">Salary</label>
                                    <input type="number" id="salary" name="salary" className="form-control" onChange={this.handleInputChange}></input>
                                </div>
                               
                                <div className="form-group">
                                    <label className="font-increase-label">Location</label>
                                    <br />
                                    <GoogleComponent apiKey={API_KEY} language={'en'} country={'country:in|country:us'} coordinates={true} locationBoxStyle={'custom-style'}
                                        locationListStyle={'custom-style-list'} className="form-control" />
                                </div>
                                <div className="date-box-postjob form-group">
                                    <div className="p-2 col-example text-left">
                                        <label>Start Date</label><br />
                                        <DatePicker
                                            selected={this.state.values.from}
                                            onChange={this.handleInputChangeDateFrom}
                                            name="from"
                                            dateFormat="dd/MM/yyyy" />
                                    </div>
                                    <div className="p-2 col-example text-left">
                                        <label>End Date</label><br />
                                        <DatePicker
                                            selected={this.state.values.to}
                                            onChange={this.handleInputChangeDateTo}
                                            name="to"
                                            dateFormat="dd/MM/yyyy"

                                        />
                                    </div>
                                </div>
                                <div className="form-group" >
                                    <label className="font-increase-label">Description</label>
                                    <textarea onChange={this.handleInputChange} name="description" className="form-control" rows={5} placeholder="Description" />
                                </div>
                                <Button onClick={(e)=>this.submit(e)} variant="dark" className="btn btn-block">Post Job</Button>
                            </Card.Body>
                        </Card>
                    </form>
                </center>
            </div>
        );
    }
}

export default PostJob
