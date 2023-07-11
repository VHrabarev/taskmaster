import { Box, Typography, Tabs, Tab, Divider, Avatar, TextField, Grid, Button } from "@mui/material";
import { visuallyHidden } from '@mui/utils';
import React, { useState, SyntheticEvent, FormEvent } from "react";

interface TabPanelProfileSettingProps {
    value: number,
    index: number
};

const TabPanelProfileSetting: React.FC<TabPanelProfileSettingProps> = function(props) {
    const {value, index} = props;
    const [profileValue, setProfileValue] = useState(0);

    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setProfileValue(newValue);
      };

    const onSubmitUserInfoForm = function(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
    };

    return (
        <Box component="section" hidden={value !== index}>
            <Typography component="h3" sx={visuallyHidden}>Profile setting</Typography>
            <Tabs value={profileValue} onChange={handleChange} aria-label="Profile tabs" sx={{ mb: 2 }}>
                <Tab label="Account  Setting" />
                <Tab label="Login & Security" />
                <Tab label="Notifications" />
            </Tabs>
            <Box hidden={profileValue !== 0}>
                <Box sx={{ m: "0 20px 20px" }}>
                    <Typography variant="subtitle2" mb={1}>Your Profile  Picture</Typography>
                    <Avatar 
                        alt="User avatar"
                        src=""
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
                            <TextField label="Full Name" sx={{ width: "100%"}} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="Email" sx={{ width: "100%"}} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField label="Phone Number" sx={{ width: "100%"}} />
                        </Grid>
                    </Grid>
                    <Box>
                        <Button variant="contained" sx={{ mr: 2 }}>Update Profile</Button>
                        <Button variant="text">Reset</Button>
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