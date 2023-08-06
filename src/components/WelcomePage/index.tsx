import { Box, Typography } from '@mui/material';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { Link } from 'react-router-dom';
import React from "react";

const WelcomePage: React.FC = function() {

    return (
        <Box component="section" sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <ReceiptLongIcon sx={{ width: 150, height: 150, mb: 5 }}/>
            <Typography component="h2" variant='h3' sx={{ maxWidth: 420, textAlign: "center", color: "#303030"}}>
                Manage your Task with <Link to="/profile" style={{ textDecoration: "none", color: "#1976d2" }} className='opacityDimly'>Taskmaster</Link>
            </Typography>
        </Box>
    );
};

export default WelcomePage;