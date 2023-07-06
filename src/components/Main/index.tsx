import { Container, Box, Typography } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { Routes, Route } from 'react-router-dom';
import WelcomePage from '../WelcomePage';
import Profile from '../Profile';
import Registration from '../Registration';
import Login from '../Login';

const Main = function() {
    return (
        <Container maxWidth="md" component="main" sx={{ pt: 4 }}>
            <Box component="section">
                <Typography component="h1" sx={visuallyHidden}>Taskmaster</Typography>
                <Routes>
                    <Route index element={<WelcomePage />} />
                    <Route path='profile' element={<Profile />} />
                    <Route path='registration' element={<Registration />} />
                    <Route path='login' element={<Login />} />
                </Routes>
            </Box>
        </Container>
    );
};

export default Main;