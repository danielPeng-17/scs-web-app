import { Nav } from "../../components/nav/Nav";
import Sheet from '@mui/joy/Sheet';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import FormLabel from '@mui/joy/FormLabel';
import Typography from '@mui/joy/Typography';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInAction } from "../../auth/store/sliceReducer";
import { useNavigate } from "react-router-dom";

export const OrderSummary = () => {
    return (
        <>
            <Sheet
                sx={{
                    width: '20%',
                    ml: '2%',
                    mt: '0%',
                    py: 5,
                    px: 5,
                    display: 'inline-block',
                    flexDirection: 'column',
                    gap: 2,
                    borderRadius: 'sm',
                    boxShadow: 'md',
                }}
                variant="outlined"
                >
                <Typography level="h4" component="h1">
                    <b>Review your order</b>
                </Typography>
                <hr />
                <p> Details </p>
                <p>  </p>
                <hr />
                <Typography level="h6" component="h1">
                    <b>Total</b>
                </Typography>
            </Sheet>
        </>
    );
}
