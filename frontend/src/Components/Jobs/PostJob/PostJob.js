import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import DatePicker from "react-datepicker";
import Cookies from 'universal-cookie';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Select from 'react-select';
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
                state: '',
                region: '',
                by: "",
                dur: "",
                place: null
            },
            options : [
                {value : "1 day", label : "1 day"},
                {value : "2 days", label : "2 days"},
                {value : "3 days", label : "3 days"},
                {value : "4 days", label : "4 days"},
                {value : "5 days", label : "5 days"},
                {value : "6 days", label : "6 days"},
                {value : "1 week", label : "1 week"},
                {value : "2 weeks", label : "2 weeks"},
                {value : "3 weeks", label : "3 weeks"},
                {value : "1 month", label : "1 month"},
                {value : "2 months", label : "2 months"},
                {value : "3 months", label : "3 months"},
                {value : "4 months", label : "4 months"},
                {value : "5 months", label : "5 months"},
                {value : "6 months", label : "6 months"},
                {value : "7 months", label : "7 months"},
                {value : "8 months", label : "8 months"},
                {value : "9 months", label : "9 months"},
                {value : "10 months", label : "10 months"},
                {value : "11 months", label : "11 months"},
                {value : "12 months", label : "12 months"},
            ],
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
        this.durationChange = this.durationChange.bind(this);
        this.submit = this.submit.bind(this);
        
    }

    componentDidMount() {
        const cookies = new Cookies();
        var uid = cookies.get('uid');
        if (!cookies.get('uid')) {
            alert("You can't post, please register to avail this feature");
            window.location.href = "/";
        }
        this.setState({
            values: {
                ...this.state.values,
                by: uid
            }
        });
    }

    handleInputChange = (field, e) => {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({ fields });
        this.setState({
            fields,
            values: {
                ...this.state.values,
                [e.target.name]: e.target.value
            }
        });
    }

    durationChange = (e) => {
        this.setState({
            values: {
                ...this.state.values,
                dur: e
            }
        })
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

    selectState(val) {
        let fields = this.state.fields;
        fields["state"] = val;
        this.setState({ fields });
        this.setState({
            fields,
            values: {
                ...this.state.values,
                state: val,
            }
        });
    }

    selectRegion(val) {
        let fields = this.state.fields;
        fields["region"] = val;
        this.setState({ fields });
        this.setState({
            fields,
            values: {
                ...this.state.values,
                region: val,
            }
        });
    }

    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //Name
        if (!fields["title"]) {
            formIsValid = false;
            errors["title"] = "Cannot be empty";
        } if (!fields["salary"]) {
            formIsValid = false;
            errors["salary"] = "Cannot be empty";
        }
        if (!fields["description"]) {
            formIsValid = false;
            errors["description"] = "Cannot be empty";
        } if (!fields["state"]) {
            formIsValid = false;
            errors["state"] = "Cannot be empty";
        }
        if (!fields["region"]) {
            formIsValid = false;
            errors["region"] = "Cannot be empty";
        }
        // if (!fields["dur"]) {
        //     formIsValid = false;
        //     errors["dur"] = "Cannot be empty";
        // }
        this.setState({ errors: errors });
        console.log(this.state.errors);
        return formIsValid;
    }
    submit(e) {
        // e.preventdefault();
        if (this.handleValidation()) {
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
        } else {
            alert("Form has errors.")
        }
    }
    render() {
        if (this.state.err !== true) {
            return (
                <div>
                    <center>
                        <form>
                            <Card className="text-center post-job-form" style={{height : "100%"}}>
                                <Card.Header>
                                    <h3>Job Post</h3>
                                </Card.Header>
                                <Card.Body>
                                <div className="form-group" >
                                        <label className="font-increase-label">Duration*</label>

                                        <Select id = "dur" name = "dur" className="form-control" placeholder= "Duration" onChange={(val) => this.durationChange(val)} value={this.state.values.dur} options={this.state.options}/>

                                        <br />
                                            <span style={{ color: "red" }}>{this.state.errors["state"]}</span>
                                            <br />
                                    </div>
                                    <div className="form-group">
                                        <label className="font-increase-label">Job Title*</label>
                                        <input type="text" name="title" className="form-control" placeholder="Job Title" onChange={this.handleInputChange.bind(this, "title")} required={true} />
                                        <span style={{ color: "red" }}>{this.state.errors["title"]}</span>
                                        <br />
                                    </div>
                                    <div className="form-group">
                                        <label className="font-increase-label">Salary*</label>
                                        <input type="number" id="salary" name="salary" className="form-control" placeholder="Mention salary as per day" onChange={this.handleInputChange.bind(this, "salary")}></input>
                                        <div style={{ color: "red" }}>{this.state.errors["salary"]}</div>
                                        <div className="desc-feat">Mention salary as per day.</div>
                                        
                                    </div>

                                    {/* <div className="form-group">
                                    <label className="font-increase-label">Location</label>
                                    <br />
                                    <GoogleComponent apiKey={API_KEY} language={'en'} country={'country:in|country:us'} coordinates={true} className="form-control" />
                                </div> */}
                                    <div className="date-box-postjob form-group">
                                        <div className="p-2 col-example text-left">
                                            <label className="font-increase-label">State*</label>
                                            <br />
                                            
                                            <StateDropdown id="state" name="state" className="form-control" value={this.state.values.state} onChange={(val) => this.selectState(val)} />
                                            <br />
                                            <span style={{ color: "red" }}>{this.state.errors["state"]}</span>
                                            <br />
                                        </div>

                                        <div className="p-2 col-example text-left">
                                            <label className="font-increase-label">Region*</label>
                                            <br />

                                            <RegionDropdown id="region" name="region" className="form-control" State={this.state.values.state} value={this.state.values.region} onChange={(val) => this.selectRegion(val)} />

                                            <br />
                                            <span style={{ color: "red" }}>{this.state.errors["region"]}</span>
                                            <br />
                                        </div>
                                    </div>

                                    <div className="date-box-postjob form-group">
                                        <div className="p-2 col-example text-left">
                                            <label>Start Date*</label><br />
                                            <DatePicker
                                                selected={this.state.values.from}
                                                onChange={this.handleInputChangeDateFrom}
                                                name="from"
                                                dateFormat="MM/dd/yyyy"
                                                className="form-control" />

                                        </div>
                                        <div className="p-2 col-example text-left">
                                            <label>End Date*</label><br />
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
                                        <label className="font-increase-label">Description*</label>
                                        <textarea onChange={this.handleInputChange.bind(this, "description")} name="description" className="form-control" rows={5} placeholder="Description" />
                                        <div style={{ color: "red" }}>{this.state.errors["description"]}</div>
                                        
                                        <div className="desc-feat">Include conditions,features and whatever necessary for this job.</div>
                                    </div>
                                    <Button onClick={this.submit} variant="dark" className="btn btn-block">Post Job</Button>
                                </Card.Body>
                            </Card>
                        </form>
                    </center>
                </div>
            )
        } else {
            return (
                <Jumbotron fluid>
                    <Container>
                        <h1><center>{this.state.msg}</center></h1>
                    </Container>
                </Jumbotron>
            )
        }
    }
}

export default PostJob
