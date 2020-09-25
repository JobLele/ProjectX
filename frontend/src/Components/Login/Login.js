import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Cookies from 'universal-cookie';
import './Login.css';
class Login extends React.Component{

    constructor(props){
        super(props);
        this.state={
            values:{
                email : "",
                password : ""
            },
            err:null,
            msg:null,
            obj:null,
            fields: {},
            errors: {}
        };
        this.submit = this.submit.bind(this);
        //this.handleInputChange = this.handleInputChange.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
    }

    handleInputChange(field,e) {
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

    handleValidation(){
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        if(!fields["email"]){
            formIsValid = false;
            errors["email"] = "Cannot be empty";
         }
         if(!fields["password"]){
            formIsValid = false;
            errors["password"] = "Cannot be empty";
         }
         this.setState({errors: errors});
         console.log(this.state.errors);
           return formIsValid;
        }

    submit(e){
        e.preventDefault();
        if(this.handleValidation()){
            alert("Form submitted");
        console.log(this.state.values);
        fetch("http://localhost:2000/login", {
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
                this.setState({err: true, msg: data.err});

            }
            else{
                const cookies = new Cookies();
                this.setState({obj : data.obj});
                console.log(this.state.obj);
                cookies.set('uid', data.obj._id.toString(), { path: '/', secure: "false", strict: "none" });
                console.log(cookies.get('uid'));
                alert("Redirecting to Jobs");
                window.location.href="/jobware"
            }
           
        })
        .catch(err => {
            console.log("mkbmc");
            console.log(err);
        })
    }else{
        alert("Form has errors.")
     }
        
        
        // e.preventdefault();
    }
    render(){
    return(<div><center>
        <form>
        <Card className="text-center login-box-card">
        <Card.Header>
                <h3>Login</h3>
        </Card.Header>
        <Card.Body>
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" onChange={this.handleInputChange.bind(this,"email")} name="email" className="form-control" placeholder="Enter email" />
                    <span style={{color: "red"}}>{this.state.errors["email"]}</span><br />

                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" onChange={this.handleInputChange.bind(this,"password")} name = "password" className="form-control" placeholder="Enter password" />
                    <span style={{color: "red"}}>{this.state.errors["password"]}</span><br />
                   
                </div>

                <div className="form-group text-left">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>
                <Button onClick={this.submit} variant="dark" className="btn btn-block">Login</Button>
                 
                
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
}
export default Login