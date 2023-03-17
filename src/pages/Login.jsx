import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cookies, setCookie] = useCookies(['token']);

    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://64.226.76.70/api/auth/login', {
                method: 'POST',
                credentials: 'include',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    email,
                    password,
                })
            })
            .then(response => response.json());
        
        setCookie("token", response.token, { path: '/' });
        navigate('/home');
        window.location.reload(false);

        
    };

    return (
        <Container>
            <div style={{ paddingTop : "8vh" }}>
                <Container style={{ width : "50%", boxShadow : "20px 10px 8px 10px rgba(0, 0, 0, 0.2)", overflowY : "auto" }}>
                    <h1>Login</h1>
                    <br></br>
                    <Form onSubmit={submit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={e => setEmail(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Container>
            </div>
        </Container>
    );
}

export default Login;