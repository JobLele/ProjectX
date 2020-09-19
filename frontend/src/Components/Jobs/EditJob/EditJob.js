import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { GoogleComponent } from 'react-google-location'
const API_KEY = "AIzaSyBG0T-DKPFzsOMPmPVa0zzOZ1bYof9858A";

class EditJob extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            values: {
                salary: 0,
                title: "",
                description: "",
                duration:[new Date(),new Date()],
                location:[0,0],
                from:new Date
            },
            err: null,
            msg: null
        }
        this.getData = this.getData.bind(this);
        // this.handleInputChange = this.handleInputChange.bind(this);
        // this.handleInputChangeDateFrom = this.handleInputChangeDateFrom.bind(this);
        // this.handleInputChangeDateTo = this.handleInputChangeDateTo.bind(this);
        // this.submit = this.submit.bind(this);

    }

    componentDidMount(){
        const array = window.location.pathname.split('/');
        const id = array[2];
        console.log(id);
        fetch(`http://localhost:2000/job/${id}`)
            .then(res => res.json())
            .then(data => { this.getData(data) })
    }

    getData = (data) => {
        this.setState({
            values:data.obj,
            err: data.err,
            msg: data.msg
        })
        console.log("sainya",this.state.values);
    }
    // handleInputChange = (e) => {
    //     this.setState({
    //         values: {
    //             ...this.state.values,
    //             [e.target.name]: e.target.value
    //         }
    //     });
    // }
    handleInputChangeDateFrom = (e) => {
        this.setState({
            values: {
                ...this.state.values,
                from: e
            }
        })
       
        

    }

    // handleInputChangeDateTo = (e) => {
    //     if (this.state.values.from > e) {
    //         console.log("end date cant be lesser than start date");
    //     }
    //     else {
    //         this.setState({
    //             values: {
    //                 ...this.state.values,
    //                 to: e
    //             }
    //         })
    //     }

    // }

   
    render() {
        if (this.state.msg == "ID Job Procured" && this.state.err == null) {
            var edit_job=this.state.values; 
            console.log("sainya2",edit_job)
        return (
            <div>
                <center>
                    <form>
                        <Card className="text-center post-job-form" >
                            <Card.Header>
                                <h3>Edit Job</h3>
                            </Card.Header>
                            <Card.Body>

                                <div className="form-group">
                                    <label className="font-increase-label">Job Title</label>
                                    <input type="text" name="title" className="form-control" value={edit_job.title}  placeholder="Job Title"  />
                                </div>
                                <div className="form-group">
                                    <label className="font-increase-label">Salary</label>
                                    <input type="number" id="salary" name="salary"value={edit_job.salary}  className="form-control"></input>
                                </div>

                                <div className="form-group">
                                    <label className="font-increase-label">Location</label>
                                    <br />
                                    <GoogleComponent apiKey={API_KEY} language={'en'} country={'country:in|country:us'} coordinates={true} className="form-control" />
                                </div>
                                <div className="date-box-postjob form-group">
                                    <div className="p-2 col-example text-left">
                                        <label>Start Date</label><br />
                                        <DatePicker
                                            
                                            selected={this.state.values.from}
                                            // value={new Date(edit_job.duration[0]).toLocaleDateString()}
                                            onChange={this.handleInputChangeDateFrom}
                                            name="from"
                                            dateFormat="MM/dd/yyyy"
                                            className="form-control"
                                             />

                                    </div>
                                    <div className="p-2 col-example text-left">
                                        <label>End Date</label><br />
                                        <DatePicker
                                            value={new Date(edit_job.duration[1]).toLocaleDateString()}
                                            selected={this.state.values.duration[1]}
                                            // onChange={this.handleInputChangeDateTo}
                                            name="to"
                                            dateFormat="MM/dd/yyyy"
                                            className="form-control"
                                            
                                        />
                                    </div>
                                </div>
                                <div className="form-group" >
                                    <label className="font-increase-label">Description</label>
                                    <textarea  name="description" value={edit_job.description} className="form-control" rows={5} placeholder="Description" />

                                </div>
                                <Button  variant="dark" className="btn btn-block">Edit Job</Button>
                            </Card.Body>
                        </Card>
                    </form>
                </center>
            </div>
           

        );
        }
        else{
            return(<div>{this.state.err}</div>)
        }
        
    }

}
export default EditJob