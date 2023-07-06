import { Box, Typography, TextField, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import React, { FormEvent } from 'react';
import { Link } from 'react-router-dom';

const Login: React.FC = function() {
    const [showPassword, setShowPassword] = React.useState(false);

    const onSubmitForm = function(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    };

    const passwordEndAdornment = (
        <InputAdornment position="end">
            <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
            >
                {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
        </InputAdornment>
    );

    return (
        <Box component="section">
            <Typography component="h2" sx={visuallyHidden}>Login</Typography>
            <Box 
                component="form"
                onSubmit={onSubmitForm}
                sx={{ display: "flex", flexDirection: "column", textAlign: "center", maxWidth: 350, margin: "0 auto" }}
            >
                <Typography component="h3" variant='h4' sx={{ mb: 2 }}>Welcome Back!</Typography>
                <TextField label="Login" variant="outlined" sx={{ mb: 2 }} />
                <FormControl variant="outlined" sx={{ mb: 1 }}>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <OutlinedInput
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={passwordEndAdornment}
                        label="Password"
                    />
                </FormControl>
                <Link to='forgot-password' style={{ color: "inherit", textDecoration: "none" }}>
                    <Typography>Forgot Password?</Typography>
                </Link>
            </Box>
        </Box>
    );
};

export default Login;