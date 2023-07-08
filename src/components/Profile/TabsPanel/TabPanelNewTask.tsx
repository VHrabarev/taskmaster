import { Box, Typography } from "@mui/material";

interface TabPanelNewTaskProps {
    value: number,
    index: number
};

const TabPanelNewTask: React.FC<TabPanelNewTaskProps> = function(props) {
    const {value, index} = props;

    return (
        <Box component="section" hidden={value !== index}>
            <Typography component="h3">New task</Typography>
        </Box>
    );
};

export default TabPanelNewTask;