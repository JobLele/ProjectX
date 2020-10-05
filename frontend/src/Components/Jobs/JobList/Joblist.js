import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Cookies from 'universal-cookie';
import Jumbotron from 'react-bootstrap/Jumbotron'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { StateDropdown, RegionDropdown } from 'react-india-state-region-selector';
import './Joblist.css';

class JobList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            values: {
                jobs: []
            },
            err: null,
            msg: null,
            host : "http://localhost:2000/jobs/",
            filter : null,
            value : null,
            offset : 0,
            state : "",
            region : "",
            from : "",
            to : ""
        }
        this.count = 0;
        this.getData = this.getData.bind(this);
        this.previousGetData = this.previousGetData.bind(this);
        this.nextGetData = this.nextGetData.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.submitData = this.submitData.bind(this);
        this.getData = this.getData.bind(this);
    }

    
    handleInputChange = (e) => {
        this.setState({
            filter : e.target.name,
            value : e.target.value
        })
    }

    selectState(val) {
        this.setState({
            filter : "state",
            value : val,
            state : val
        });
    }

    selectRegion(val) {
        this.setState({
            filter : "region",
            value : val,
            region : val
        });
    }

    handleInputChangeDateFrom = (e) => {
        this.setState({
            filter : "from",
            value : e.toString(),
            from : e
        })
    }

    handleInputChangeDateTo = (e) => {
        this.setState({
            filter : "to",
            value : e.toString(),
            to : e
        })
    }

    submitData = () => {
        console.log(this.state);
        let url = this.state.host;
        if (this.state.filter != null && this.state.value != null) {
            url += `${this.state.filter}/${this.state.value}/`;
        }
        url += this.count;
        fetch(url)
        .then(res => res.json())
        .then(data => this.getData(data))
        .catch(err => console.error(err));
    }

    getData = (data) => {
        this.setState({
            values: {
                jobs: data.obj
            },
            err: data.err,
            msg: data.msg
        })
        console.log(this.state.values);
        const cookies = new Cookies();

        setTimeout(function() {
            console.log(cookies.get('uid'));
        }, 50);
    }

    componentDidMount() {
        fetch(`http://localhost:2000/jobs/${this.count}`)
            .then(res => res.json())
            .then(data => { this.getData(data) })

    }
    previousGetData(event) {
        event.preventDefault();
        this.count = this.count - 1;
        if(this.count>=0){
            this.submitData()
        }
        else{
            this.count=this.count+1;
        }
    }
    nextGetData(e) {
        e.preventDefault();
        this.count = this.count + 1;
        this.submitData()
    }

    render() {
        const MAX_LENGTH = 250
        if (this.state.err === null) {
            return (
                <div>
                    <Container>
                        {/* this shit starts */}
                        
            <div class="row">
                <div class="col">
                    <div class="row">
                        <h1>Only 1 filter works at a time</h1>
                        <br />
                    </div>
                    <div className="form-group">
                                        <label className="font-increase-label">Job Title*</label>
                                        <input type="text" name="title" className="form-control" placeholder="Job Title" onChange={this.handleInputChange}/>
                                        <br />
                                    </div>
                                    <div className="form-group">
                                        <label className="font-increase-label">Salary*</label>
                                        <input type="number" id="salary" name="salary" className="form-control"  onChange={this.handleInputChange}></input>
                                        <div className="desc-feat">Mention salary as per day.</div>
                                    </div>
                                    <div className="date-box-postjob form-group">
                                        <div className="p-2 col-example text-left">
                                            <label className="font-increase-label">State*</label>
                                            <br />
                                            <StateDropdown id="state" name="state" className="form-control" value={this.state.state} onChange={(val) => this.selectState(val)} />
                                            <br />
                                        </div>

                                        <div className="p-2 col-example text-left">
                                            <label className="font-increase-label">Region*</label>
                                            <br />
                                            <RegionDropdown id="region" name="region" className="form-control" State={this.state.state} value={this.state.region} onChange={(val) => this.selectRegion(val)} />
                                            <br />
                                        </div>
                                    </div>

                                    <div className="date-box-postjob form-group">
                                        <div className="p-2 col-example text-left">
                                            <label>Start Date*</label><br />
                                            <DatePicker
                                                selected={this.state.from}
                                                onChange={this.handleInputChangeDateFrom}
                                                name="from"
                                                dateFormat="MM/dd/yyyy"
                                                className="form-control" />

                                        </div>
                                        <div className="p-2 col-example text-left">
                                            <label>End Date*</label><br />
                                            <DatePicker
                                                selected={this.state.to}
                                                onChange={this.handleInputChangeDateTo}
                                                name="to"
                                                dateFormat="MM/dd/yyyy"
                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                    <div class="row">
                        <button onClick={this.submitData}>Dabao Mujhe</button>
                    </div>
                </div>
            </div>
            {/* Shit ends */}
                        <div className="card-main-box text-center">
                            {this.state.values.jobs.map(job => (
                                <div key={job.id} className="individual-card">
                                    <Card style={{ width: '20rem' }}>
                                        <div className="date-box">{new Date(job.postedOn).toLocaleDateString()}</div>
                                        <Card.Img variant="top" className="img-box" src="https://png.pngtree.com/png-clipart/20190515/original/pngtree-chef-cooking-fried-chicken-and-delicious-sign-png-image_3635466.jpg" />
                                        <Card.Body>
                                            <Card.Title>{job.title}</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">{new Date(job.duration[0]).toLocaleDateString()} - {new Date(job.duration[1]).toLocaleDateString()}</Card.Subtitle>
                                            <Card.Subtitle className="lg-2 salary">₹{job.salary}/day</Card.Subtitle>
                                            {job.description > MAX_LENGTH ?
                                                (
                                                    <Card.Text>
                                                        { job.description.substring(0, MAX_LENGTH)}
                                                    </Card.Text>
                                                ) : (
                                                    <Card.Text>
                                                        {job.description}
                                                    </Card.Text>
                                                )
                                            }

                                            <Card.Text>
                                                <div className="bottom-box">
                                                    <div>{job.region}, {job.state}</div>
                                                    <div>
                                                        <Link to={`/jobware/${job._id}`}>
                                                            <Button variant="dark" >view</Button>
                                                        </Link>
                                                    </div>

                                                </div>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </div>

                            ))}

                        </div>
                        <div className="next-previous-box">
                            <Button onClick={this.previousGetData} variant="outline-dark" >{`<`}</Button>
                            <Button onClick={this.nextGetData} variant="outline-dark">{`>`}</Button>
                        </div>

                    </Container>

                </div>

            )
        }
        else  {
            return (
                <Container>
                     <Jumbotron fluid>
                <Container>
                <h1><center>{this.state.err}</center></h1>
                </Container>
            </Jumbotron>
                    <div className="next-previous-box">
                        <Button onClick={this.previousGetData} variant="outline-dark" >{`<`}</Button>
                        <Button onClick={this.nextGetData} variant="outline-dark">{`>`}</Button>
                    </div>
                </Container>
            )
        }
        
    }
}
//abc
export default JobList