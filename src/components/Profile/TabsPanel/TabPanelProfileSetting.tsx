import { Box, Typography, Tabs, Tab, Divider, Avatar, TextField, Grid, Button } from "@mui/material";
import { visuallyHidden } from '@mui/utils';
import React, { useState, SyntheticEvent, FormEvent } from "react";
import { useAppSelector, useAppDispatch } from "../../../hook";
import { userUpdateProfile } from "../../../store/reducers/userReducer";

const TabPanelProfileSetting: React.FC = function() {
    const [profileValue, setProfileValue] = useState(0);
    const { userInfo } = useAppSelector(store => store.user);
    const [user, setUser] = useState(userInfo);
    const dispatch = useAppDispatch();

    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setProfileValue(newValue);
    };

    const onSubmitUserInfoForm = function(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        dispatch(userUpdateProfile(
            {
                fullName: user.fullName,
                email: user.email,
                avatarUrl: user.avatarUrl,
                loginStatus: user.loginStatus,
                userUID: user.userUID
            }
        ));
    };

    return (
        <Box component="section">
            <Typography component="h3" sx={visuallyHidden}>Profile setting</Typography>
            <Tabs value={profileValue} onChange={handleChange} aria-label="Profile tabs" sx={{ mb: 2 }}>
                <Tab label="Account Setting" />
                <Tab label="Login & Security" />
                <Tab label="Notifications" />
            </Tabs>
            <Box hidden={profileValue !== 0}>
                <Box sx={{ m: "0 20px 20px" }}>
                    <Typography variant="subtitle2" mb={1}>Your Profile  Picture</Typography>
                    <Avatar 
                        alt="User avatar"
                        src={user.avatarUrl ? user.avatarUrl : ""}
                        sx={{ width: 150, height: 150 }}
                        variant="rounded"
                    >
                        U
                    </Avatar>
                </Box>
                <Divider sx={{ mb: 2 }}/>
                <Box component="form" onSubmit={onSubmitUserInfoForm} sx={{ m: "0 20px 20px" }}>
                    <Grid container spacing={2} sx={{ mb: 2 }}>
                        <Grid item xs={6}>
                            <TextField 
                                label="Full Name"
                                value={user.fullName ? user.fullName : ""}
                                onChange={(e) => setUser({...user, fullName: e.target.value})}
                                sx={{ width: "100%"}}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Email"
                                value={user.email ? user.email : ""}
                                onChange={(e) => setUser({...user, email: e.target.value})}
                                sx={{ width: "100%"}}
                            />
                        </Grid>
                    </Grid>
                    <Box>
                        <Button variant="contained" sx={{ mr: 2 }} type="submit">Update Profile</Button>
                        <Button variant="text" onClick={() => setUser(userInfo)}>Reset</Button>
                    </Box>
                </Box>
            </Box>
            <Box hidden={profileValue !== 1}>
                <Typography>Login & Security</Typography>
            </Box>
            <Box hidden={profileValue !== 2}>
                <Typography>Notifications</Typography>
            </Box>
        </Box>
    );
};

export default TabPanelProfileSetting;