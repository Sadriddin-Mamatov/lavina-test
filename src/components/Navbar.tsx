
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Kitob Boshqaruvi
                </Typography>
                <Button color="inherit" component={Link} to="/signup">
                    Ro'yxatdan o'tish
                </Button>
                <Button color="inherit" component={Link} to="/">
                    Bosh sahifa
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
