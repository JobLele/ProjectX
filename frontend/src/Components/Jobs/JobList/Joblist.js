import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import { Button, Form, FormGroup, Label, Input, FormText, Col, Row } from 'react-bootstrap';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroupmaterial from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Card from 'react-bootstrap/Card';
import Cookies from 'universal-cookie';
import Jumbotron from 'react-bootstrap/Jumbotron'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { StateDropdown, RegionDropdown } from 'react-india-state-region-selector';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader } from 'react-pro-sidebar';
import RangeSlider from 'react-bootstrap-range-slider';
import 'react-pro-sidebar/dist/css/styles.css';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
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
            host: "http://localhost:2000/jobs/filter/",
            filter: null,
            typeOfJob: {
                temporary: false,
                permanent: false,
                parttime: false,
                fulltime: false,
                alljobs: true
            },
            value: null,
            offset: 0,
            state: "",
            region: "",
            from: "",
            to: "",
            salary: 500

        }
        this.count = 0;
        this.getData = this.getData.bind(this);
        this.handleChangetypeOfJob = this.handleChangetypeOfJob.bind(this);
        this.previousGetData = this.previousGetData.bind(this);
        this.nextGetData = this.nextGetData.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.submitData = this.submitData.bind(this);
        this.getData = this.getData.bind(this);
        // const [ salfilt, setSalfilt ] = useState(0); 
    }


    handleInputChange = (e) => {
        this.setState({
            filter: e.target.name,
            value: e.target.value
        })
    }

    selectState(val) {
        this.setState({
            filter: "state",
            value: val,
            state: val
        });
    }

    selectRegion(val) {
        this.setState({
            filter: "region",
            value: val,
            region: val
        });
    }

    handleInputChangeDateFrom = (e) => {
        this.setState({
            filter: "from",
            value: e.toString(),
            from: e
        })
    }

    handleInputChangeDateTo = (e) => {
        this.setState({
            filter: "to",
            value: e.toString(),
            to: e
        })
    }

    submitData = () => {
        console.log(this.state);
        let url = this.state.host;
        url += this.count;
        fetch(url, {
            method : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({
                title : "",
                salary : this.state.salary,
                state : this.state.state,
                region : this.state.region,
                from : this.state.from,
                to : this.state.to
            })
        })
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

        setTimeout(function () {
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
        if (this.count >= 0) {
            this.submitData()
        }
        else {
            this.count = this.count + 1;
        }
    }
    nextGetData(e) {
        e.preventDefault();
        this.count = this.count + 1;
        this.submitData()
    }
    handleChangetypeOfJob = (event) => {
        this.setState({
            typeOfJob: {
                ...this.state.typeOfJob,
                [event.target.name]: event.target.checked
            }


        })
        
    }


    render() {
        const MAX_LENGTH = 250
        if (this.state.err === null) {
            return (
                <div>
                    {/* <Container> */}
                    <div className="filterandjobsbox">

                        <div className="filterbox">

                            <ProSidebar>

                                <Menu iconShape="square">
                                    <MenuItem >All Filters</MenuItem>
                                    <SubMenu title="Salary" >
                                        <Form>
                                            <Form.Group as={Row}>
                                                <Form.Label>
                                                    Salary per day
                                                    {/* <Col xs='4'> */}
                                                    <Form.Control value={this.state.salary} size='sm' />
                                                    {/* </Col> */}
                                                 or more
                                                 </Form.Label>


                                                <Col xs="8">
                                                    <RangeSlider
                                                        value={this.state.salary}
                                                        onChange={(e) => this.setState({ salary: e.target.value })}


                                                        size='sm'
                                                        variant='light'
                                                        tooltipPlacement='down'
                                                        tooltipLabel={currentValue => `₹${currentValue}/day`}
                                                        min={100}
                                                        max={1000}
                                                        tooltip="on"
                                                    />
                                                </Col>
                                            </Form.Group>
                                        </Form>

                                    </SubMenu>
                                    <SubMenu title="Location" >
                                        <MenuItem>State</MenuItem>
                                        <StateDropdown id="state" name="state" className="form-control" value={this.state.state} onChange={(val) => this.selectState(val)} />
                                        <MenuItem>Region</MenuItem>
                                        <RegionDropdown id="region" name="region" className="form-control" State={this.state.state} value={this.state.region} onChange={(val) => this.selectRegion(val)} />
                                    </SubMenu>
                                    <SubMenu title="Date" >
                                        <div className="graycolor">
                                            <label>Start Date</label><br />
                                            <DatePicker
                                                selected={this.state.from}
                                                onChange={this.handleInputChangeDateFrom}
                                                name="from"
                                                dateFormat="MM/dd/yyyy"
                                                className="form-control" />
                                            <label>End Date</label><br />
                                            <DatePicker
                                                selected={this.state.to}
                                                onChange={this.handleInputChangeDateTo}
                                                name="to"
                                                dateFormat="MM/dd/yyyy"
                                                className="form-control"
                                            />
                                        </div>


                                    </SubMenu>
                                    <SubMenu title="Job Type" >
                                        {/* <div className="graycolor"> */}
                                        <FormGroupmaterial row>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={this.state.typeOfJob.permanent}
                                                        onChange={this.handleChangetypeOfJob}
                                                        name="permanent"
                                                        color="primary"
                                                    />
                                                }
                                                label="Permanent"
                                            /><br></br>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={this.state.typeOfJob.temporary}
                                                        onChange={this.handleChangetypeOfJob}
                                                        name="temporary"
                                                        color="primary"
                                                    />
                                                }
                                                label="Temporary"
                                            /><br></br>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={this.state.typeOfJob.parttime}
                                                        onChange={this.handleChangetypeOfJob}
                                                        name="parttime"
                                                        color="primary"
                                                    />
                                                }
                                                label="Part Time"
                                            /><br></br>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={this.state.typeOfJob.fulltime}
                                                        onChange={this.handleChangetypeOfJob}
                                                        name="fulltime"
                                                        color="primary"
                                                    />
                                                }
                                                label="Full Time"
                                            /><br></br>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={this.state.typeOfJob.alljobs}
                                                        onChange={this.handleChangetypeOfJob}
                                                        name="alljobs"
                                                        color="primary"
                                                    />
                                                }
                                                label="All Jobs"
                                            />
                                            
                                        </FormGroupmaterial>
                                        {/* </div> */}
                                        <MenuItem>Temporary(less than 3 months)</MenuItem>
                                        <MenuItem>Permanent(more than 3 months)</MenuItem>
                                        <MenuItem>Part Time</MenuItem>
                                        <MenuItem>Full Time</MenuItem>
                                        <MenuItem>All Jobs</MenuItem>
                                    </SubMenu>
                                    <SubMenu title="Duration" >
                                        <MenuItem>2 Days</MenuItem>
                                        <MenuItem>1 Week</MenuItem>
                                        <MenuItem>1 Month</MenuItem>
                                        <MenuItem>3 Months</MenuItem>
                                        <MenuItem>More than 3 Months</MenuItem>
                                    </SubMenu>
                                        {/* <Button click={this.submitData()}>Submit</Button> */}
                                        <button onClick={this.submitData}>Submit</button>
                                </Menu>
                            </ProSidebar>
                        </div>

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

                    </div>

                    {/* </Container> */}

                </div>

            )
        }
        else {
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