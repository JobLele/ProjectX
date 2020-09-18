import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import FormControl from 'react-bootstrap/FormControl';
import Nav from 'react-bootstrap/Nav'
import './Navbar.css';
import { Link } from 'react-router-dom'

const NavbarFunction = () => {
    return (
        <div className="nav-box">

            <Navbar bg="dark" expand="lg" variant="dark" >
                <Link to='/Jobware'>
                    <Navbar.Brand href="#home">
                        <img
                            src="/logo.svg"
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
                        <Nav.Link className="login" href="/login">Login / </Nav.Link>
                        <Nav.Link className="login" href="/register">Register</Nav.Link>
                        <Link to='/jobware/postjob'>
                            <Button variant="outline-secondary" className="postjob">Post Job</Button>
                        </Link>

                    </Nav>

                </Navbar.Collapse>
            </Navbar>

        </div>
    );
}
export default NavbarFunction;
