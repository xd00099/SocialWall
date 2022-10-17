import React from "react";
import { Container } from '@material-ui/core';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import PostDetails from './components/PostDetails/PostDetails';
import Navbar from './components/Navbar/Navbar';
import Home from "./components/Home/Home";
import Auth from './components/Auth/Auth';
import CreatorOrTag from './components/CreatorOrTag/CreatorOrTag';
import { GoogleOAuthProvider } from '@react-oauth/google';


const App = () => {
    const user = JSON.parse(localStorage.getItem('profile'));
    return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}>
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<Navigate to="/auth" />} />
                <Route path="/posts" exact element={<>
                    <Navbar />
                    <Container maxWidth={false}>
                        <Home />
                    </Container>
                    </>} />
                <Route path="/posts/search" exact element={<>
                    <Navbar />
                    <Container maxWidth={false}>
                        <Home />
                    </Container>
                    </>} />
                <Route path="/posts/:id" exact element={<>
                    <Navbar />
                    <Container maxWidth={false}>
                        <PostDetails />
                    </Container>
                    </>} />
                <Route path='/creators/:name' exact element={<>
                    <Navbar />
                    <Container maxWidth={false}>
                        <CreatorOrTag />
                    </Container>
                    </>} />
                <Route path='/tags/:name' exact element={<>
                    <Navbar />
                    <Container maxWidth={false}>
                        <CreatorOrTag />
                    </Container>
                    </>} />
                <Route path="/auth" exact element={!user ? <Auth /> : <Navigate to="/posts"/>} />
            </Routes>
        </BrowserRouter>
    </GoogleOAuthProvider>
    )
};

export default App;