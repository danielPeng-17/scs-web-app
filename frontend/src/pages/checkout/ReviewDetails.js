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
            <div style={{textAlign: 'left'}}>
                <h3> Shipping Details </h3>
                <p> First name: {formData.shippingFirstName}</p>
                <p> Last name: {formData.shippingLastName}</p>
                <p> Address : {formData.shippingAddress}, {formData.shippingCity}, {formData.shippingProvince}, CA, {formData.shippingPostalCode}</p>
                <p> Phone Number: {formData.shippingPhoneNumber}</p>
                <hr />
                <h3> Billing Details </h3>
                <p> First name: {formData.billingFirstName}</p>
                <p> Last name: {formData.billingLastName}</p>
                <p> Address : {formData.billingAddress}, {formData.billingCity}, {formData.billingProvince}, CA, {formData.billingPostalCode}</p>
                <p> Phone Number: {formData.billingPhoneNumber}</p>
                <hr />
                <h3> Payment Information </h3>
                <p> Card Number: {formData.paymentNumber}</p>
                <p> Expiration Date: {formData.paymentExpiration}</p>
                <p> CVV: {formData.paymentCVV}</p>
                <p> Postal Code: {formData.paymentPostalCode}</p>
                <p> Phone Number: {formData.paymentPhoneNumber}</p>
            </div>

        </>
    );
}
