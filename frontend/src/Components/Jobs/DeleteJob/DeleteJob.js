import React, { Component } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './DeleteJob.css'

class DeleteJob extends Component {
    constructor(props) {
        super(props)
        this.state = {
            err: null,
            msg: "",
            delete_job: {},
            showDelete:false
        }
        this.getData = this.getData.bind(this);
    }

    handleCloseDelete = () => {
        this.setState({
            showDelete: false
        })
    }
    handleShowDelete = () => {
        this.setState({
            showDelete: true
        })
    }
    getData = (data) => {
        this.setState({
            delete_job: data.obj,
            err: data.err,
            msg: data.msg
        })
        console.log("deleted",this.state.delete_job);
        if (this.state.err === null && this.state.msg === "Deleted Successfully") {
            alert(this.state.msg);
            window.location.href = "/"
        }
        else {
            alert(this.state.msg);
            // window.location.href = `/jobware/${this.props.view_job._id}`
        }
    }
    submit=()=>{
        fetch(`http://localhost:2000/job/${this.props.view_job._id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => { this.getData(data) })
    }

   
    render() {
        return (
            <div className="edit-btn">
                 <Button variant="danger" onClick={this.handleShowDelete}>DELETE</Button>

                <Modal show={this.state.showDelete} onHide={this.handleCloseDelete} size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered>
                    <Modal.Header closeButton>
                        <Modal.Title>{`Delete job : ${this.props.view_job.title}`}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to delete this job?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="light" onClick={this.handleCloseDelete}>
                            No
                        </Button>
                        <Button variant="danger" onClick={this.submit}>
                            Yes
                        </Button>
                    </Modal.Footer>
                </Modal>

            </div>
        )
    }
}
export default DeleteJob;