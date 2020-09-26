import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Cookies from 'universal-cookie';


class ApplyJob extends Component {
    constructor(props) {
        super(props);
        this.state = {
            values: {
                explanation: "",
                applicantID: ""
            },
            err:null,
            msg:null,
            obj:{},
            showApply: false,
        }
    }
    handleShowApply = () => {
        this.setState({
            showApply: true
        })
    }
    handleCloseApply = () => {
        this.setState({
            showApply: false
        })
    }
    handleInputChange = (e) => {
        console.log(this.state.values);
        const cookies = new Cookies();
        if (cookies.get('uid')) {
            this.setState({
                values: {
                    ...this.state.values,
                    [e.target.name]: e.target.value,
                    applicantID: cookies.get('uid')
                }
            })
        }

    }
    submit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:2000/job/${this.props.view_job._id}`, {
            method: 'PATCH',
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
                alert(this.state.msg);
                console.log(this.state.msg);
            }
            else {
                this.handleCloseApply();
            }
            this.setState({ obj: data.obj });
            console.log("applied successfully",this.state.obj);
        })
    }
        
        
    
    render() {
        return (
            <div className="edit-btn">
                <Button variant="info" onClick={this.handleShowApply}>Apply</Button>
                <form>
                    <Modal show={this.state.showApply} onHide={this.handleCloseApply} size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered>
                        <Modal.Header closeButton>
                            <Modal.Title>{`Applying for job : ${this.props.view_job.title}`}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="form-group" >
                                <label className="font-increase-label"></label>
                                <textarea name="explanation" className="form-control" onChange={this.handleInputChange} rows={5} placeholder="Explain why are you worthy for this job , you can mention your working experinece." />
                                {/* <span style={{ color: "red" }}>{this.state.errors["description"]}</span> */}
                                <br />
                            </div>
                            {/* <div className="form-group">
                                                            <label>Contact Number</label>
                                                            <input type="number" name="number" className="form-control" placeholder="Enter Phone number so that job poster can conatact you." />
                                                            <span style={{ color: "red" }}>{this.state.errors["number"]}</span>
                                                            <br />
                                                        </div> */}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="danger" onClick={this.handleCloseApply}>
                                Cancel
                            </Button>
                            <Button variant="info"onClick={this.submit} >
                                Apply
                            </Button>

                        </Modal.Footer>
                    </Modal>
                </form>
            </div>
        )
    }
}
export default ApplyJob;