import { useEffect, useState } from 'react';
import { Nav } from "../../components/nav/Nav";
import Sheet from '@mui/joy/Sheet';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import FormLabel from '@mui/joy/FormLabel';
import Typography from '@mui/joy/Typography';
import { useDispatch, useSelector } from "react-redux";
import { signInAction } from "../../auth/store/sliceReducer";
import { useNavigate } from "react-router-dom";

export const SignIn = () => {
    const dispatch = useDispatch();
    const state = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const [cred, setCred] = useState({
        email: '',
        password: ''
    })

    // if auth.isLoggedIn is true, redirect user to home page
    useEffect(() => {
        if (state.isLoggedIn && state.loading === false) {
            navigate('/');
        }
    }, [state, navigate]);

    const onSubmit = (e) => {
        e.preventDefault();
        if (!state.isLoggedIn) {
            dispatch(signInAction(cred));
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
                <Typography level="h4" component="h1">
                    <b>Sign In</b>
                </Typography>
                <form
                    onSubmit={(e) => onSubmit(e)}
                >
                    <FormLabel>Email</FormLabel>
                    <Input
                        placeholder="johndoe@email.com"
                        required
                        value={cred.email}
                        onChange={(e) => setCred({...cred, email: e.target.value})}
                        sx={{ mb: 1, fontSize: 'var(--joy-fontSize-sm)' }}
                    />
                    <FormLabel>Password</FormLabel>
                    <Input 
                        placeholder="password"
                        required
                        value={cred.password}
                        onChange={(e) => setCred({...cred, password: e.target.value})}
                        sx={{ mb: 1 }}
                    />

                    <Button type="submit" sx={{ width: '100%' }}>Enter</Button>
                </form>
            </Sheet>
        </>
    );
}
