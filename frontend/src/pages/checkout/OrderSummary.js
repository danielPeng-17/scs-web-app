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
                    width: '34%',
                    ml: '0%',
                    mt: '0%',
                    py: 5,
                    px: 5,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    borderRadius: 'sm',
                    boxShadow: 'md',
                }}
                variant="outlined"
                >
                <Typography level="h4" component="h1">
                    <b>Order Summary</b>
                </Typography>
                <hr />
                <p> Item Subtotal </p>
                <p> Shipping Total </p>
                <hr />
                <Typography level="h6" component="h1">
                    <b>Total</b>
                </Typography>
            </Sheet>
        </>
    );
}
