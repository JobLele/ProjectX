import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./postjob.css";
import { GoogleComponent } from 'react-google-location' 
const API_KEY = "AIzaSyAVjo-bKTuYIr6i5qtybWmaaWOBM3UWgJQ";
class PostJob extends React.Component{
    constructor(props){
        super(props);
        this.state={
            salary:0
        }
    }
/*
    constructor(props){
        super(props);
        this.state={
            values:{
                jobTitle : "",
                from : new Date(),
                to : new Date(),
                salary : 0,
                location : "",
                desc : ""
            },
            err : null, 
            msg : null,
            obj : null
        };
        //this.submit = this.submit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(e){
        this.setState({
            values :{
            ...this.state.values,
            [e.target.name] : e.target.value
            }
        });
    }

    //submit(e){}
  */
    render () {
    return(
        <div><center>
        <form>
        <Card className="text-center " style={{ width: '50%' }}>
        <Card.Header>
                <h3>Job Post</h3>
        </Card.Header>
        <Card.Body>

                <div className="form-group">
                    <label>Job Title</label>
                    <input type="text" name="jobTitle" className="form-control" placeholder="Job Title" />
                </div>
                <div className="form-group">
                     <label>Salary</label>
                     
                     <input type = "number" id="salary" className="form-control"></input>
                 </div>
                <div className="d-flex justify-content-between">
                <div className="p-2 col-example text-left">
                    <label>Start Date</label><br/>
                <DatePicker />
                </div>
                <div className="p-2 col-example text-left">
                <label>End Date</label><br/>
                <DatePicker />
                </div>
                </div>
                <div className="form-group">
                    <label>Location</label>
                    <br/>
                <GoogleComponent apiKey={API_KEY} language={'en'} country={'country:in|country:us'} coordinates={true} locationBoxStyle={'custom-style'}
          locationListStyle={'custom-style-list'} className="form-control"/>
          </div>
                <div className="form-group" >
                    <label>Description</label>
                <textarea name="desc" className="form-control" rows={5} placeholder="Description" />
                </div>
                <Button type="submit" variant="dark" className="btn btn-block">Post Job</Button>
                </Card.Body>
                </Card>
            </form>
            </center>
    </div>
    );
    }
}

export default PostJob
