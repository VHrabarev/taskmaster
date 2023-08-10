import { Box, Typography } from "@mui/material";
import { LocalizationProvider, DateCalendar  }  from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const TabPanelCalender: React.FC = function() {

    return (
        <Box component="section" sx={{ display: "flex", pt: 2 }}>
            <Typography component="h3" hidden={true}>Calendar</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar sx={{ m: 0 }} />
            </LocalizationProvider>
            
        </Box>
    );
};

export default TabPanelCalender;