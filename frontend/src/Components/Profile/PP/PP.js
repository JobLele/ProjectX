import React, { Component } from "react"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Cookies from 'universal-cookie';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import "./PP.css"

class PP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: {
        user: {}
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
  }
  getData = (data) => {
    console.log("sainya", data);
    this.setState({
      values: {
        user: data.obj
      },
      err: data.err,
      msg: data.msg
    })
  }

  render() {
    let appliedForLength=false;
    let jobsPostedLength=false;
    if (this.state.err === null && this.state.msg === "Found user by id") {
      if(this.state.values.user.appliedFor.length>0)
         appliedForLength=true;
      if(this.state.values.user.jobsPosted.length>0)
        jobsPostedLength=true;
      return (<div>
        <div className="container">
          <div className="row profile">
            <div classNameName="col-md-3">
              <div className="profile-sidebar">
                {/* <div className="profile-userpic">
                <img src="http://keenthemes.com/preview/metronic/theme/assets/admin/pages/media/profile/profile_user.jpg" className="img-responsive" alt="" />
              </div> */}
                <div className="profile-usertitle">
                  <div className="profile-usertitle-name">
                    {this.state.values.user.name}
				      	</div>
                  {/* <div className="profile-usertitle-job">
                  Kakke Da Dhabba
					      </div> */}
                </div>
                <div className="profile-usermenu">
                  <div>
                    {this.state.values.user.number}
                </div>
                  <div style={{ "color": "gray" }}>
                  {this.state.values.user.email}
                </div>
                </div>
                <div className="profile-userbuttons">
                  <button type="button" className="btn btn-dark btn-sm">Edit Profile</button>
                </div>
              </div>
            </div>
            <div className="col-md-9">
              <div className="profile-content">
              <div className="abc">JOBS POSTED</div>
                {jobsPostedLength && 
                (
                <div>
                  <span>
                    <div className="flex-container">
                      <div>
                        <Card style={{ width: '18rem' }}>
                          <Card.Img variant="top" src="https://png.pngtree.com/png-clipart/20190515/original/pngtree-chef-cooking-fried-chicken-and-delicious-sign-png-image_3635466.jpg" />
                          <Card.Body>
                            <Card.Title><h3><string>JOB Title</string></h3></Card.Title>
                            <Card.Text>
                              <div>
                                <span style={{ 'textAlign': 'left' }}>Start Date</span>
                                <span style={{ 'textAlign': 'right' }}>End Date</span>
                              </div>
                              <div>Salary</div>
                              <div>
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content.
                            </div>

                            </Card.Text>
                            <Button type="button" variant="btn btn-dark btn-sm">Edit Job</Button>
                          </Card.Body>
                        </Card>
                      </div>
                      <div>
                        <Card style={{ width: '18rem' }}>
                          <Card.Img variant="top" src="https://png.pngtree.com/png-clipart/20190515/original/pngtree-chef-cooking-fried-chicken-and-delicious-sign-png-image_3635466.jpg" />
                          <Card.Body>
                            <Card.Title><h3><string>JOB Title</string></h3></Card.Title>
                            <Card.Text>
                              <div>
                                <span style={{ 'textAlign': 'left' }}>Start Date</span>
                                <span style={{ 'textAlign': 'right' }}>End Date</span>
                              </div>
                              <div>Salary</div>
                              <div>
                                Some quick example text to build on the card title and make up the bulk of
                                the card's content.
                              </div>

                            </Card.Text>
                            <Button type="button" variant="btn btn-dark btn-sm">Edit Job</Button>
                          </Card.Body>
                        </Card>
                      </div>

                    </div>
                  </span>
                </div>
                )}

                {!jobsPostedLength && (<div>No jobs posted</div>)}
                <div>
                  <div className="abc">JOBS Applied</div>
                  {appliedForLength && 
                (
                  
                      <div className="flex-container">
                        <div>
                          <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src="https://png.pngtree.com/png-clipart/20190515/original/pngtree-chef-cooking-fried-chicken-and-delicious-sign-png-image_3635466.jpg" />
                            <Card.Body>
                              <Card.Title><h3><string>JOB Title</string></h3></Card.Title>
                              <Card.Text>
                                <div>
                                  <span style={{ 'textAlign': 'left' }}>Start Date</span>
                                  <span style={{ 'textAlign': 'right' }}>End Date</span>
                                </div>
                                <div>Salary</div>
                                <div>
                                  Some quick example text to build on the card title and make up the bulk of
                                  the card's content.
                                </div>

                              </Card.Text>
                              <Button type="button" variant="btn btn-dark btn-sm">Edit Job</Button>
                            </Card.Body>
                          </Card>
                        </div>
                        <div>
                          <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src="https://png.pngtree.com/png-clipart/20190515/original/pngtree-chef-cooking-fried-chicken-and-delicious-sign-png-image_3635466.jpg" />
                            <Card.Body>
                              <Card.Title><h3><string>JOB Title</string></h3></Card.Title>
                              <Card.Text>
                                <div>
                                  <span style={{ 'textAlign': 'left' }}>Start Date</span>
                                  <span style={{ 'textAlign': 'right' }}>End Date</span>
                                </div>
                                <div>Salary</div>
                                <div>
                                  Some quick example text to build on the card title and make up the bulk of
                                  the card's content.
                                </div>

                              </Card.Text>
                              <Button type="button" variant="btn btn-dark btn-sm">Edit Job</Button>
                            </Card.Body>
                          </Card>
                        </div>
                      </div>
                  )}
                  {!appliedForLength && (<div>Yet Not applied to any job </div>)}
                   
                </div>

              </div>
            </div>
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
export default PP;