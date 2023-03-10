import { useState } from 'react';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';

import { Nav } from '../../compoents/nav/Nav';
import { useDispatch } from 'react-redux';
import { signUpAction } from '../../auth/store/sliceReducer';

const Status = Object.freeze({
    Initial: 'Initial',
    PasswordMistmatch: 'PasswordMistmatch',
    MissingData: 'MissingData',
    Fail: 'Fail'
})

export const SignUp = () => {
    const dispatch = useDispatch();

    const [data, setData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        telNo: '',
        address: '',
        status: Status.Initial
    });

    const onSubmit = () => {
        if (data.password.length > 0 && data.password !== data.confirmPassword) {
            setData({...data, status: Status.PasswordMistmatch});
        } else if (data.email === '' || data.password === '' || data.firstName === '' || data.lastName === '' || data.telNo === '' || data.address === '') {
            setData({...data, status: Status.MissingData});
        } else {
            dispatch(signUpAction(data));
        }
    }

    return (
        <>
            <Nav />
           
            <Sheet
                sx={{
                    width: 300,
                    mx: 'auto',
                    my: '6%',
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