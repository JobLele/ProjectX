import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './Joblist.css';

class JobList extends Component {
    constructor(props) {

        super(props);
        console.log("G");
        this.state = {
            values: [],
            err: null,
            msg: null,
            obj: null,
            isLoaded: false
        };
    }

    componentDidMount() {
        fetch("http://localhost:2000/jobs/0")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    console.log("A");
                    this.setState({
                      isLoaded: true,
                      values:result.obj,
                      obj: result.obj,
                      err : result.err
                    });
                    console.log(this.state.values);
                    console.log(this.state.err);
            },
            (error) => {
                console.log("u");
                this.setState({
                  isLoaded: true,
                  error
                });
              }
            )
        }

    render() {
        var {values, err, msg, obj, isloaded} = this.state;
        return (
            values.map(value => (
        <div>
            <Container>
                <div className="card-main-box text-center">
                    <div className="individual-card">
                        <Card style={{ width: '20rem' }}>
                            <div className="date-box">9 oct</div>
                            <Card.Img variant="top" className="img-box" src="https://png.pngtree.com/png-clipart/20190515/original/pngtree-chef-cooking-fried-chicken-and-delicious-sign-png-image_3635466.jpg" />
                            <Card.Body>
                                <Card.Title>{value.title}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Permanent</Card.Subtitle>
                                <Card.Subtitle className="lg-2 salary">{value.salary}</Card.Subtitle>
                                <Card.Text>
                                    {value.description}
                                </Card.Text>
                                <Card.Text>
                                    <div className="bottom-box">
                                        <div>{value.location}</div>
                                        <div>
                                            
                                            <Button variant="dark" >view</Button>
                                            </div>

                                    </div>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>

                    
                </div>


            </Container>

        </div>
        ))
        )
    }
}

export default JobList