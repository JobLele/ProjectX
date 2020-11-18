import React, { Component } from "react"
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Cookies from 'universal-cookie';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import "./fonts.css"
import "./default.css"

class Prof extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: {
        user: {},
      },
      err: "",
      msg: ""
    }
  }

  componentDidMount() {
    const cookies = new Cookies();
    if (cookies.get('uid')) {
      const id = cookies.get('uid');
      fetch(`http://localhost:2000/user/${id}`)
        .then(res => res.json())
        .then(data => { this.getData(data) })
    }
    else {
      alert("Login to view your profile");
      window.location.href = "/";
    }

  }
  getData = (data) => {
    console.log(data);
    this.setState({
      values: {
        user: data.obj
      },
      err: data.err,
      msg: data.msg
    })
  }

  render() {
    const MAX_LENGTH = 250;
    let appliedForLength = false;
    let jobsPostedLength = false;
    if (this.state.err === null && this.state.msg === "Found user by id") {
      if (this.state.values.user.appliedFor.length > 0)
        appliedForLength = true;
      if (this.state.values.user.jobsPosted.length > 0)
        jobsPostedLength = true;
      return (<div>
        <div id="header-wrapper">
        <div id="header" className="container">
            <div id="logo">
                <span>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS6zes53m4a_2VLTcmTn_bHk8NO5SkuWfcQbg&usqp=CAU" className="img-responsive" alt="" />
                </span>
                <h1>{this.state.values.user.name}</h1>
                <h4>
                <div>
                    {this.state.values.user.number}
                  </div>
                  <div>
                    {this.state.values.user.email}
                  </div>
                  <div>
                      {this.state.values.user.qualification}
                  </div>
                  </h4>
                 </div>
            
        </div>
    </div>
    
    <div id="wrapper3">
        <div id="portfolio" className="container">
            <div className="title">
                <br/>
                <h2>JOBS POSTED</h2>
                 </div>
                 {jobsPostedLength &&
                  (
                 <div className="flex-container">
                      {this.state.values.user.jobsPosted.map(job => (
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
                  )}
                  {!jobsPostedLength && (<div>No jobs posted</div>)}
        </div>
    </div>
    <div id="wrapper3">
        <div id="portfolio" className="container">
            <div className="title">
                <h2>JOBS Applied</h2>
                 </div>
                 {appliedForLength &&
                  (

                    <div className="flex-container">
                      {this.state.values.user.appliedFor.map(job => (
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

                  )
                }
                                {!appliedForLength && (<div>Yet Not applied to any job </div>)}

                </div>
    </div>
    </div>
    );
}
else {
  return (
    <Container>
      <Jumbotron fluid>
        <Container>
          <h1><center>{this.state.err}</center></h1>
        </Container>
      </Jumbotron>

    </Container>
  )
}
}


}
export default Prof;