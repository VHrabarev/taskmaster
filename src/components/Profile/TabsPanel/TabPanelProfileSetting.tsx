import { Box, Typography } from "@mui/material";

interface TabPanelProfileSettingProps {
    value: number,
    index: number
};

const TabPanelProfileSetting: React.FC<TabPanelProfileSettingProps> = function(props) {
    const {value, index} = props;

    return (
        <Box component="section" hidden={value !== index}>
            <Typography component="h3">Profile setting</Typography>
        </Box>
    );
};

export default TabPanelProfileSetting;