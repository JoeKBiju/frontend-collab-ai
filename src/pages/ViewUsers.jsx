import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';

function ViewUsers() {
    const [users, setUsers] = useState([]);
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState('');
    const [update, setUpdate] = useState(false);

    const handleClose = () => setShow(false);

    const navigate = useNavigate();

    const location = useLocation();
    const room = location.state.slug;

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://64.226.76.70:8000/api/chat/room-users', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    room
                })
            })
            .then(response => response.json())

            let list = []
            for (let i=0; i< response.length; i++) {
                const sentiment = 'N/A'
                if (response[i].sentiment == 'dummy') {
                    list.push([response[i].id, response[i].name, response[i].email, sentiment]);
                } else {
                    list.push([response[i].id, response[i].name, response[i].email, response[i].sentiment]);
                }
                
            };

            setUsers(list);
        }

        fetchData();
    }, [room, update]);

    const handleAddUserClick = async (e) => {
        e.preventDefault();
        const response = await fetch('http://64.226.76.70:8000/api/chat/add-users', {
            method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    room,
                    email
                })
        })
        .then(response => response.json());

        if (response.status == 200) {
            setUsers([...users, [response.id, response.name, response.email, response.sentiment]])
        }
        setUpdate(!update);
        setShow(false);
        setEmail('');
    };

    return (
        <>
        <br></br>
        <Container>
            <Container fluid>
                <Row>
                    <Col sm={8}>
                        <h1>Users</h1>
                    </Col>
                    <Col sm={2}>
                        <Button variant="primary" type="submit" onClick={() => setShow(true)}>
                            Add User
                        </Button>
                    </Col>
                    <Col sm={2}>
                        <Button variant="primary" type="submit" onClick={() => navigate(-1)}>
                            Back
                        </Button>
                    </Col>
                </Row>
            </Container>
            <br></br>
            <br></br>
            <Container>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Sentiment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map(([id, name, email, sentiment], index) => (
                        <tr>
                            <td>{index+1}</td>
                            <td>{name}</td>
                            <td>{email}</td>
                            <td>{sentiment}</td>
                        </tr>
                        ))}
                    </tbody>
                </Table>
                <br></br>
            </Container>
        </Container>

        <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header>
                <Modal.Title>Enter user's email</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleAddUserClick}>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={e => setEmail(e.target.value)} />
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

export default ViewUsers;
