import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Button, Sheet } from "@mui/joy";

import { PaymentInfoForm } from "./PaymentInfoForm";
import { ReviewDetails } from "./ReviewDetails";
import { checkoutAction } from "./store/sliceReducer";
import { CheckoutForm } from "./CheckoutAddressForm";
import { CheckoutUserDetailsForm } from "./CheckoutUserDetailsForm";
import { formTitles } from "./constants";
import { useNavigate } from "react-router-dom";

export const CheckoutFormContainer = () => {
    const dispatch = useDispatch();
    const state = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const user = state.isLoggedIn ? state.user : null;

    const today = new Date();
    const date = `${today.getFullYear()}-${
        today.getMonth() + 1
    }-${today.getDate()}`;

    const [page, setPage] = useState(0);

    const [formData, setFormData] = useState({
        user: {
            firstName: user ? user.firstName : "",
            lastName: user ? user.lastName : "",
            telNo: user ? user.telNo : "",
        },
        shipping: {
            address: user ? user.address : "",
            postalCode: user ? user.postalCode : "",
            city: user ? user.city : "",
            province: user ? user.province : "",
            country: user ? user.country : "CA",
        },
        billing: {
            address: "",
            postalCode: "",
            city: "",
            province: "",
            country: "CA",
        },
        paymentData: {
            cardNo: "",
            cardName: "",
            cardExp: "",
            cardCVV: "",
        },
        isBillingSameAsShipping: false,
        dateIssued: date,
        dateReceived: "",
        branchSource: "",
        totalPrice: 0,
        userId: user ? user.id : null,
        tripId: ""
    });

    const formTitlesSize = Object.keys(formTitles).length;

    return (
        <>
            <Sheet
                sx={{
                    p: 5,
                    borderRadius: "sm",
                    boxShadow: "md",
                }}
                variant="outlined"
            >
                <Typography level="h4" component="h1">
                    {formTitles[page]}
                </Typography>
                <div style={{ marginTop: "1em" }}>
                    {page === 0 ? (
                        <CheckoutUserDetailsForm
                            formData={formData}
                            setFormData={setFormData}
                        />
                    ) : null}

                    {page === 1 ? (
                        <CheckoutForm
                            formData={formData}
                            setFormData={setFormData}
                            name="shipping"
                        />
                    ) : null}

                    {page === 2 ? (
                        <CheckoutForm
                            formData={formData}
                            setFormData={setFormData}
                            name="billing"
                        />
                    ) : null}

                    {page === 3 ? (
                        <PaymentInfoForm
                            formData={formData}
                            setFormData={setFormData}
                        />
                    ) : null}

                    {page > 3 ? <ReviewDetails formData={formData} /> : null}
                </div>
                <div
                    style={{
                        display: "inline-flex",
                        width: "100%",
                        marginTop: "2em",
                    }}
                >
                    {page > 0 ? (
                        <Button
                            sx={{ width: "50%", mr: 1 }}
                            onClick={() => {
                                setPage(page - 1);
                            }}
                        >
                            Previous
                        </Button>
                    ) : null}
                    <Button
                        sx={{ width: page > 0 ? "50%" : "100%" }}
                        onClick={() => {
                            if (
                                page === 0 &&
                                formData.shipping.address !== ""
                            ) {
                                // make api call to geolocation api to fetch lat and long of address
                                // call setlocation callback
                                // extract lat and longitude results.geometry.location.lng / lat, before callback
                                // get location
                            }

                            if (page === formTitlesSize - 1) {
                                dispatch(checkoutAction(formData));
                                navigate('/orderConfirmation');
                            } else {
                                setPage(page + 1);
                            }
                        }}
                    >
                        {page === formTitlesSize - 1 ? "Confirm" : "Next"}
                    </Button>
                </div>
            </Sheet>
        </>
    );
};
