import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Room from './pages/Room';
import CreateRoom from './pages/CreateRoom';
import ViewUsers from './pages/ViewUsers';
import Settings from './pages/Settings';

function App() {
    return (

            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route path='/' exact element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/home' element={<Home />} />
                    <Route path='/room' element={<Room />} />
                    <Route path='/create-room' element={<CreateRoom />} />
                    <Route path='/room/view-users' element={<ViewUsers />} />
                    <Route path='/settings' element={<Settings />} />
                </Routes>
            </BrowserRouter>

    )
}

export default App;