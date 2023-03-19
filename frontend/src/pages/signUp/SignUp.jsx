import { useEffect, useState } from 'react';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';

import { Nav } from '../../components/nav/Nav';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { signUpAction } from '../../auth/store/sliceReducer';

const Status = Object.freeze({
    Initial: 'Initial',
    PasswordMistmatch: 'PasswordMistmatch',
    MissingData: 'MissingData',
    Fail: 'Fail'
})

export const SignUp = () => {
    const dispatch = useDispatch();
    const state = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const [data, setData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        telNo: '',
        address: '',
        city: '',
        province: '',
        country: 'CA',
        postalCode: '',
        balance: 0,
        status: Status.Initial
    });

    // if auth.isLoggedIn is true, redirect user to home page
    useEffect(() => {
        if (state.isLoggedIn && state.loading === false) {
            navigate('/');
        }
    }, [state, navigate]);

    const onSubmit = () => {
        if (data.password.length > 0 && data.password !== data.confirmPassword) {
            setData({...data, status: Status.PasswordMistmatch});
        } else if (data.email === '' || data.password === '' || data.firstName === '' || data.lastName === '' || data.telNo === '' || data.address === '') {
            setData({...data, status: Status.MissingData});
        } else {
            const { status, ...rest} = data;
            dispatch(signUpAction(rest));
        }
    }

    return (
        <>
            <Nav />
           
            <Sheet
                sx={{
                    width: 300,
                    mx: 'auto',
                    my: '4%',
                    py: 3,
                    px: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    borderRadius: 'sm',
                    boxShadow: 'md',
                }}
                variant="outlined"
                >
                <div>
                    <Typography level="h4" component="h1">
                    <b>Welcome!</b>
                    </Typography>
                    <Typography level="body2">Sign up here.</Typography>
                </div>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit();
                }} id="demo">
                    <FormLabel>Email</FormLabel>
                    <Input
                        name="email"
                        type="email"
                        placeholder="johndoe@email.com"
                        required
                        value={data.email}
                        onChange={(e) => {
                            setData({...data, email: e.target.value});
                        }}
                    />

                    <FormLabel>Password</FormLabel>
                    <Input
                        name="password"
                        type="password"
                        placeholder="password"
                        required
                        value={data.password}
                        onChange={(e) => {
                            setData({...data, password: e.target.value});
                        }}
                    />

                    <FormLabel>Confirm Password</FormLabel>
                    <Input
                        name="confirm-password"
                        type="password"
                        placeholder="confirm password"
                        required
                        value={data.confirmPassword}
                        onChange={(e) => {
                            setData({...data, confirmPassword: e.target.value});
                        }}
                    />

                    <FormLabel>First Name</FormLabel>
                    <Input
                        name="firstName"
                        type="text"
                        required
                        value={data.firstName}
                        onChange={(e) => {
                            setData({...data, firstName: e.target.value});
                        }}
                    />

                    <FormLabel>Last Name</FormLabel>
                    <Input
                        name="lastName"
                        type="text"
                        required
                        value={data.lastName}
                        onChange={(e) => {
                            setData({...data, lastName: e.target.value});
                        }}
                    />

                    <FormLabel>Phone No.</FormLabel>
                    <Input
                        name="telNo"
                        type="text"
                        placeholder="(123) 456-7890"
                        required
                        value={data.telNo}
                        onChange={(e) => {
                            setData({...data, telNo: e.target.value});
                        }}
                    />

                    <FormLabel>Address</FormLabel>
                    <Input
                        name="address"
                        type="text"
                        placeholder="123 Maple St."
                        required
                        value={data.address}
                        onChange={(e) => {
                            setData({...data, address: e.target.value});
                        }}
                    />
                    
                    <FormLabel>City</FormLabel>
                    <Input
                        name="city"
                        type="text"
                        required
                        value={data.city}
                        onChange={(e) => {
                            setData({...data, city: e.target.value});
                        }}
                    />

                    <FormLabel>Province</FormLabel>
                    <Select
                        placeholder="Select a province"
                        value={data.province}
                        onChange={(e, newValue) => {
                            setData({...data, province: newValue});
                        }}
                    >
                        <Option value="NL">Newfoundland and Labrador</Option>
                        <Option value="PE">Prince Edward Island</Option>
                        <Option value="NS">Nova Scotia</Option>
                        <Option value="NB">New Brunswick</Option>
                        <Option value="QC">Quebec</Option>
                        <Option value="ON">Ontario</Option>
                        <Option value="MB">Manitoba</Option>
                        <Option value="SK">Saskatchewan</Option>
                        <Option value="AB">Alberta</Option>
                        <Option value="BC">British Columbia</Option>
                        <Option value="YT">Yukon</Option>
                        <Option value="NT">Northwest Territories</Option>
                        <Option value="NU">Nunavut</Option>
                    </Select>

                    <FormLabel>Country</FormLabel>
                    <Select
                        disabled
                        value={data.country}
                    >
                        <Option value="CA">Canada</Option>
                    </Select>

                    <FormLabel>Postal Code</FormLabel>
                    <Input
                        name="postalCode"
                        type="text"
                        placeholder="A1B2C3"
                        required
                        value={data.postalCode}
                        onChange={(e) => {
                            setData({...data, postalCode: e.target.value});
                        }}
                    />

                    <Button sx={{ mt: 3, width: '100%' }} type='submit'>Sign Up</Button>

                    {data.status === Status.MissingData && (
                        <FormHelperText
                            sx={(theme) => ({ color: theme.vars.palette.danger[400] })}
                        >
                            Oops! Your are missing some data.
                        </FormHelperText>
                    )}

                    {data.status === Status.PasswordMistmatch && (
                        <FormHelperText
                            sx={(theme) => ({ color: theme.vars.palette.danger[400] })}
                        >
                            Oops! Your passwords do not match up.
                        </FormHelperText>
                    )}

                    {data.status === Status.Fail && (
                        <FormHelperText
                            sx={(theme) => ({ color: theme.vars.palette.danger[400] })}
                        >
                            Oops! Something went wrong, please try again later.
                        </FormHelperText>
                    )}
                </form>
            </Sheet>
        </>
    
    );
}