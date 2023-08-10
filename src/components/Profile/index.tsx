import { Box, Typography, Tabs, Tab, Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import React, { useState, SyntheticEvent } from "react";
import { visuallyHidden } from '@mui/utils';
import TabPanelNewTask from './TabsPanel/TabPanelNewTask';
import TabPanelCalender from './TabsPanel/TabPanelCalendar';
import TabPanelProfileSetting from './TabsPanel/TabPanelProfileSetting';
import { useAppDispatch } from '../../hook';
import { userLogout } from '../../store/reducers/userReducer';

const Profile: React.FC = function() {
    const [value, setValue] = useState(0);
    const dispatch = useAppDispatch();

    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const showTabPanel = function(index: number) {
        switch (index) {
            case 0: return <TabPanelNewTask />;
            case 1: return <TabPanelCalender />;
            default: return <TabPanelProfileSetting />;
        };
    };

    return (
        <Box component="section" sx={{ display: "flex", flexWrap: "nowrap" }}>
            <Typography component="h2" sx={visuallyHidden}>Profile</Typography>
            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", minWidth: 170, textAlign: "center" , mr: 3, p: "20px 0", backgroundColor: "#fff", borderRadius: 3, boxShadow: "0 0 5px #7b7171" }}>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs menu"
                    sx={{ mb: 2 }}
                >
                    <Tab icon={<NoteAddIcon />} label="New task" />
                    <Tab icon={<CalendarMonthIcon />} label="Calendar" />
                    <Tab icon={<AccountBoxIcon />} label="Profile setting" />
                </Tabs>
                <Button startIcon={<LogoutIcon />} onClick={() => dispatch(userLogout())}>Log out</Button>
            </Box>
            <Box sx={{ flexGrow: 1, backgroundColor: "#fff", borderRadius: 3, boxShadow: "0 0 5px #7b7171" }}>
                {showTabPanel(value)}
            </Box>
        </Box>
    );
};

export default Profile;