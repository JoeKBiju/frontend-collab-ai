import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

function NavBar() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [userId, setUserId] = useState();
    const [cookies, setCookie, removeCookie] = useCookies(['token']);

    const navigate = useNavigate();

    useEffect(() => {
        // Gets user form cookie
        const getUser = async () => {
            const response = await fetch('http://64.226.76.70/api/auth/user-details', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    'token': cookies.token
                })
            }).then(response => response.json());
            console.log(response)

            if (response.id) {
                setLoggedIn(true);
                setUserId(response.id);
            } else {
                setLoggedIn(false);
            }
        };
        getUser();
    }, [loggedIn]);

    //Log out user
    const handleLogoutClick = async (e) => {
        e.preventDefault();
        const response = await fetch('http://64.226.76.70/api/auth/logout', {
            method: 'POST',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'}            
        })
        removeCookie('token')
        setLoggedIn(false);
        navigate('/')
    };

    const handleLoginClick = () => {
        navigate('/');
    }

    const handleSettingsClick = () => {
        navigate('/settings', {state:{id: userId}});
    }

    let nav;

    if (loggedIn) {
        nav = ( <Nav>
                    <Nav.Link onClick={handleSettingsClick} style={{ fontSize:"21px" }}>Settings</Nav.Link>
                    <Nav.Link onClick={handleLogoutClick} style={{ fontSize:"21px" }}>Logout</Nav.Link>
                </Nav>)
    } else {
        nav = (
            <Nav>
                <Nav.Link as={Link} to='/register' style={{ fontSize:"21px" }}>Register</Nav.Link>
                <Nav.Link onClick={handleLoginClick} style={{ fontSize:"21px" }}>Login</Nav.Link>
            </Nav>
        )
    }

    return ( 
        <Navbar bg="dark" variant="dark">
            <Container fluid>
                {loggedIn ? <Navbar.Brand as={Link} to='/home' style={{fontSize:"25px"}}> Home</Navbar.Brand> : <Navbar.Brand as={Link} onClick={handleSettingsClick} style={{fontSize:"25px"}}> Please Log In</Navbar.Brand>}
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    {nav}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;