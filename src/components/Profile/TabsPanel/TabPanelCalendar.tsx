import { Box, Typography } from "@mui/material";

interface TabPanelCalenderProps {
    value: number,
    index: number
};

const TabPanelCalender: React.FC<TabPanelCalenderProps> = function(props) {
    const {value, index} = props;

    return (
        <Box component="section" hidden={value !== index}>
            <Typography component="h3">Calendar</Typography>
        </Box>
    );
};

export default TabPanelCalender;