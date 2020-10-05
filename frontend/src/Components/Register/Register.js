import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './Register.css'

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            values: {
                name : "",
                email : "",
                password : "",
                number : 0,
                qualification:""
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

    handleInputChange=(field,e)=> {
        let fields = this.state.fields;
            fields[field] = e.target.value;        
            this.setState({fields});
        this.setState({
            fields,
            values : {
                ...this.state.values,
                [e.target.name] : e.target.value
            }
        });
    }
    handleInputChangeQualification=(e)=>{
        this.setState({
            values:{
                ...this.state.values,
                [e.target.name] : e.target.value
            }
        })
    }
    handleValidation(){
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //Name
        if(!fields["name"]){
           formIsValid = false;
           errors["name"] = "Cannot be empty";
        }if(!fields["email"]){
            formIsValid = false;
            errors["email"] = "Cannot be empty";
         }
         if(!fields["password"]){
            formIsValid = false;
            errors["password"] = "Cannot be empty";
         }
         if(!fields["number"]){
            formIsValid = false;
            errors["number"] = "Cannot be empty";
         }
         this.setState({errors: errors});
         //console.log(this.state.errors);
           return formIsValid;
        }
    submit(e) {
        e.preventDefault();
        if(this.handleValidation()){
        alert("Form submitted");
        fetch("http://localhost:2000/register", {
            method: 'POST',
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
                this.setState({err: true, msg: data.err});

            }
            else{
                console.log("H")
                this.setState({obj : data.obj});
                console.log(this.state.obj);
                window.location.href="/login"
            }
            
        })
    }else{
        alert("Form has errors.")
     }
    }

    render () {
        if(this.state.err !== true){
        return( 
        <div><center>
            <form>
            <Card className="text-center register-box-card">
            <Card.Header>
                    <h3>Register</h3>
            </Card.Header>
            <Card.Body>
                    <div className="form-group">
                        <label>Name*</label>
                        <input type="text" onChange={this.handleInputChange.bind(this,"name")} name="name" className="form-control" placeholder="Enter name" />
                        <span style={{color: "red"}}>{this.state.errors["name"]}</span>
                    <br/>
                    </div>
                    <div className="form-group">
                        <label>Email address*</label>
                        <input type="email" onChange={this.handleInputChange.bind(this,"email")} name="email" className="form-control" placeholder="Enter email" />
                        <span style={{color: "red"}}>{this.state.errors["email"]}</span>
                        <br/>
                    </div>
    
                    <div className="form-group">
                        <label>Password*</label>
                        <input type="password" onChange={this.handleInputChange.bind(this,"password")} name="password" className="form-control" placeholder="Enter password" />
                        <span style={{color: "red"}}>{this.state.errors["password"]}</span>
                              <br/>
                    </div>
                    
                    <div className="form-group">
                        <label>Number*</label>
                        <input type="number" onChange={this.handleInputChange.bind(this,"number")} name="number" className="form-control" placeholder="Enter number" />
                        <span style={{color: "red"}}>{this.state.errors["number"]}</span>
                              <br/>
                    </div>
                   <div className="form-group">
                        <label>Qualification</label>
                        <input type="text" className="form-control" name ="qualification" onChange={this.handleInputChangeQualification} placeholder="Enter qualification" />
                        <div className="desc-feat">You can mention as 12Completed, 10Completed, BTech, MBA....</div>
                    </div> 
                    {/* <div className="form-group text-left">
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
        </div>)}else{
            return(
            <Jumbotron fluid>
            <Container>
            <h1><center>{this.state.msg}</center></h1>
            </Container>
        </Jumbotron> 
            )}
        
    }

}

export default Register
