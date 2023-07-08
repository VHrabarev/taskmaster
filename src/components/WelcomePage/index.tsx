import { Box, Typography, Button } from '@mui/material';
import React from "react";
import { useAppDispatch } from '../../hook';
import { userLogout } from '../../store/reducers/userReducer';

const WelcomePage: React.FC = function() {
    const dispatch = useAppDispatch();

    return (
        <Box component="section">
            <Typography component="h2" variant='h4'>Welcome Page</Typography>
            <Button onClick={() => dispatch(userLogout())}>userLogout</Button>
        </Box>
    );
};

export default WelcomePage;