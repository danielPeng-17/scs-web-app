import { useState } from "react";
import { useDispatch } from "react-redux";
import { Typography, Button, Sheet } from "@mui/joy";

import { PaymentInfoForm } from "./PaymentInfoForm";
import { ReviewDetails } from "./ReviewDetails";
import { checkoutAction } from "./store/sliceReducer";
import { CheckoutForm } from "./CheckoutAddressForm";
import { CheckoutUserDetailsForm } from "./CheckoutUserDetailsForm";
import { formTitles } from "./constants";
import { useNavigate } from "react-router-dom";
import { clearCartAction } from "../shoppingCart/store/sliceReducer";

export const CheckoutFormContainer = ({ formData, setFormData }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [page, setPage] = useState(0);

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
                                if (page === 3) {
                                    setFormData({
                                        ...formData,
                                        shippingFee: 0,
                                    });
                                }
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
                                dispatch(clearCartAction());
                                navigate("/orderConfirmation");
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
