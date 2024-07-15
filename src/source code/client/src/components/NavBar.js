
import React from 'react';
import { AppBar, Box, Container, IconButton, Toolbar, Typography} from "@mui/material";
import {Menu } from "@mui/icons-material";

const NavBar = () => {
    return (
        <AppBar position="static">
            <Container maxWidth='lg'>
                <Toolbar disableGutters>
                    <Box sx={{mr:1}}>
                        <IconButton size='large' color='inherit'>
                            <Menu/>
                        </IconButton>
                    </Box>
                    <Typography
                        variant='h6'
                        component='h1'
                        noWrap
                        sx={{flexGrow:1, display:{xs: 'none', md: 'flex'}}}
                    >
                        test
                    </Typography>
                    <Typography
                        variant='h6'
                        component='h1'
                        noWrap
                        sx={{flexGrow:1, display:{xs: 'flex', md: 'none'}}}
                    >
                        YAW
                    </Typography>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default NavBar;