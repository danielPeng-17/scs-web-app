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

export const CheckoutForm = () => {
    const [page, setPage] = useState(0);
    const FormTitles = ["Shipping Address", "Billing Address", "Payment Information", "Review your order"]

    const PageDisplay = () => {
        if (page === 0) {
        
        } else if (page === 1) {

        } else if (page === 2) {
            
        }
    }
    return (
        <>
            <Sheet
                sx={{
                    width:'30%',
                    ml: '20%',
                    my: '4%',
                    py: 5,
                    px: 5,
                    display: 'inline-block',
                    flexDirection: 'column',
                    gap: 2,
                    borderRadius: 'sm',
                    boxShadow: 'md',
                }}
                variant="outlined"
                >
                <Typography level="h4" component="h1">
                    <b>Shipping Information</b>
                </Typography>
                <form
                >
                    <FormLabel> First Name </FormLabel>
                    <Input
                        placeholder="John"
                        required
                        sx={{mb: 2, fontSize: 'var(--joy-fontSize-sm)' }}
                    />
                    <FormLabel> Last Name </FormLabel>
                    <Input
                        placeholder="Doe"
                        required
                        sx={{ mb: 2, fontSize: 'var(--joy-fontSize-sm)' }}
                    />
                    <FormLabel> Address </FormLabel>
                    <Input
                        placeholder="123 Fake Street"
                        required
                        sx={{ mb: 2, fontSize: 'var(--joy-fontSize-sm)' }}
                    />
                    <FormLabel> Postal Code </FormLabel>
                    <Input
                        placeholder="ABC123"
                        required
                        sx={{mb: 2, fontSize: 'var(--joy-fontSize-sm)' }}
                    />
                    <FormLabel> City </FormLabel>
                    <Input
                        placeholder="Toronto"
                        required
                        sx={{ mb: 2, fontSize: 'var(--joy-fontSize-sm)' }}
                    />
                    <FormLabel> Province </FormLabel>
                    <Select
                        placeholder="Select a province…"
                        sx={{ width: 240 }}
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
                        sx={{ mb: 2, fontSize: 'var(--joy-fontSize-sm)' }}
                    />
                    <Button type="submit" sx={{ width: '100%' }}>Enter</Button>
                </form>
            </Sheet>
        </>
    );
}
