import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Cookies from 'universal-cookie';
import './EditProfile.css'
class EditProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            values: {
                name: "",
                email: "",
                number: 0,
                qualification: ""
            },
            err: null,
            msg: null,
            obj: null,
            fields: {},
            errors: {}
        };
        this.submit = this.submit.bind(this);
        //this.handleInputChange = this.handleInputChange.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
    }
    componentDidMount() {
        const cookies = new Cookies();
        if (cookies.get('uid')) {

            const id = cookies.get('uid');
            fetch(`http://localhost:2000/user/${id}`)
                .then(res => res.json())
                .then(data => this.getData(data))

        }


    }
    getData = (data) => {
        let fields = this.state.fields;
        fields["name"] = data.obj.name
        fields["email"] = data.obj.email
        fields["number"] = data.obj.number
        console.log("DATA")
        console.log(data)
        this.setState({
            values: {
                name: data.obj.name,
                email: data.obj.email,
                number: data.obj.number,
                qualification: data.obj.qualification
            },
            err: data.err,
            msg: data.msg,
            fields,
            errors: {}
        })
    }

    handleInputChange(field, e) {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({ fields });
        this.setState({
            fields,
            values: {
                ...this.state.values,
                [e.target.name]: e.target.value
            }
        });
    }
    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
        console.log(fields)
        //Name
        if (!fields["name"]) {
            formIsValid = false;
            errors["name"] = "Cannot be empty";
        } if (!fields["email"]) {
            formIsValid = false;
            errors["email"] = "Cannot be empty";
        }

        if (!fields["number"]) {
            formIsValid = false;
            errors["number"] = "Cannot be empty";
        }
        return  formIsValid
    }

    handleInputChangeQualification = (e) => {
        this.setState({
            values: {
                ...this.state.values,
                [e.target.name]: e.target.value
            }
        })
    }
    submit(e) {
        const cookies = new Cookies()
        e.preventDefault();
        if (this.handleValidation()) {
            alert("Form submitted");
            fetch("http://localhost:2000/user/" + cookies.get('uid'), {
                method: 'PUT',
                body: JSON.stringify(this.state.values),
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(res => {
                    this.setState({ err: false, msg: res.msg });
                    return res.json();
                })
                .then(data => {
                    if (data.err) {
                        console.log("P")
                        this.setState({ err: true, msg: data.err });

                    }
                    else {
                        console.log("H")
                        this.setState({ obj: data.obj });
                        console.log(this.state.obj);
                        window.location.href = "/jobware/profile"
                    }

                })
        } else {
            alert("Form has errors.")
        }
    }

    render() {
        if (this.state.err !== true) {
            const user = this.state.values;
            console.log("sainyaaaaaaaa", user);
            return (<div><center>
                <form>
                    <Card className="text-center register-box-card">
                        <Card.Header>
                            <h3>Edit Profile</h3>
                        </Card.Header>
                        <Card.Body>
                            <div className="form-group">
                                <label>Name*</label>
                                <input type="text" value={user.name} name="name" onChange={this.handleInputChange.bind(this, "name")} className="form-control" placeholder="Enter name" />
                                <span style={{ color: "red" }}>{this.state.errors["name"]}</span>
                                <br />
                            </div>
                            <div className="form-group">
                                <label>Email address*</label>
                                <input type="email" value={user.email} name="email" onChange={this.handleInputChange.bind(this, "email")} className="form-control" placeholder="Enter email" />
                                <span style={{ color: "red" }}>{this.state.errors["email"]}</span>
                                <br />
                            </div>

                            <div className="form-group">
                                <label>Number*</label>
                                <input type="number" value={user.number} name="number" onChange={this.handleInputChange.bind(this, "number")} className="form-control" placeholder="Enter number" />
                                <span style={{ color: "red" }}>{this.state.errors["number"]}</span>
                                <br />
                            </div>
                            <div className="form-group">
                                <label>Qualification</label>
                                <input type="text" className="form-control" name="qualification" value={user.qualification} onChange={this.handleInputChangeQualification} placeholder="Enter qualification" />
                                <div className="desc-feat">You can mention as 12Completed, 10Completed, BTech, MBA.....</div>
                            </div>
                            {/* <div className="form-group text-left">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="customCheck1" />
                            <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                        </div>
                    </div> */}

                            <Button onClick={this.submit} type="submit" variant="dark" className="btn btn-block">Done</Button>
                        </Card.Body>
                    </Card>
                </form>
            </center>
            </div>
            )
        } else {
            return (
                <Jumbotron fluid>
                    <Container>
                        <h1><center>{this.state.msg}</center></h1>
                    </Container>
                </Jumbotron>
            )
        }
    }

}

export default EditProfile
