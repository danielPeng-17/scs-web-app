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

export const ReviewDetails = ({formData}) => {
    return (
        <>
            <hr />
            <p> Details </p>
            <p> {formData.shippingFirstName}</p>
            <p>  </p>
            <hr />
            <Typography level="h6" component="h1">
            </Typography>
        </>
    );
}
