import { AppBar, Container, Toolbar, Typography } from '@mui/material';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { Link } from 'react-router-dom';

const Header = function() {
    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Link to="/" style={{ display: "flex", alignItems: "center", color: "inherit", textDecoration: "none" }}>
                        <ReceiptLongIcon sx={{ mr: 1 }} />
                        <Typography 
                            variant='h6'
                            noWrap
                            children="Taskmaster"
                        />
                    </Link>
                    <Link to="/profile">
                        <Typography>profile</Typography>
                    </Link>
                    <Link to="/registration">
                        <Typography>registration</Typography>
                    </Link>
                    <Link to="/login">
                        <Typography>login</Typography>
                    </Link>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;