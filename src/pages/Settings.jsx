import React, { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Settings() {
    const [showName, setShowName] = useState(false);
    const [showEmail, setShowEmail] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] =useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleNameClose = () => setShowName(false);
    const handleEmailClose = () => setShowEmail(false);
    const handlePasswordClose = () => setShowPassword(false);

    const navigate = useNavigate();
    const location = useLocation();

    const id = location.state.id;

    const handleChangeName = () => {
        setShowName(true);
    }

    const handleChangeEmail = () => {
        setShowEmail(true);
    }

    const handleChangePassword = () => {
        console.log('Password Changed')
        setShowPassword(true)
    }

    const handleSubmitNameClick = async (e) => {
        e.preventDefault();

        await fetch('http://64.226.76.70:8000/api/auth/change-name', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id,
                name
            }) 
        })

        setName('');
        setShowName(false);
    }

    const handleSubmitEmailClick = async (e) => {
        e.preventDefault();

        await fetch('http://64.226.76.70:8000/api/auth/change-email', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id,
                email
            }) 
        })

        setEmail('');
        setShowEmail(false);
    }

    const handleSubmitPasswordClick = async (e) => {
        e.preventDefault();

        if (password === confirmPassword) {
            await fetch('http://64.226.76.70:8000/api/auth/change-email', {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    id,
                    email
                }) 
            })
        }
        
        setPassword('');
        setConfirmPassword('');
        setShowPassword(false)
    }

    return (
        <>
        <Container fluid style={{ height : "100%" }}>
            <Container>
                <br></br>
                <Container>
                    <Row>
                        <Col sm={10}>
                            <h1>Settings</h1>
                        </Col>
                        <Col sm={2}>
                            <Button variant="primary" type="submit" onClick={() => navigate(-1)}>
                                Back
                            </Button>
                        </Col>
                    </Row>
                </Container>
                <br></br>
                <Container style={{ width : "60%" }}>
                    <ListGroup defaultActiveKey="#link1">
                        <ListGroup.Item action onClick={handleChangeName}>
                            Change Name
                        </ListGroup.Item>
                        <ListGroup.Item action onClick={handleChangeEmail}>
                            Change Email
                        </ListGroup.Item>
                        <ListGroup.Item action onClick={handleChangePassword}>
                            Reset Password
                        </ListGroup.Item>
                    </ListGroup>
                </Container>
            </Container>
        </Container>

        <Modal show={showName} onHide={handleNameClose} animation={true} centered>
            <Modal.Header>
                <Modal.Title>Enter New Name:</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmitNameClick}>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Control type="text" placeholder="Type here..." value={name} onChange={e => setName(e.target.value)} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>

        <Modal show={showPassword} onHide={handlePasswordClose} animation={true} centered>
            <Modal.Header>
                <Modal.Title>Reset Password:</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmitPasswordClick}>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Label>New Password:</Form.Label>
                        <Form.Control type="password" placeholder="Type here..." value={password} onChange={e => setPassword(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Label>Confirm Password:</Form.Label>
                        <Form.Control type="password" placeholder="Type here..." value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>

        <Modal show={showEmail} onHide={handleEmailClose} animation={true} centered>
            <Modal.Header>
                <Modal.Title>Enter New Email:</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmitEmailClick}>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="email" placeholder="Type here..." value={email} onChange={e => setEmail(e.target.value)} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
        </>
    )
}

export default Settings;