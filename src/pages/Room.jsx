import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import useWebSocket from 'react-use-websocket';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';

function Room() {
    const [messageHistory, setMessageHistory] = useState([]);
    const [message, setMessage] = useState('');
    const [show, setShow] = useState(false);
    const [text, setText] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const handleClose = () => setShow(false);

    const navigate = useNavigate();

    const location = useLocation();
    const room = location.state.slug;
    const name = location.state.name;
    const roomName = location.state.roomName;
    const email = location.state.email;
    const userId = location.state.id;
    const admin = location.state.admin;

    
    //Starts websocket
    const { sendJsonMessage, lastJsonMessage } = useWebSocket('ws://64.226.76.70:8000/ws/' + room + '/', {
        onOpen: () => console.log('Websocket Connection Established'),
        onClose: () => console.log('Websocket Connection Terminated'),
    });

    // Sends message through websocket
    const submit = (e) => {
        e.preventDefault();
        const messageObject = { username: name, message, room: room };
        sendJsonMessage(messageObject);
        setMessage('');
    };
    
    // Recieves message from websocket
    useEffect(() => {
        if (lastJsonMessage) {
            setMessageHistory(prevState => [...prevState, [lastJsonMessage.username, lastJsonMessage.message, lastJsonMessage.room]]);
        }
    }, [lastJsonMessage, setMessageHistory])

    

    useEffect(() => {
        // Gets stored messages
        const fetchData = async () => {
            const response = await fetch('http://64.226.76.70:8000/api/chat/get-messages', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    room
                })
            })
            .then(response => response.json())

            let list = [];
            for (let i = 0; i < response.length; i++) {
                list.push([response[i].author, response[i].content, response[i].timestamp]);
            };

            setMessageHistory(list);
        };

        fetchData();

        if (admin === userId) {
            setIsAdmin(true);
        }
    }, [room]);

    const handleViewUserClick = () => {
        navigate('/room/view-users', {state:{slug: room}})
    };

    const handleSubmitReviewClick = async (e) => {
        e.preventDefault();
        handleClick();
        
        await fetch('http://64.226.76.70:8000/api/sentiment/', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email,
                'slug': room,
                'message': text
            })
        });

        setLoading(false);
        
        setShow(false);
        setText('');
    };

    const handleClick = () => setLoading(true);

    return (
        <>
        <Container fluid style={{ height : "100%" }}>
            <br></br>
            <Container fluid>
                <Row>
                    <Col sm={10}>
                        <h1>{roomName}</h1>
                    </Col>
                    {isAdmin ?
                    <>
                        <Col sm={1}>
                            <Button variant="primary" type="submit" onClick={handleViewUserClick}>
                                View Users
                            </Button>
                        </Col>
                        
                        <Col sm={1}>
                            <Button variant="primary" type="submit" onClick={() => navigate(-1)}>
                                Back
                            </Button>
                        </Col>
                    </>
                    :
                    <>
                        <Col sm={2}>
                            <Button variant="primary" type="submit" onClick={() => navigate(-1)}>
                                Back
                            </Button>
                        </Col>
                    </>
                    }
                </Row>
            </Container>
            <br></br>
            <Container style={{ height : "70vh", boxShadow : "0 4px 8px 0 rgba(0, 0, 0, 0.2)", overflowY : "auto" }}>
                {messageHistory?.map((msg, index) => (
                    <div key={index}>
                        <p>{msg[0]}: {msg[1]}</p>
                    </div>
                ))}
            </Container>
            <br></br>
            <Container>
                <Form onSubmit={submit}>
                    <Row>
                        <Col sm={10}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Control as="textarea" rows={1} placeholder="Message" value={message} onChange={e => setMessage(e.target.value)} />
                            </Form.Group>
                        </Col>
                        <Col sm={2}>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
            <Container>
                <Row>
                    <Col></Col>
                    <Col sm={2}>
                        <Button variant="primary" type="submit" onClick={() => setShow(true)}>
                            Submit Review
                        </Button>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        </Container>

        <Modal show={show} onHide={handleClose} animation={false} centered>
            <Modal.Header>
                <Modal.Title>Enter you meeting review:</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmitReviewClick}>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control as="textarea" rows={7} placeholder="Type here..." value={text} onChange={e => setText(e.target.value)} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button 
                    variant="primary"
                    type="submit"
                    disabled={isLoading}
                    >
                        {isLoading ? 'Submitting…' : 'Submit'}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
        </>
    )
}

export default Room;