import Sheet from '@mui/joy/Sheet';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import FormLabel from '@mui/joy/FormLabel';
import Typography from '@mui/joy/Typography';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Chip from '@mui/joy/Chip';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import ListItem from '@mui/joy/ListItem';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInAction } from "../../auth/store/sliceReducer";
import { useNavigate } from "react-router-dom";

export const PaymentInfoForm = () => {
    return (
        <>
            <form
            >
                <FormLabel> Card Number </FormLabel>
                <Input
                    placeholder="John"
                    required
                    sx={{mb: 2, fontSize: 'var(--joy-fontSize-sm)' }}
                />
                <FormLabel> Expiration Date  </FormLabel>
                <Input
                    placeholder="Doe"
                    required
                    sx={{ mb: 2, fontSize: 'var(--joy-fontSize-sm)' }}
                />
                <FormLabel> CVV </FormLabel>
                <Input
                    placeholder="1234"
                    required
                    sx={{ mb: 2, fontSize: 'var(--joy-fontSize-sm)' }}
                />
                <FormLabel> Postal Code </FormLabel>
                <Input
                    placeholder="1234"
                    required
                    sx={{ mb: 2, fontSize: 'var(--joy-fontSize-sm)' }}
                />  
                <FormLabel> Phone Number </FormLabel>
                <Input
                    placeholder="Phone Number"
                    required
                    sx={{ mb: 2, fontSize: 'var(--joy-fontSize-sm)' }}
                />
            </form>
        </>
    );
}
