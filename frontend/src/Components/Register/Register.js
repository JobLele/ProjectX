import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
const Register =()=>{
    return(<div><center>
        <form>
        <Card className="text-center" style={{ width: '50%' }}>
        <Card.Header>
                <h3>Register</h3>
        </Card.Header>
        <Card.Body>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" className="form-control" placeholder="Enter name" />
                </div>
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>
                
                <div className="form-group">
                    <label>Number</label>
                    <input type="number" className="form-control" placeholder="Enter number" />
                </div>
                <div className="form-group">
                    <label>Qualification</label>
                    <input type="text" className="form-control" placeholder="Enter qualification" />
                </div>
                <div className="form-group text-left">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <Button type="submit" variant="dark" className="btn btn-block">Register</Button>
                </Card.Body>
                </Card>
            </form>
            </center>
    </div>
    );
}

export default Register
