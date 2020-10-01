import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import {NavDropdown} from'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Cookies from 'universal-cookie';
import FormControl from 'react-bootstrap/FormControl';
import Nav from 'react-bootstrap/Nav'
import './Navbar.css';
import { Link } from 'react-router-dom'

class NavbarFunction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:"",
            showLogin: true,
            showLogout: false
        };
    }
    componentDidMount() {
        const cookies = new Cookies();
        if (cookies.get('uid')) {
            this.setState({
                showLogin: false,
                showLogout: true
            })
            fetch(`http://localhost:2000/user/${cookies.get('uid')}`)
            .then(res => res.json())
            .then(data => { this.setState({name:data.obj.name}) })

        }
    }
    render() {
        const cookies = new Cookies();
        return (
            <div className="nav-box">

                <Navbar bg="dark" expand="lg" variant="dark" >
                    <Link to='/Jobware'>
                        <Navbar.Brand href="#home">
                            <img
                                src="https://kryptomoney.com/wp-content/uploads/2017/10/KryptoMoney.com-Bitcoin-Jobs-rises.jpg"
                                width="30"
                                height="30"
                                className="d-inline-block align-top image-navbar"
                                alt=""
                            />
                        Jobware
                    </Navbar.Brand>
                    </Link>
                    

                   
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="login-box">
                        <Form inline>
                            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                            <Button variant="outline-secondary">Search</Button>
                        </Form>
                        <Nav >
                            {(this.state.showLogin) && (<Nav.Link className="login" href="/login">Login / </Nav.Link>)}
                            {(this.state.showLogin) && (<Nav.Link className="login" show={this.state.showLogin} href="/register">Register</Nav.Link>)}
                            {/* {(this.state.showLogout) && (<Nav.Link className="login" href="/logout">Logout</Nav.Link>)} */}
                            </Nav>
                            <Nav>
                            {(this.state.showLogout) && 
                            <NavDropdown title={this.state.name} id="collasible-nav-dropdown">
                                <NavDropdown.Item href="/jobware/profile">View Profile</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href={`/jobware/profile/${cookies.get('uid')}/edit`}>Edit Profile</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
                                
                               
                                
                            </NavDropdown>
    }
                            <Link to='/jobware/postjob'>
                                <Button show={this.state.showLogout} variant="outline-secondary" className="postjob">Post Job</Button>
                            </Link>

                        </Nav>

                    </Navbar.Collapse>
                </Navbar>

            </div>
        );
    }
}
export default NavbarFunction;
