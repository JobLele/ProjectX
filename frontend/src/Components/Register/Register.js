import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            values: {
                name : "",
                email : "",
                password : "",
                number : 0,
            },
            err: null,
            msg: null,
            obj: null
        };
        this.submit = this.submit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(e) {
        this.setState({
            values : {
                ...this.state.values,
                [e.target.name] : e.target.value
            }
        });
    }

    submit(e) {
        e.preventDefault();
        fetch("http://localhost:2000/register", {
            method: 'POST',
            body: this.state.values,
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => {
            this.setState({ err: false, msg: res.msg });
            return res.json();
        })
        .then(data => {
            console.log(data);
            this.setState({obj : data.obj});
            console.log(this.state.obj);
        })
    }

    render () {
        return(<div><center>
            <form>
            <Card className="text-center" style={{ width: '50%' }}>
            <Card.Header>
                    <h3>Register</h3>
            </Card.Header>
            <Card.Body>
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" onChange={this.handleInputChange} name="name" className="form-control" placeholder="Enter name" />
                    </div>
                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" onChange={this.handleInputChange} name="email" className="form-control" placeholder="Enter email" />
                    </div>
    
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" onChange={this.handleInputChange} name="password" className="form-control" placeholder="Enter password" />
                    </div>
                    
                    <div className="form-group">
                        <label>Number</label>
                        <input type="number" onChange={this.handleInputChange} name="number" className="form-control" placeholder="Enter number" />
                    </div>
                    {/* <div className="form-group">
                        <label>Qualification</label>
                        <input type="text" className="form-control" placeholder="Enter qualification" />
                    </div>
                    <div className="form-group text-left">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="customCheck1" />
                            <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                        </div>
                    </div> */}
    
                    <Button onClick={this.submit} type="submit" variant="dark" className="btn btn-block">Register</Button>
                    </Card.Body>
                    </Card>
                </form>
                </center>
        </div>
        );
    }

}

export default Register
