import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Button, Menu, MenuItem } from "@mui/joy";
import { Link } from "react-router-dom";
import { logOutAction } from "../../../auth/store/sliceReducer";

export const LoggedInMenu = () => {
    const dispatch = useDispatch();
    const state = useSelector((state) => state.auth);

    const isAdmin = state.isAdmin;

    const [anchorEl, setAnchorEl] = useState(false);

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div
            style={{
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Button
                id="logged-in-button"
                aria-controls={open ? "logged-in-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                variant="plain"
                color="neutral"
                onClick={handleClick}
                sx={{
                    borderRadius: 0,
                    height: "32px",
                    py: "4px",
                    ":hover": { bgcolor: "white" },
                }}
            >
                <Avatar>
                    {state.user.firstName[0].toUpperCase()}
                    {state.user.lastName[0].toUpperCase()}
                </Avatar>
            </Button>
            <Menu
                id="logged-in-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                aria-labelledby="logged-in-button"
                placement="bottom-end"
            >
                {isAdmin ? (
                    <MenuItem onClick={handleClose}>
                        <Link to="/DBM">Admin Settings</Link>
                    </MenuItem>
                ) : null}
                <MenuItem onClick={handleClose}>
                    <Link to="/profile">Profile</Link>
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        handleClose();
                        dispatch(logOutAction());
                    }}
                >
                    <Link to="/">Logout</Link>
                </MenuItem>
            </Menu>
        </div>
    );
};
