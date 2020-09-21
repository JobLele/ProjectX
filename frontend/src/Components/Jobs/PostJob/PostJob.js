import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./postjob.css";
import { GoogleComponent } from 'react-google-location'
const API_KEY = "AIzaSyBG0T-DKPFzsOMPmPVa0zzOZ1bYof9858A";


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
                y: 0,
                by : "",
                place:null
            },
            err: null,
            msg: null,
            obj: null
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInputChangeDateFrom = this.handleInputChangeDateFrom.bind(this);
        this.handleInputChangeDateTo = this.handleInputChangeDateTo.bind(this);
        this.submit = this.submit.bind(this);
    }

    componentDidMount () {
        this.setState({
            values: {
                ...this.state.values,
                by : localStorage.getItem('id')
            }
        });
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

    submit(e) {
        // e.preventdefault();
        console.log(this.state.values);
        fetch("http://localhost:2000/job", {
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
                if (data.err) {
                    this.setState({ err: true, msg: data.err });
                    console.log(this.msg);
                }
                else {
                    window.location.href = "/"
                }
                this.setState({ obj: data.obj });
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
                                    <input type="text" name="title" className="form-control" placeholder="Job Title" onChange={this.handleInputChange} required={true} />
                                </div>
                                <div className="form-group">
                                    <label className="font-increase-label">Salary</label>
                                    <input type="number" id="salary" name="salary" className="form-control" onChange={this.handleInputChange}></input>
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
                                            onChange={this.handleInputChangeDateFrom}
                                            name="from"
                                            dateFormat="MM/dd/yyyy"
                                            className="form-control" />

                                    </div>
                                    <div className="p-2 col-example text-left">
                                        <label>End Date</label><br />
                                        <DatePicker
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
                                    <textarea onChange={this.handleInputChange} name="description" className="form-control" rows={5} placeholder="Description" />

                                </div>
                                <Button onClick={this.submit} variant="dark" className="btn btn-block">Post Job</Button>
                            </Card.Body>
                        </Card>
                    </form>
                </center>
            </div>
        );
    }
}

export default PostJob
