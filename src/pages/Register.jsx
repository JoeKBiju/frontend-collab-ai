import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [redirect, setRedirect] = useState(true);

    const handleClose = () => setShowModal(false);
    const navigate = useNavigate();

    //After submit button is pressed
    const submit = async (e) => {
        e.preventDefault();

        //Checks both passwords match
        if (password === rePassword) {
            const response = await fetch('http://64.226.76.70/api/auth/register', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    name,
                    email,
                    password,
                })
            })
            .then(response => {
                if(response.status !== 200) {
                    setRedirect(false);
                    console.log("Error: Email already exists");
                    console.log(response);
                }
            })

            if(!redirect){
                navigate('/');
            }

        } else {
            setShowModal(true);
        }
    };

    return (
        <>
            <Container fluid style={{ height : "100%" }}>
                <div style={{ paddingTop : "8vh" }}>
                <Container style={{ width : "50%", boxShadow : "20px 10px 8px 10px rgba(0, 0, 0, 0.2)", overflowY : "auto" }}>
                    <h1>Registration</h1>
                    <br></br>
                    <Form onSubmit={submit}>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter name" onChange={e => setName(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={e => setEmail(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" placeholder="Re-enter Password" onChange={e => setRePassword(e.target.value)} />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                    <br></br>
                </Container>
                </div>
            </Container>
            <br></br>
            {redirect ? <></> : 
                <Alert key="error" variant="danger">
                    Email Already Exists
                </Alert>
            }

            <Modal
                show={showModal}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Body>Entered passwords do not match.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Register;