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

export const BillingAddressForm = ({formData, setFormData}) => {
    return (
        <>
            <form
            >
                <FormLabel> First Name </FormLabel>
                <Input
                    placeholder="John"
                    required
                    onBlur={(e)=> updateFormData(formData, setFormData, {billingFirstName: e.target.value})}
                    sx={{mb: 2, fontSize: 'var(--joy-fontSize-sm)' }}
                />
                <FormLabel> Last Name </FormLabel>
                <Input
                    placeholder="Doe"
                    required
                    onBlur={(e)=> updateFormData(formData, setFormData, {billingLastName: e.target.value})}
                    sx={{ mb: 2, fontSize: 'var(--joy-fontSize-sm)' }}
                />
                <FormLabel> Address </FormLabel>
                <Input
                    placeholder="123 Fake Street"
                    required
                    onBlur={(e)=> updateFormData(formData, setFormData, {billingAddress: e.target.value})}
                    sx={{ mb: 2, fontSize: 'var(--joy-fontSize-sm)' }}
                />
                <FormLabel> Postal Code </FormLabel>
                <Input
                    placeholder="ABC123"
                    required
                    onBlur={(e)=> updateFormData(formData, setFormData, {billingPostalCode: e.target.value})}
                    sx={{mb: 2, fontSize: 'var(--joy-fontSize-sm)' }}
                />
                <FormLabel> City </FormLabel>
                <Input
                    placeholder="Toronto"
                    required
                    onBlur={(e)=> updateFormData(formData, setFormData, {billingCity: e.target.value})}
                    sx={{ mb: 2, fontSize: 'var(--joy-fontSize-sm)' }}
                />
                <FormLabel> Province </FormLabel>
                <Select
                    placeholder="Select a province…"
                    sx={{ width: 240 }}
                    onBlur={(e)=> updateFormData(formData, setFormData, {billingProvince: e.target.value})}
                    >
                    <Option value="ON">ON</Option>
                    <Option value="AB">AB</Option>
                    <Option value="QC">QC</Option>
                    <Option value="BC">BC</Option>
                    <Option value="NS">NS</Option>
                    <Option value="MB">MB</Option>
                    <Option value="SK">SK</Option>
                    <Option value="NB">NB</Option>
                    <Option value="YT">YT</Option>
                    <Option value="NT">NT</Option>
                    <Option value="NU">NU</Option>

                </Select>
                <br />
                <FormLabel> Phone Number </FormLabel>
                <Input
                    placeholder="Phone Number"
                    required
                    onBlur={(e)=> updateFormData(formData, setFormData, {billingPhoneNumber: e.target.value})}
                    sx={{ mb: 2, fontSize: 'var(--joy-fontSize-sm)' }}
                />
            </form>
        </>
    );
}
