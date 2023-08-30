import { Box, Typography, TextField, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Checkbox, Button, Divider, FormHelperText, Backdrop } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { visuallyHidden } from '@mui/utils';
import React, { FormEvent, useState, MouseEvent, useRef } from "react";
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hook';
import { userCreate, userCreateWithGoogle } from '../../store/reducers/userReducer';

const Registration: React.FC = function() {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [error, setError] = useState({email: false, password: false, privacyPolicy: false});
    const [checked, setChecked] = useState<boolean>(false);
    const [privacyPolicyOpen, setPrivacyPolicyOpen] = useState<boolean>(false);
    const email = useRef<HTMLInputElement>();
    const password = useRef<HTMLInputElement>();
    const dispatch = useAppDispatch();

    const onSubmitForm = function(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if(email.current?.value && password.current?.value && checked) {
            dispatch(userCreate({email: email.current?.value, password: password.current?.value}));
            setError({email: false, password: false, privacyPolicy: false});
        } else {
            setError({email: !email.current?.value, password: !password.current?.value, privacyPolicy: !checked,});
        };
    };

    const handleMouseDownPassword = function(event: MouseEvent<HTMLButtonElement>) {
      event.preventDefault();
    };

    const passwordEndAdornment = (
        <InputAdornment position="end">
            <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword((show) => !show)}
                onMouseDown={handleMouseDownPassword}
                edge="end"
            >
                {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
        </InputAdornment>
    );

    return (
        <Box component="section" sx={{textAlign: "center", maxWidth: 350, margin: "0 auto", padding: "20px 40px", backgroundColor: "#fff", borderRadius: 3, boxShadow: "0 0 5px #7b7171"}}>
            <Typography component="h2" sx={visuallyHidden}>Registration</Typography>
            <Box
                component="form"
                onSubmit={onSubmitForm}
                sx={{display: "flex", flexDirection: "column"}}
            >
                <Typography component="h3" variant='h4' sx={{mb: 2}}>Create your account</Typography>
                <TextField
                    label="Email Address"
                    variant="outlined"
                    sx={{mb: 2}}
                    inputRef={email}
                    type='email'
                    error={error.email}
                    helperText={error.email ? "The field must not be empty" : ""}
                />
                <FormControl variant="outlined" sx={{mb: 1}}>
                    <InputLabel htmlFor="password" sx={{color: error.password ? "#d32f2f" : "#7b7171"}}>Password</InputLabel>
                    <OutlinedInput
                        id="password"
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={passwordEndAdornment}
                        inputRef={password}
                        error={error.password}
                    />
                    {error.password && <FormHelperText sx={{color: "#d32f2f"}}>The field must not be empty</FormHelperText>}
                </FormControl>
                <Box sx={{display: "flex", textAlign: "left", alignItems: "flex-start", mb: 2}}>
                    <Checkbox
                        checked={checked}
                        onChange={() => setChecked(!checked)}
                        sx={{mr: 1, color: error.privacyPolicy ? "#d32f2f" : ""}}
                    />
                    <Typography variant='body2'>
                        I have read & agreed to Taskmaster
                        <a onClick={() => setPrivacyPolicyOpen(!privacyPolicyOpen)} style={{color: "#1976d2", textDecoration: "none", cursor: "pointer"}} className='opacityDimly'> Privacy Policy, Terms & Condition</a>
                    </Typography>
                </Box>
                <Button variant="contained" type="submit" sx={{mb: 2}}>Sign Up</Button>
                <Divider role="presentation" sx={{mb: 2}}>
                    <Typography sx={{opacity: 0.6}}>Or continue with</Typography>
                </Divider>
                <Button variant="outlined" sx={{mb: 2}} onClick={() => dispatch(userCreateWithGoogle())}>Google</Button>
                <Box sx={{display: "flex", justifyContent: "center"}}>
                    <Typography variant='body2' sx={{opacity: 0.6, mr: 1}}>Already have an account?</Typography>
                    <Link to="/login" style={{color: "#1976d2", textDecoration: "none"}}>
                        <Typography variant='body2' className='opacityDimly'>Log In</Typography>
                    </Link>
                </Box>
            </Box>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={privacyPolicyOpen}
                onClick={() => setPrivacyPolicyOpen(!privacyPolicyOpen)}
            >
                <Box sx={{ width: 500, backgroundColor: "#fff", color: "#000", p: "20px 30px", borderRadius: 3, boxShadow: "0 0 5px #7b7171" }}>
                    <Typography component="h3" variant='h4' sx={{ mb: 2 }}>Privacy Policy</Typography>
                    <Typography variant='body2'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa cum recusandae, consequatur vero corrupti maiores molestiae amet, nemo sed distinctio, nulla alias dignissimos aperiam. Sapiente error in sit officiis perferendis.</Typography>
                </Box>
            </Backdrop>
        </Box>
    );
};

export default Registration;