import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import DatePicker from "react-datepicker";
import Cookies from 'universal-cookie';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import "react-datepicker/dist/react-datepicker.css";
import { StateDropdown, RegionDropdown } from 'react-india-state-region-selector';
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
                state : '',
                region : '',
                by : "",
                place:null
            },
            err: null,
            msg: null,
            obj: null,
            fields: {},
            errors: {}
        };
        this.handleValidation = this.handleValidation.bind(this);
        //this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInputChangeDateFrom = this.handleInputChangeDateFrom.bind(this);
        this.handleInputChangeDateTo = this.handleInputChangeDateTo.bind(this);
        this.submit = this.submit.bind(this);
    }

    componentDidMount () {
        const cookies = new Cookies();
        console.log(cookies.get('uid'));
        if (!cookies.get('uid')) {
            alert("You are not allowd to post a job. Register with us to avail this feature.");
            window.location.href = "/";
        }
        this.setState({
            values: {
                ...this.state.values,
                by : cookies.get('uid')
            }
        });
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

    selectState (val) {
        this.setState({
            values : {
                ...this.state.values,
                state : val,
            }
        });
    }
    
    selectRegion (val) {
        this.setState({
            values : {
                ...this.state.values,
                region : val,
            }
        });
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
    submit(e) {
        // e.preventdefault();
        if(this.handleValidation()){
            alert("Form submitted");
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
        }else{
            alert("Form has errors.")
         }
    }

    render() {if(this.state.err !== true){
        return(
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
                                    <input type="text" name="title" className="form-control" placeholder="Job Title" onChange={this.handleInputChange.bind(this,"title")} required={true} />
                                    <span style={{color: "red"}}>{this.state.errors["title"]}</span>
                                    <br/>                          
                                </div>
                                <div className="form-group">
                                    <label className="font-increase-label">Salary</label>
                                    <input type="number" id="salary" name="salary" className="form-control" onChange={this.handleInputChange.bind(this,"salary")}></input>
                                    <span style={{color: "red"}}>{this.state.errors["salary"]}</span>
                                    <br/>          
                                </div>

                                {/* <div className="form-group">
                                    <label className="font-increase-label">Location</label>
                                    <br />
                                    <GoogleComponent apiKey={API_KEY} language={'en'} country={'country:in|country:us'} coordinates={true} className="form-control" />
                                </div> */}

                                <div className="form-group">
                                    <label className="font-increase-label">State</label>
                                    <br />
                                    <StateDropdown id="state" name="state" className="form-control"  value={this.state.values.state} onChange={(val) => this.selectState(val)} />
                                    <span style={{color: "red"}}>{this.state.errors["state"]}</span>
                                    <br/>        
                                </div>

                                <div className="form-group">
                                    <label className="font-increase-label">Region</label>
                                    <br />
                                    <RegionDropdown id="region" name="region" className="form-control"  State={this.state.values.state} value={this.state.values.region} onChange={(val) => this.selectRegion(val)} />
                                    <span style={{color: "red"}}>{this.state.errors["region"]}</span>
                                    <br/>        
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
                                    <textarea onChange={this.handleInputChange.bind(this,"description")} name="description" className="form-control" rows={5} placeholder="Description" />
                                    <span style={{color: "red"}}>{this.state.errors["description"]}</span>
                                    <br/>
                                </div>
                                <Button onClick={this.submit} variant="dark" className="btn btn-block">Post Job</Button>
                            </Card.Body>
                        </Card>
                    </form>
                </center>
            </div>
        )}else{
            return(
            <Jumbotron fluid>
            <Container>
            <h1><center>{this.state.msg}</center></h1>
            </Container>
        </Jumbotron> 
            )}
    }
}

export default PostJob
