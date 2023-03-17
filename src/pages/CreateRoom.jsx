import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useLocation, useNavigate } from 'react-router-dom';

function CreateRoom() {
    const [roomName, setRoomName] = useState('');

    const location = useLocation();
    const user_id = location.state.user_id;

    const navigate = useNavigate();
    
    const onSubmit = async (e) => {
        e.preventDefault();

        await fetch('http://64.226.76.70/api/chat/create-room', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: roomName,
                slug: roomName,
                admin: user_id,
            })
        });

        navigate('/home')
        
    };

    return (
        <Container>
            <h1>Create Room</h1>
            <br/>
            <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Room Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter room name" onChange={e => setRoomName(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    );
};

export default CreateRoom;