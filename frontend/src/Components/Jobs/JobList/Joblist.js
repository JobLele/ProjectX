import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './Joblist.css';

class JobList extends Component {
     constructor(props){
        super(props);
        this.state={
            values:{
                jobs:[]
            },
            err: null,
            msg: null,
            
        }
        this.getData = this.getData.bind(this);
     }

     getData=(data)=>{
         console.log("sainya");
         console.log(data.msg);
         this.setState({
             values:{
                 jobs:data.obj
             },
             err:data.err,
             msg:data.msg
         })
         console.log(this.msg);
     }

    componentDidMount(){
        fetch("http://localhost:2000/jobs/0")
        .then(res=>res.json())
        .then(data=>{
            console.log(data.msg);
            this.setState({
                values:{
                    jobs:data.obj
                },
                err:data.err,
                msg:data.msg
            });
            console.log(this.msg);
        }
        
        )
        
    }

    render() {
        if(this.msg=="ID Job Procured" && this.err ==null){
        return (        
        <div>
            <Container>
                <div className="card-main-box text-center">
                    <div className="individual-card">
                        <Card style={{ width: '20rem' }}>
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
                                        <div>
                                            
                                            <Button variant="dark" >view</Button>
                                            </div>

                                    </div>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>

                    <div className="individual-card">
                        <Card style={{ width: '20rem' }}>
                            <div className="date-box">9 oct</div>
                            <Card.Img variant="top" className="img-box" src="https://lh3.googleusercontent.com/proxy/5JyNbppZ3y4G00tEVWvUShBPbKcYooOSns4PUl2NAhQlzbWhEtb10I50EJYADONVqDTd7zHyrYy2TCBYEanZoJ1qwAYR1GeAFl4GTA" />
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
                                        <div><Button variant="dark" >view</Button></div>

                                    </div>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>

                    <div className="individual-card">
                        <Card style={{ width: '20rem' }}>
                            <div className="date-box">9 oct</div>
                            <Card.Img variant="top" className="img-box" src="https://lh3.googleusercontent.com/proxy/5JyNbppZ3y4G00tEVWvUShBPbKcYooOSns4PUl2NAhQlzbWhEtb10I50EJYADONVqDTd7zHyrYy2TCBYEanZoJ1qwAYR1GeAFl4GTA" />
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
                                        <div><Button variant="dark" >view</Button></div>

                                    </div>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>

                    <div className="individual-card">
                        <Card style={{ width: '20rem' }}>
                            <div className="date-box">9 oct</div>
                            <Card.Img variant="top" className="img-box" src="https://lh3.googleusercontent.com/proxy/5JyNbppZ3y4G00tEVWvUShBPbKcYooOSns4PUl2NAhQlzbWhEtb10I50EJYADONVqDTd7zHyrYy2TCBYEanZoJ1qwAYR1GeAFl4GTA" />
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
                                        <div><Button variant="dark" >view</Button></div>

                                    </div>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>

                    <div className="individual-card">
                        <Card style={{ width: '20rem' }}>
                            <div className="date-box">9 oct</div>
                            <Card.Img variant="top" className="img-box" src="https://lh3.googleusercontent.com/proxy/5JyNbppZ3y4G00tEVWvUShBPbKcYooOSns4PUl2NAhQlzbWhEtb10I50EJYADONVqDTd7zHyrYy2TCBYEanZoJ1qwAYR1GeAFl4GTA" />
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
                                        <div><Button variant="dark" >view</Button></div>

                                    </div>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>

                    <div className="individual-card">
                        <Card style={{ width: '20rem' }}>
                            <div className="date-box">9 oct</div>
                            <Card.Img variant="top" className="img-box" src="https://lh3.googleusercontent.com/proxy/5JyNbppZ3y4G00tEVWvUShBPbKcYooOSns4PUl2NAhQlzbWhEtb10I50EJYADONVqDTd7zHyrYy2TCBYEanZoJ1qwAYR1GeAFl4GTA" />
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
                                        <div><Button variant="dark" >view</Button></div>

                                    </div>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                </div>


            </Container>

        </div>)}
        else if(this.err!=null){
            return(
                <div>
                    <h1>err</h1>
                </div>
            )
        }
        else{
            return(
                <div>NoJobExist</div>
            )
        }
    }
}

export default JobList