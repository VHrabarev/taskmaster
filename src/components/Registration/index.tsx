import { Box, Typography, TextField, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Checkbox, Button, Divider } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { visuallyHidden } from '@mui/utils';
import React, { FormEvent, useState, MouseEvent, useRef } from "react";
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hook';
import { userCreate } from '../../store/reducers/userReducer';

const Registration: React.FC = function() {
    const [showPassword, setShowPassword] = useState(false);
    const fullName = useRef<HTMLInputElement>();
    const email = useRef<HTMLInputElement>();
    const password = useRef<HTMLInputElement>();
    const dispatch = useAppDispatch();

    const onSubmitForm = function(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if(email.current?.value && password.current?.value) {
            dispatch(userCreate({email: email.current?.value, password: password.current?.value}));
        } else {
            console.log("Нету данных");
        };
    };

    const handleClickShowPassword = function() {
        setShowPassword((show) => !show)
    };

    const handleMouseDownPassword = function(event: MouseEvent<HTMLButtonElement>) {
      event.preventDefault();
    };

    const privacyPolicyOnClick = function() {
        
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
            <Typography component="h2" sx={visuallyHidden}>Registration</Typography>
            <Box
                component="form"
                onSubmit={onSubmitForm}
                sx={{ display: "flex", flexDirection: "column", textAlign: "center", maxWidth: 350, margin: "0 auto" }}
            >
                <Typography component="h3" variant='h4' sx={{ mb: 2 }}>Create your account</Typography>
                <TextField label="Full Name" variant="outlined" sx={{ mb: 2 }} inputRef={fullName} />
                <TextField label="Email Address" variant="outlined" sx={{ mb: 2 }} inputRef={email} type='email' />
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
                <Box sx={{ display: "flex", textAlign: "left", alignItems: "flex-start", mb: 2 }}>
                    <Checkbox sx={{ mr: 1 }} />
                    <Typography variant='body2'>
                        I have read & agreed to Taskmaster
                        <a onClick={privacyPolicyOnClick} style={{ color: "#1976d2", textDecoration: "none", cursor: "pointer" }} className='opacityDimly'> Privacy Policy, Terms & Condition</a>
                    </Typography>
                </Box>
                <Button variant="contained" type="submit" sx={{ mb: 2 }}>Sign Up</Button>
                <Divider role="presentation" sx={{ mb: 2 }}>
                    <Typography sx={{ opacity: 0.6 }}>Or continue with</Typography>
                </Divider>
                <Button variant="outlined" sx={{ mb: 2 }}>Google</Button>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Typography variant='body2' sx={{ opacity: 0.6, mr: 1 }}>Already have an account?</Typography>
                    <Link to="/login" style={{ color: "#1976d2", textDecoration: "none" }}>
                        <Typography variant='body2' className='opacityDimly'>Log In</Typography>
                    </Link>
                </Box>
            </Box>
        </Box>
    );
};

export default Registration;