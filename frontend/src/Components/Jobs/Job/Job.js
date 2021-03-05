import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Jumbotron from 'react-bootstrap/Jumbotron'
import Cookies from 'universal-cookie';
import ApplyJob  from '../ApplyJob/ApplyJob'
import DeleteJob from '../DeleteJob/DeleteJob'
import Applicants from '../Applicants/Applicants'
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
            userLogged: false,
        }
        this.getData = this.getData.bind(this);
    
      
    }
    getData = (data) => {
        const cookies = new Cookies();
        console.log(cookies.get('uid'));
        console.log(data);
        if (cookies.get('uid') == data.obj.postedBy) {
            this.setState({
                userLogged: true
            })
            console.log("cookies set");
        }
        else{
            console.log("cookies  not set");
            console.log("user loogedd",this.state.userLogged)
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

    componentDidMount() {
        const array = window.location.pathname.split('/');
        const id = array[2];
        fetch(`http://localhost:2000/job/${id}`)
            .then(res => res.json())
            .then(data => { this.getData(data) })


        console.log(this.state.values.job);

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
                                        <div>{view_job.region}, {view_job.state}</div>
                                        <div className="edit-delte-box">
                                            <div className="edit-btn">
                                                {(this.state.userLogged) && (<Link to={`/jobware/${view_job._id}/edit`}><Button variant="info" >EDIT</Button></Link>)}
                                            </div>

                                            {(this.state.userLogged) && (<DeleteJob view_job={view_job}/>)}

                                            {(!this.state.userLogged)&& <ApplyJob view_job={view_job}/>}

                                            {(this.state.userLogged) && <Applicants view_job={view_job}/>}


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
            return ( <Jumbotron fluid>
                <Container>
                <h1><center>{this.state.msg}</center></h1>
                </Container>
            </Jumbotron>)
        }
    }
}
export default Job;