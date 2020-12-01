import React, { Component } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';

class Applicants extends Component {
    constructor(props) {
        super(props);
        this.state = {
            values: {
                applicants: []
            },
            showApplicants: false,
        }

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
    getData = () => {
        this.setState({
            values: {
                applicants: this.props.view_job.applicants
            }
        })
        console.log("applocants", this.props.view_job.applicants);
        this.handleShowApplicants();
    }
    render() {

        if (this.state.values.applicants.length != 0) {
            return (
                <div className="edit-btn">
                    <Button variant="info" onClick={this.getData}>List of Applicants</Button>

                    <Modal show={this.state.showApplicants} onHide={this.handleCloseApplicants} size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered>
                        <Modal.Header closeButton>
                            <Modal.Title>{`Applicants : ${this.props.view_job.title}`}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {this.state.values.applicants.map(applicant => (
                                <div className="app-box-each">
                                    <Link to={`/jobware/profile/${applicant.applicant}`} className="link-to-applicant">applicant name</Link>
                                    <div className="desc-to-applicant">{applicant.explanation}</div>
                                </div>
                                // <div className="app-box-each">
                                //     <a className="link-to-applicant">link to applicant1</a>
                                //     <div className="desc-to-applicant">have experience of 4 years in this job in bikaner at endurance gum worked as personal trainer too.Flexible with timing .Have experience of 4 uears working in cult fit at Bangaluru.</div>
                                // </div>
                            ))}


                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="light" onClick={this.handleCloseApplicants}>
                                Ok
                            </Button>

                        </Modal.Footer>
                    </Modal>
                </div>


            )
        }
        else {
            return (
                <div className="edit-btn">
                    <Button variant="info" onClick={this.getData}>List of Applicants</Button>

                    <Modal show={this.state.showApplicants} onHide={this.handleCloseApplicants} size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered>
                        <Modal.Header closeButton>
                            <Modal.Title>{`Applicants : ${this.props.view_job.title}`}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>No applicants till now.</div>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="light" onClick={this.handleCloseApplicants}>
                                Ok
                            </Button>

                        </Modal.Footer>
                    </Modal>
                </div>
            )
        }
    }
}
export default Applicants