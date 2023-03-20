import Sheet from '@mui/joy/Sheet';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import FormLabel from '@mui/joy/FormLabel';
import Typography from '@mui/joy/Typography';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInAction } from "../../auth/store/sliceReducer";
import { useNavigate } from "react-router-dom";
import { ShippingInfoForm } from './ShippingInfoForm';
import { BillingAddressForm } from './BillingAddressForm';
import { PaymentInfoForm } from './PaymentInfoForm';
import { ReviewDetails } from './ReviewDetails';
import { getLocation } from '../../services';
import { checkoutAction } from './store/sliceReducer';

export const CheckoutForm = () => {
    const state = useSelector((state) => state.auth);
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const [page, setPage] = useState(0);
    const [formData, setFormData] = useState({
        shippingFirstName: "",
        shippingLastName: "",
        shippingAddress: "",
        shippingPostalCode: "",
        shippingCity: "",
        shippingProvince: "",
        shippingCountry: "CA",
        shippingPhoneNumber: "",
        billingFirstName: "",
        billingLastName: "",
        billingAddress: "",
        billingPostalCode: "",
        billingCity: "",
        billingProvince: "",
        billingCountry: "CA",
        billingPhoneNumber: "",
        paymentCode: "",
        paymentExpiration: "",
        paymentCVV: "",
        // required info
        dateIssued: date,
        dateReceived: "",
        totalPrice: "",
        userId: state.user.id,
        tripId: "",
      });
    const FormTitles = ["Shipping Address", "Billing Address", "Payment Information", "Review your order"]
    const dispatch = useDispatch();
    const handleSubmit = () => {
        dispatch(checkoutAction(formData));
    };

    const PageDisplay = () => {
        if (page === 0) {
          return <ShippingInfoForm formData={formData} setFormData={setFormData} />;
        } else if (page === 1) {
          return <BillingAddressForm formData={formData} setFormData={setFormData} />;
        } else if (page === 2){
          return <PaymentInfoForm formData={formData} setFormData={setFormData} />;
        } else {
            return <ReviewDetails formData={formData} />
        }
    };
    return (
        <>
            <Sheet
                sx={{
                    width:'50%',
                    height: '89%',
                    ml: '40%',
                    mr: '0%',
                    py: 5,
                    px: 5,
                    display: 'flex',
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
                <div style={{display: 'inline-flex', width: '100%'}}>
                {page > 0 ? 
                <Button 
                    sx={{ width: '30%', mr: 1}}
                    onClick={() => {
                        setPage((currPage) => currPage - 1);
                      }}>
                        Previous
                </Button>
                : null}
                <Button
                    sx = {{width: '30%'}}
                    onClick={() => {
                    if (page === 0) {
                        if(formData.shippingAddress !== ''){
                            // make api call to geolocation api to fetch lat and long of address
                            // call setlocation callback 
                            // extract lat and longitude results.geometry.location.lng / lat, before callback
                            // get location
                        }      
                    }
                    if (page === FormTitles.length - 1) {
                        // Button is confirm, run submit function and put into databse

                        console.log("FORM SUBMITTED");
                        console.log(formData);
                        handleSubmit();
                    } else {
                        setPage((currPage) => currPage + 1);
                    }
                    }}
                >
                    {page === FormTitles.length - 1 ? "Confirm" : "Next"}
                </Button>
                </div>
            </Sheet>
        </>
    );
}
