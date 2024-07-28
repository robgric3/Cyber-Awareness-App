import React, { useState } from 'react';
import { Container, Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './GuestLayout.css';
import logo from '../../images/cyber-logo.jpg';

export const GuestLayout = (props) => {
    const [collapsed, setCollapsed] = useState(true);

    const toggleNavbar = () => {
        setCollapsed(!collapsed);
    }

    return (
        <div>
            <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
                <NavbarBrand tag={Link} to="/">
                    <img src={logo} className="logo" alt="Logo" />
                    CYBER AWARENESS </NavbarBrand>
                <NavbarToggler onClick={toggleNavbar} className="mr-2" />
                <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!collapsed} navbar>
                    <ul className="navbar-nav flex-grow">
                        <NavItem>
                            <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} className="text-dark" to="/users-page">Users</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} className="login-button" to="/login">Log In</NavLink>
                        </NavItem>
                    </ul>
                </Collapse>
            </Navbar>
            <Container>
                {props.children}
            </Container>
        </div>
    );
}
