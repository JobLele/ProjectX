import React from "react"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "./PP.css"
class PP extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: {
        people: []
      },
      err: "",
      msg: ""
    }
  }
  render() {
    return (<div>
      <div className="container">
        <div className="row profile">
          <div classNameName="col-md-3">
            <div className="profile-sidebar">
              <div className="profile-userpic">
                <img src="http://keenthemes.com/preview/metronic/theme/assets/admin/pages/media/profile/profile_user.jpg" className="img-responsive" alt="" />
              </div>
              <div className="profile-usertitle">
                <div className="profile-usertitle-name">
                  Marcus Doe
					</div>
                <div className="profile-usertitle-job">
                  Kakke Da Dhabba
					</div>
              </div>
              <div className="profile-usermenu">
                <div>
                  +91-23456789
                    </div>
                <div style={{ "color": "gray" }}>
                  chotu@gmail.com
                        </div>
              </div>
              <div className="profile-userbuttons">
                <button type="button" className="btn btn-dark btn-sm">Edit Profile</button>
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <div className="profile-content">
              <h3 className="abc"><strong>JOBS POSTED</strong></h3>
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
              <div>
                <h3 className="abc"><strong>JOBS Applied</strong></h3>
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
              </div>

            </div>
          </div>
        </div>
      </div>

    </div>
    );
  }


}
export default PP;