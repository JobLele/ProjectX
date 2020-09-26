import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Cookies from 'universal-cookie';
import ApplyJob  from '../ApplyJob/ApplyJob'
import DeleteJob from '../DeleteJob/DeleteJob'
import './Job.css';

class Job extends Component {
    constructor(props) {
        super(props);
        this.state = {
            values: {
                job: null
            },
            err: null,
            msg: null,
            showApplicants: false,
            userLogged: false,
        }
        this.getData = this.getData.bind(this);
        this.handleShowApplicants = this.handleShowApplicants.bind(this);
        this.handleCloseApplicants = this.handleCloseApplicants.bind(this);
      
    }

    componentDidMount() {
        const array = window.location.pathname.split('/');
        const id = array[2];
        fetch(`http://localhost:2000/job/${id}`)
            .then(res => res.json())
            .then(data => { this.getData(data) })


        console.log(this.state.values.job);

    }
    getData = (data) => {
        const cookies = new Cookies();
        console.log(cookies.get('uid'));
        if (cookies.get('uid') == data.obj.postedBy) {
            this.setState({
                userLogged: true
            })
        }
        this.setState({
            values: {
                job: data.obj
            },
            err: data.err,
            msg: data.msg
        })
        console.log(this.state.values.job);

    }
   
    handleCloseApplicants = () => {
        this.setState({
            showApplicants: false
        })
    }

    handleShowApplicants = () => {
        this.setState({
            showApplicants: true
        })
    }

    render() {
        if (this.state.msg === "ID Job Procured" && this.state.err === null) {
            var view_job = this.state.values.job;
            return (
                <Container>
                    <div className="vertical-center">
                        <Card >
                            <div className="date-box">{new Date(view_job.postedOn).toLocaleDateString()}</div>
                            <Card.Img variant="top" className="img-box" src="https://png.pngtree.com/png-clipart/20190515/original/pngtree-chef-cooking-fried-chicken-and-delicious-sign-png-image_3635466.jpg" />
                            <Card.Body>
                                <Card.Title>{view_job.title}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{new Date(view_job.duration[0]).toLocaleDateString()} - {new Date(view_job.duration[1]).toLocaleDateString()}</Card.Subtitle>
                                <Card.Subtitle className="lg-2 salary">₹{view_job.salary}/day</Card.Subtitle>
                                <Card.Text>
                                    {view_job.description}
                                </Card.Text>
                                <Card.Text>
                                    <div className="bottom-box">
                                        <div>7A 1gokuldam society ,mumbai</div>
                                        <div className="edit-delte-box">
                                            <div className="edit-btn">
                                                {(this.state.userLogged) && (<Link to={`/jobware/${view_job._id}/edit`}><Button variant="info" >EDIT</Button></Link>)}
                                            </div>

                                            {(this.state.userLogged) && (<DeleteJob view_job={view_job}/>)}

                                            {(!this.state.userLogged)&& <ApplyJob view_job={view_job}/>}

                                            <div className="edit-btn">
                                                {(this.state.userLogged) && (<Link ><Button variant="info" onClick={this.handleShowApplicants}>List of Applicants</Button></Link>)}

                                                <Modal show={this.state.showApplicants} onHide={this.handleCloseApplicants} size="lg"
                                                    aria-labelledby="contained-modal-title-vcenter"
                                                    centered>
                                                    <Modal.Header closeButton>
                                                        <Modal.Title>{`Applicants`}</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        <div className="app-box-each">
                                                            <a className="link-to-applicant">link to applicant1</a>
                                                            <div className="desc-to-applicant">have experience of 4 years in this job in bikaner at endurance gum worked as personal trainer too.Flexible with timing .Have experience of 4 uears working in cult fit at Bangaluru.</div>
                                                        </div>
                                                        <div className="app-box-each">
                                                            <a className="link-to-applicant">link to applicant1</a>
                                                            <div className="desc-to-applicant">have experience of 4 years in this job in bikaner at endurance gum worked as personal trainer too.Flexible with timing .Have experience of 4 uears working in cult fit at Bangaluru.</div>
                                                        </div>

                                                    </Modal.Body>
                                                    <Modal.Footer>
                                                        <Button variant="light" onClick={this.handleCloseApplicants}>
                                                            Ok
                                                        </Button>
                                                        {/* <Link to={`/jobware/${view_job._id}/delete`}>
                                                            <Button variant="danger" onClick={this.handleCloseApplicants}>
                                                                Yes
                                                        </Button>
                                                        </Link> */}
                                                    </Modal.Footer>
                                                </Modal>
                                            </div>
                                        </div>
                                    </div>

                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                </Container>
            )
        }
        else {
            return (<Container>
                {this.state.err}
            </Container>)
        }
    }
}
export default Job;