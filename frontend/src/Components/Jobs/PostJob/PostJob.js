import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Calendar from '@lls/react-light-calendar'
import '@lls/react-light-calendar/dist/index.css' // Default Style
//import Calendar from 'react-calendar';
//import 'react-calendar/dist/Calendar.css'
class PostJob extends React.Component{

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
                    <input type="text" onChange={this.handleInputChange} name="jobTitle" className="form-control" placeholder="Job Title" />
                </div>

                <div className="form-group" >
                    <label>Start Date</label>
                    <Calendar onChange={this.handleInputChange} name="from" className="form-control" />
                </div>
                <div className="form-group" >
                    <label>End Date</label>
                    <Calendar onChange={this.handleInputChange} name="to" className="form-control" />
                </div>
                <div className="form-group" >
                    <label>Description</label>
                <textarea onChange={this.handleInputChange} name="desc" className="form-control" rows={5} placeholder="Description" />
                </div>
                <div className="form-group text-left">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>
                <Button type="submit" variant="dark" className="btn btn-block">Login</Button>
                 
                
                <p className="forgot-password text-right">
                    Forgot <a href="/">password?</a>
                </p>
                </Card.Body>
                </Card>
            </form>
            </center>
    </div>
    );
    }
}

export default PostJob
