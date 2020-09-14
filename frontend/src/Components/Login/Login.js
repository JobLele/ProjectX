import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './Login.css';
const Login =()=>{
    return(<div><center>
        <form>
        <Card className="text-center login-box-card">
        <Card.Header>
                <h3>Login</h3>
        </Card.Header>
        <Card.Body>
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" />
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

export default Login
