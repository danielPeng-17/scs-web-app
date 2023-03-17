import { Link } from "react-router-dom";
import * as React from 'react';
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListDivider from '@mui/joy/ListDivider';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';

import './nav.css';

const Divider = () => <ListDivider sx={{ margin: 0 }} />

export const Nav = () => {

    
    return (
        <Box component="nav" sx={{ boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px'}}>
            <List role="menubar" orientation="horizontal">
                <ListItem>
                    <ListItemButton>
                        <Link to={'/'}>Home</Link>
                    </ListItemButton>
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemButton>
                        <Link to={'/aboutUs'}>About Us</Link>
                    </ListItemButton>
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemButton>
                        <Link to={'/contactUs'}>Contact Us</Link>
                    </ListItemButton>
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemButton>
                        <Link to={'/signUp'}>Sign Up</Link>
                    </ListItemButton>
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemButton>
                        <Link to={'/signIn'}>Sign In</Link>
                    </ListItemButton>
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemButton>
                        <Link to={'/shoppingCart'}>Shopping Cart</Link>
                    </ListItemButton>
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemButton>
                        <Link to={'/shoppingCart/checkout'}>Checkout</Link>
                    </ListItemButton>
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemButton>
                        <Link to={'/ToS'}>Types of Services</Link>
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );
}