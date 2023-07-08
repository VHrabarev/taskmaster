import { Box, Typography, Tabs, Tab } from '@mui/material';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import React, { useState, SyntheticEvent } from "react";
import { visuallyHidden } from '@mui/utils';
import TabPanelNewTask from './TabsPanel/TabPanelNewTask';
import TabPanelCalender from './TabsPanel/TabPanelCalendar';
import TabPanelProfileSetting from './TabsPanel/TabPanelProfileSetting';

const Profile: React.FC = function() {
    const [value, setValue] = useState(0);

    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box component="section" sx={{ display: "flex", flexWrap: "nowrap" }}>
            <Typography component="h2" sx={visuallyHidden}>Profile</Typography>
            <Box sx={{ mr: 2 }}>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs menu"
                >
                    <Tab icon={<NoteAddIcon />} label="New task" />
                    <Tab icon={<CalendarMonthIcon />} label="Calendar" />
                    <Tab icon={<AccountBoxIcon />} label="Profile setting" />
                </Tabs>
            </Box>
            <Box>
                <TabPanelNewTask value={value} index={0} />
                <TabPanelCalender value={value} index={1} />
                <TabPanelProfileSetting value={value} index={2} />
            </Box>
        </Box>
    );
};

export default Profile;