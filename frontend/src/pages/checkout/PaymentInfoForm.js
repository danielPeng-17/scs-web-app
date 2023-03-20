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
import { updateFormData } from './utils';

export const PaymentInfoForm = ({formData, setFormData}) => {
    return (
        <>
            <form
            >
                <FormLabel> Card Number </FormLabel>
                <Input
                    placeholder="XXXX-XXXX-XXXXX"
                    required
                    onBlur={(e)=> updateFormData(formData, setFormData, {paymentCode: e.target.value})}
                    sx={{mb: 2, fontSize: 'var(--joy-fontSize-sm)' }}
                />
                <FormLabel> Expiration Date  </FormLabel>
                <Input
                    placeholder="01/20"
                    required
                    onBlur={(e)=> updateFormData(formData, setFormData, {paymentExpiration: e.target.value})}
                    sx={{ mb: 2, fontSize: 'var(--joy-fontSize-sm)' }}
                />
                <FormLabel> CVV </FormLabel>
                <Input
                    placeholder="1234"
                    required
                    onBlur={(e)=> updateFormData(formData, setFormData, {paymentCVV: e.target.value})}
                    sx={{ mb: 2, fontSize: 'var(--joy-fontSize-sm)' }}
                />
                <br />
                <hr />
                <h2> Delivery Details </h2>
                <FormLabel> Select your branch location </FormLabel>
                <Select
                    placeholder="Select a location"
                    sx={{ width: 240 }}
                    onBlur={(e)=> updateFormData(formData, setFormData, {shippingProvince: e.target.value})}
                    >
                    <Option value="Ryerson"> Ryerson </Option>
                    <Option value="TMU"> TMU</Option>
                </Select>
                <FormLabel> Select your delivery date </FormLabel>
                <Input
                    type="date"
                    sx={{ width: 240 }}
                    onBlur={(e)=> updateFormData(formData, setFormData, {dateReceived: e.target.value})}
                />
            </form>
        </>
    );
}
