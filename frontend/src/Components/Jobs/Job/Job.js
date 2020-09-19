import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './Job.css';

class Job extends Component{
    constructor(props){
        super(props);
        this.state={
            values:{
                job:null
            },
            err:null,
            msg:null
        }
        this.getData = this.getData.bind(this);
    }

    componentDidMount(){
        const array=window.location.pathname.split('/');
        const id=array[2];
        fetch(`http://localhost:2000/job/${id}`)
        .then(res=>res.json())
        .then(data=>{this.getData(data)})
        
    }
    getData = (data) => {
        this.setState({
            values: {
                job: data.obj
            },
            err: data.err,
            msg: data.msg
        })
        console.log(this.state.values.jobs);
    }
    render(){
        return(
            // <div>
                <Container>
                    <div className="vertical-center">
                        <Card >
                            <div className="date-box">9 oct</div>
                            <Card.Img variant="top" className="img-box" src="https://png.pngtree.com/png-clipart/20190515/original/pngtree-chef-cooking-fried-chicken-and-delicious-sign-png-image_3635466.jpg" />
                            <Card.Body>
                                <Card.Title>Cook</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Permanent</Card.Subtitle>
                                <Card.Subtitle className="lg-2 salary">$40/month</Card.Subtitle>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the bulk of
                                    the card's content.
                                </Card.Text>
                                <Card.Text>
                                    <div className="bottom-box">
                                        <div>7A 1gokuldam society ,mumbai</div>
                                        <div className="edit-delte-box">
                                        <div className="edit-btn"><Button variant="info" >EDIT</Button></div>
                                        <div><Button variant="danger">DELETE</Button></div>
                                        </div>
                                    </div>

                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                </Container>
            // </div>
        )
    }
}
export default Job;