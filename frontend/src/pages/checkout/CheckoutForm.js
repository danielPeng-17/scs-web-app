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
import { ShippingInfoForm } from './ShippingInfoForm';
import { BillingAddressForm } from './BillingAddressForm';
import { PaymentInfoForm } from './PaymentInfoForm';

export const CheckoutForm = () => {
    const [page, setPage] = useState(0);
    const [formData, setFormData] = useState({
        shippingInfoFirstName: "",
        shippingInfoLastName: "",
        shippingAddress: "",
        shippingPostalCode: "",
        shippingCity: "",
        shippingProvince: "",
        shippingPhoneNumber: "",
        billingFirstName: "",
        billingLastName: "",
        billingAddress: "",
        billingPostalCode: "",
        billingCity: "",
        billingProvince: "",
        billingPhoneNumber: "",
      });
    const FormTitles = ["Shipping Address", "Billing Address", "Payment Information", "Review your order"]

    const PageDisplay = () => {
        if (page === 0) {
          return <ShippingInfoForm formData={formData} setFormData={setFormData} />;
        } else if (page === 1) {
          return <BillingAddressForm formData={formData} setFormData={setFormData} />;
        } else {
          return <PaymentInfoForm formData={formData} setFormData={setFormData} />;
        }
      };
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
                    <b> {FormTitles[page]} </b>
                </Typography>
                <div className="body">{PageDisplay()}</div>
                <Button 
                    disabled = {page == 0} sx={{ width: '45%', mr: 1}}
                    onClick={() => {
                        setPage((currPage) => currPage - 1);
                      }}>
                        Previous
                </Button>
                <Button
                    sx = {{width: '45%'}}
                    onClick={() => {
                    if (page === FormTitles.length - 1) {
                        console.log("FORM SUBMITTED");
                        console.log(formData);
                    } else {
                        setPage((currPage) => currPage + 1);
                    }
                    }}
                >
                    {page === FormTitles.length - 1 ? "Submit" : "Next"}
                </Button>
            </Sheet>
        </>
    );
}
