import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './Joblist.css';

class JobList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            values: {
                jobs: []
            },
            err: null,
            msg: null,
        }
        if (sessionStorage.getItem("logged") != null && sessionStorage.getItem("logged") == "true") {
            console.log(sessionStorage.getItem("id"));
        }
        this.count = 0;
        this.getData = this.getData.bind(this);
        this.previousGetData = this.previousGetData.bind(this);
        this.nextGetData = this.nextGetData.bind(this);
    }

    getData = (data) => {
        this.setState({
            values: {
                jobs: data.obj
            },
            err: data.err,
            msg: data.msg
        })
        console.log(this.state.values);
    }

    componentDidMount() {
        fetch(`http://localhost:2000/jobs/${this.count}`)
            .then(res => res.json())
            .then(data => { this.getData(data) })

    }
    previousGetData(event) {
        event.preventDefault();
        this.count = this.count - 1;
        if(this.count>=0){
            fetch(`http://localhost:2000/jobs/${this.count}`)
            .then(res => res.json())
            .then(data => { this.getData(data) })
        }
        else{
            this.count=this.count+1;
        }
       
    }
    nextGetData(e) {
        e.preventDefault();
        this.count = this.count + 1;
        fetch(`http://localhost:2000/jobs/${this.count}`)
            .then(res => res.json())
            .then(data => { this.getData(data) })
    }

    render() {
        const MAX_LENGTH = 250
        if (this.state.msg == "ID Job Procured" && this.state.err == null) {
            return (
                <div>
                    <Container>
                        <div className="card-main-box text-center">
                            {this.state.values.jobs.map(job => (
                                <div key={job.id} className="individual-card">
                                    <Card style={{ width: '20rem' }}>
                                        <div className="date-box">{new Date(job.postedOn).toLocaleDateString()}</div>
                                        <Card.Img variant="top" className="img-box" src="https://png.pngtree.com/png-clipart/20190515/original/pngtree-chef-cooking-fried-chicken-and-delicious-sign-png-image_3635466.jpg" />
                                        <Card.Body>
                                            <Card.Title>{job.title}</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">{new Date(job.duration[0]).toLocaleDateString()} - {new Date(job.duration[1]).toLocaleDateString()}</Card.Subtitle>
                                            <Card.Subtitle className="lg-2 salary">₹{job.salary}/day</Card.Subtitle>
                                            {job.description > MAX_LENGTH ?
                                                (
                                                    <Card.Text>
                                                        { job.description.substring(0, MAX_LENGTH)}
                                                    </Card.Text>
                                                ) : (
                                                    <Card.Text>
                                                        {job.description}
                                                    </Card.Text>
                                                )
                                            }

                                            <Card.Text>
                                                <div className="bottom-box">
                                                    <div>7A 1gokuldam society ,mumbai</div>
                                                    <div>
                                                        <Link to={`/jobware/${job._id}`}>
                                                            <Button variant="dark" >view</Button>
                                                        </Link>
                                                    </div>

                                                </div>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </div>

                            ))}

                        </div>
                        <div className="next-previous-box">
                            <Button onClick={this.previousGetData} variant="outline-dark" >{`<`}</Button>
                            <Button onClick={this.nextGetData} variant="outline-dark">{`>`}</Button>
                        </div>

                    </Container>

                </div>

            )
        }
        else  {
            return (
                <Container>
                    <h1>{this.state.err}</h1>
                    <div className="next-previous-box">
                        <Button onClick={this.previousGetData} variant="outline-dark" >{`<`}</Button>
                        <Button onClick={this.nextGetData} variant="outline-dark">{`>`}</Button>
                    </div>
                </Container>
            )
        }
        
    }
}

export default JobList