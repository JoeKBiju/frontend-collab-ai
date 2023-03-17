import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import { useCookies } from 'react-cookie';

function Home() {
    const [rooms, setRooms] = useState();
    const [user, setUser] = useState('');
    const [userId, setUserId] = useState();
    const [email, setEmail] = useState('');

    const [cookies] = useCookies(['token']);

    const navigate = useNavigate();
    
    useEffect(() => {
        //Gets list of rooms
        const fetchData = async () => {
            const response = await fetch('http://64.226.76.70/api/chat/rooms')
                .then(response => response.json());
            

            let list = [];
            for (let i = 0; i < response.length; i++) {
                list.push([response[i].name, response[i].slug, response[i].admin]);
            };

            setRooms(list);
        };

        // Gets user form cookie
        const getUser = async () => {
            const response = await fetch('http://64.226.76.70/api/auth/user-details', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    'token': cookies.token
                })
            }).then(response => response.json());

            setUser(response.name);
            setUserId(response.id);
            setEmail(response.email);
        };

        getUser();
        fetchData();
    }, []);

    const onClick = (event, slug, admin, name) => {
        navigate('/room', {state:{slug: slug, name: user, admin: admin, roomName: name, email: email, id: userId}});
        console.log(admin)
    };
    
    const onClickCreateRoom = () => {
        navigate('/create-room', {state:{user_id: userId}})
    };

    return(
        <Container fluid style={{ height : "100%" }}>
            <br></br>
            <Container>
                <Row xs={1}>
                    <Card onClick={onClickCreateRoom} style={{ cursor: "pointer" }}>
                        <Card.Body> Create A Room</Card.Body>
                    </Card>
                </Row>
            </Container>
            <br></br>
            {rooms?.map(([name, slug, admin]) => (
                <Container>
                    <Row>
                        <Card onClick={event => onClick(event, slug, admin, name)} style={{ cursor: "pointer" }} key={slug}>
                            <Card.Body>{name}</Card.Body>
                        </Card>
                    </Row>
                    <br></br>
                </Container>
            ))}
        </Container>
    );
};

export default Home;