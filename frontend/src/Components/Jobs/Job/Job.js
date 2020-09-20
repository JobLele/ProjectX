import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal'
import './Job.css';

class Job extends Component {
    constructor(props) {
        super(props);
        this.state = {
            values: {
                view_job: null
            },
            err: null,
            msg: null,
            show: false
        }
        this.getData = this.getData.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
    }

    componentDidMount() {
        const array = window.location.pathname.split('/');
        const id = array[2];
        fetch(`http://localhost:2000/job/${id}`)
            .then(res => res.json())
            .then(data => { this.getData(data) })


        console.log(this.state.values.view_job);

    }
    getData = (data) => {
        this.setState({
            values: {
                job: data.obj
            },
            err: data.err,
            msg: data.msg
        })
        console.log(this.state.values.job);
    }
    handleClose = () => {
        this.setState({
            show: false
        })
    }
    handleShow = () => {
        this.setState({
            show: true
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
                                                <Link to={`/jobware/${view_job._id}/edit`}><Button variant="info" >EDIT</Button></Link>
                                            </div>
                                            <div>
                                                <Button variant="danger" onClick={this.handleShow}>DELETE</Button>

                                                <Modal show={this.state.show} onHide={this.handleClose} size="lg"
                                                    aria-labelledby="contained-modal-title-vcenter"
                                                    centered>
                                                    <Modal.Header closeButton>
                                                        <Modal.Title>{`Delete job : ${view_job.title}`}</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>Are you sure you want to delete this job?</Modal.Body>
                                                    <Modal.Footer>
                                                        <Button variant="light" onClick={this.handleClose}>
                                                            No
                                                        </Button>
                                                        <Link to={`/jobware/${view_job._id}/delete`}>
                                                            <Button variant="danger" onClick={this.handleClose}>
                                                                Yes
                                                        </Button>
                                                        </Link>
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