import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Cookies from 'universal-cookie';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';

class ApplyJob extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            values: {
                explanation: "",
                applicantID: 0
            },
            applied:false,
            err:null,
            msg:null,
            obj:{},
            fields: {},
            errors: {},
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
    handleInputChange = (field,e) => {
        let fields = this.state.fields;
            fields[field] = e.target.value;        
            this.setState({fields});
            this.setState({
                values: {
                    ...this.state.values,
                    [field] : e.target.value
                }
            })
        }
    componentDidMount() {
        const cookies = new Cookies();
        var uid = "000000000000000000000000";
        if (cookies.get('uid')) {
            uid = cookies.get('uid');
        }
        console.log(this.props.view_job);
        this.setState({
            values : {
                ...this.state.values,
                applicantID : uid
            }
        })
        this.props.view_job.applicants.forEach(element => {
            if(element.applicant == cookies.get('uid') && element.applicant != "0"){
                
                console.log(element);
                console.log(this.state.values);
                console.log("work");
                this.setState({
                    applied : true,
                    values : element
                }, () => {
                    console.log(this.state.values);
                })
                
            }
            
        });
        if (cookies.get('uid')) {
            uid = cookies.get('uid');
        }
    }

    handleValidation(){
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //Name
        if(!fields["explanation"]){
           formIsValid = false;
           errors["explanation"] = "Cannot be empty";
        }
         this.setState({errors: errors});
         //console.log(this.state.errors);
           return formIsValid;
        }

    submit = (e) => {
        e.preventDefault();
        if(this.handleValidation()){
            alert("Form submitted");
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
            this.setState({
                applied:true, 
                obj: data.obj });
            console.log("applied successfully",this.state.obj);
        })
    }else{
        alert("Form has errors.")
     }
    }
        
        
    
    render() {if(this.state.err !== true){
        return(
            <div className="edit-btn">
               {this.state.applied && <Button variant="info" onClick={this.handleShowApply}>Applied</Button>}
                {!this.state.applied && <Button variant="info" onClick={this.handleShowApply}>Apply</Button>}
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
                                <textarea name="explanation" className="form-control" onChange={this.handleInputChange.bind(this,"explanation")} rows={5} placeholder="Explain why are you worthy for this job , you can mention your working experinece." value={this.state.values.explanation} />
                                <span style={{color: "red"}}>{this.state.errors["explanation"]}</span>
                                
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
export default ApplyJob;