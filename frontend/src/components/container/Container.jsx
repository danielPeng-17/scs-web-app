import { Alert, IconButton, Sheet, Typography } from "@mui/joy";
import { Nav } from "../nav/Nav";
import Snackbar from "@mui/material/Snackbar";
import { useEffect, useState } from "react";
import { Close } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setToast } from "./store/sliceReducer";

export const Container = ({ name, children }) => {
    const dispatch = useDispatch();
    const state = useSelector((state) => state.toast);
    const [open, setOpen] = useState(false);

    const { toast } = state;

    useEffect(() => {
        if (toast) {
            setOpen(true);
        }
    }, [toast, setOpen]);

    const handleClose = () => {
        setOpen(false);
        dispatch(setToast(false));
    };

    return (
        <>
            <Nav />
            <Sheet sx={{ my: 3, px: 4 }}>
                {name ? <Typography level="display2">{name}</Typography> : null}
                <div style={{ marginTop: name ? "16px" : undefined }}>
                    {children}
                </div>
            </Sheet>

            <Snackbar
                open={open}
                onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                autoHideDuration={1000}
            >
                <Alert
                    variant="soft"
                    sx={{ width: "100%" }}
                    endDecorator={
                        <IconButton
                            variant="plain"
                            size="sm"
                            color="neutral"
                            onClick={handleClose}
                            sx={{ ml: 2 }}
                        >
                            <Close />
                        </IconButton>
                    }
                >
                    An item has been added to cart.
                </Alert>
            </Snackbar>
        </>
    );
};
