import { Box, Typography, TextField, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Button, Divider } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import React, { FormEvent, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hook';
import { userLogin } from '../../store/reducers/userReducer';

const Login: React.FC = function() {
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useAppDispatch();
    const email = useRef<HTMLInputElement>();
    const password = useRef<HTMLInputElement>();

    const onSubmitForm = function(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if(email.current?.value && password.current?.value) {
            dispatch(userLogin({email: email.current?.value, password: password.current?.value}));
        } else {
            console.log("Нет данных");
        };
    };

    const handleClickShowPassword = function() {
        setShowPassword((show) => !show)
    };

    const handleMouseDownPassword = function(event: React.MouseEvent<HTMLButtonElement>) {
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
        <Box component="section" sx={{ textAlign: "center", maxWidth: 350, margin: "0 auto", padding: "20px 40px", backgroundColor: "#fff", borderRadius: 3, boxShadow: "0 0 5px #7b7171" }}>
            <Typography component="h2" sx={visuallyHidden}>Login</Typography>
            <Box 
                component="form"
                onSubmit={onSubmitForm}
                sx={{ display: "flex", flexDirection: "column" }}
            >
                <Typography component="h3" variant='h4' sx={{ mb: 2 }}>Welcome Back!</Typography>
                <TextField label="Email" variant="outlined" sx={{ mb: 2 }} type='email' inputRef={email} autoFocus />
                <FormControl variant="outlined" sx={{ mb: 1 }}>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <OutlinedInput
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={passwordEndAdornment}
                        label="Password"
                        inputRef={password}
                    />
                </FormControl>
                <Link to="forgot-password" style={{ color: "inherit", textDecoration: "none", textAlign: "right", marginBottom: 20 }}>
                    <Typography className="opacityBrightly">Forgot Password?</Typography>
                </Link>
                <Button variant="contained" type="submit" sx={{ mb: 2 }}>Log In</Button>
                <Divider role="presentation" sx={{ mb: 2 }}>
                    <Typography sx={{ opacity: 0.6 }}>Or continue with</Typography>
                </Divider>
                <Button variant="outlined" sx={{ mb: 2 }}>Google</Button>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Typography variant='body2' sx={{ opacity: 0.6, mr: 1 }}>Don’t have an account?</Typography>
                    <Link to="/registration" style={{ color: "#1976d2", textDecoration: "none" }}>
                        <Typography variant='body2' className='opacityDimly'>Sign Up</Typography>
                    </Link>
                </Box>
            </Box>
        </Box>
    );
};

export default Login;