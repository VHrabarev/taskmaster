import { AppBar, Container, Toolbar, Typography, ButtonGroup, Button, Tooltip, Avatar, Box } from '@mui/material';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { Link } from 'react-router-dom';
import React from "react";
import { useAppSelector } from '../../hook';

const Header: React.FC = function() {
    const { loginStatus, avatarUrl, fullName } = useAppSelector( store => store.user.userInfo );

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Link to="/" style={{ display: "flex", alignItems: "center", color: "inherit", textDecoration: "none" }}>
                        <ReceiptLongIcon sx={{ mr: 1 }} />
                        <Typography 
                            variant='h6'
                            noWrap
                            children="Taskmaster"
                        />
                    </Link>
                    {!loginStatus ? 
                    <ButtonGroup variant="text" aria-label="login and register button">
                        <Link to="/registration" className='opacityDimly'>
                            <Button sx={{ color: "#fff" }}>Registration</Button>
                        </Link>
                        <Link to="/login" className='opacityDimly'>
                            <Button sx={{ color: "#fff" }}>Login</Button>
                        </Link>
                    </ButtonGroup> : 
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Tooltip title="Open Profile">
                            <Link to="/profile" style={{ textDecoration: "none", marginRight: 15 }}>
                                <Avatar alt="User avatar" src={avatarUrl ? avatarUrl : ""}>{fullName ? fullName[0] : "U"}</Avatar>
                            </Link>
                        </Tooltip>
                        <Box>
                            <Typography variant='body2' sx={{ opacity: 0.8 }}>Welcome Back!</Typography>
                            <Link to="/profile" style={{ textDecoration: "none", color: "inherit" }} className='opacityDimly'>
                                <Typography>{fullName ? fullName : "User"}</Typography>
                            </Link>
                        </Box>
                    </Box>}
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;