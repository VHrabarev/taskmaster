import { Container, Box, Typography } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { Routes, Route } from 'react-router-dom';
import React from "react";
import { useAppSelector } from "../../hook";
import WelcomePage from '../WelcomePage';
import Profile from '../Profile';
import Registration from '../Registration';
import Login from '../Login';
import ProtectedRoute from '../ProtectedRoute';

const Main: React.FC = function() {
    const { loginStatus } = useAppSelector(store => store.user.userInfo );

    return (
        <Container maxWidth="md" component="main" sx={{ pt: 4 }}>
            <Box component="section">
                <Typography component="h1" sx={visuallyHidden}>Taskmaster</Typography>
                <Routes>
                    <Route index element={<WelcomePage />} />
                    <Route path='profile' element={
                        <ProtectedRoute isAllowed={loginStatus} redirectPath='/login' component={<Profile />} />
                    }/>
                    <Route path='registration' element={
                        <ProtectedRoute isAllowed={!loginStatus} redirectPath='/profile' component={<Registration />} />
                    }/>
                    <Route path='login' element={
                        <ProtectedRoute isAllowed={!loginStatus} redirectPath='/profile' component={<Login />} />
                    }/>
                    <Route path='*' element={<p>There's nothing here: 404!</p>} />
                </Routes>
            </Box>
        </Container>
    );
};

export default Main;