import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    Button,
    Input,
    ListItemButton,
    ListItem,
    ListDivider,
    List,
    Box
} from "@mui/joy";

import { logOutAction } from "../../auth/store/sliceReducer";
import { Logo } from "../logo/Logo";
import "./nav.css";


const Divider = () => <ListDivider sx={{ margin: 0 }} />;

export const Nav = () => {
    // TODO: if user is logged in, do not show the "Sign In" button.
    // show user name and "log out" button instead.
    const dispatch = useDispatch();
    const state = useSelector((state) => state.auth);

    const isAdmin = state.isAdmin;
    const isLoggedIn = state.isLoggedIn;

    const logOut = () => {
        dispatch(logOutAction());
    };

    const onSearch = () => {};

    return (
        <Box
            component="nav"
            sx={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px" }}
        >
            <List role="menubar" orientation="horizontal">
                <ListItem>
                    <Logo />
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemButton>
                        <Link to={"/"}>Home</Link>
                    </ListItemButton>
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemButton>
                        <Link to={"/aboutUs"}>About Us</Link>
                    </ListItemButton>
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemButton>
                        <Link to={"/contactUs"}>Contact Us</Link>
                    </ListItemButton>
                </ListItem>
                {!isLoggedIn ? (
                    <>
                        <Divider />
                        <ListItem>
                            <ListItemButton>
                                <Link to={"/signUp"}>Sign Up</Link>
                            </ListItemButton>
                        </ListItem>
                    </>
                ) : null}
                <Divider />
                <ListItem>
                    <ListItemButton>
                        {!isLoggedIn ? (
                            <Link to={"/signIn"}>Sign In</Link>
                        ) : (
                            <Link to={"/"} onClick={logOut}>
                                Log out
                            </Link>
                        )}
                    </ListItemButton>
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemButton>
                        <Link to={"/shoppingCart"}>Shopping Cart</Link>
                    </ListItemButton>
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemButton>
                        <Link to={"/ToS"}>Types of Services</Link>
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton>
                        <Link to={"/shoppingCart/checkout"}>Checkout</Link>
                    </ListItemButton>
                </ListItem>
                {isLoggedIn && isAdmin ? (
                    <>
                        <Divider />
                        <ListItem>
                            <ListItemButton>
                                <Link to={"/DBM"}>DB Maintain</Link>
                            </ListItemButton>
                        </ListItem>
                    </>
                ) : null}
                {isLoggedIn ? (
                    <>
                        <Divider />
                        <ListItem>
                            <Input
                                endDecorator={
                                    <Button
                                        variant="solid"
                                        color="primary"
                                        sx={{
                                            borderTopLeftRadius: 0,
                                            borderBottomLeftRadius: 0,
                                        }}
                                        onClick={() => onSearch()}
                                    >
                                        Search
                                    </Button>
                                }
                            />
                        </ListItem>
                    </>
                ) : null}
            </List>
        </Box>
    );
};
