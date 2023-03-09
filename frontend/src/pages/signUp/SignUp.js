import { useState } from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';


import { Nav } from '../../compoents/nav/Nav';

export const SignUp = () => {
    const [data, setData] = useState({
        email: '',
        status: 'initial',
    });

    return (
        <>
            <Nav />
            <div>


     
                <form onSubmit={() => {}} id="demo">
                    <FormControl>
                        <FormLabel
                        sx={(theme) => ({
                            '--FormLabel-color': theme.vars.palette.primary.plainColor,
                        })}
                        >
                            Enter Sign Up Details
                        </FormLabel>
                        <Input
                        sx={{ '--Input-decoratorChildHeight': '45px' }}
                        placeholder="example@email.com"
                        type="email"
                        required
                        value={data.email}
                        onChange={(event) =>
                            setData({ email: event.target.value, status: 'initial' })
                        }
                        error={data.status === 'failure'}
                        />
                        {data.status === 'failure' && (
                            <FormHelperText
                                sx={(theme) => ({ color: theme.vars.palette.danger[400] })}
                            >
                                Oops! something went wrong, please try again later.
                            </FormHelperText>
                        )}
                        {data.status === 'sent' && (
                            <FormHelperText
                                sx={(theme) => ({ color: theme.vars.palette.primary[400] })}
                            >
                                You are all set!
                            </FormHelperText>
                        )}
                    </FormControl>
                </form>
           
            </div>
        </>
    
    );
}