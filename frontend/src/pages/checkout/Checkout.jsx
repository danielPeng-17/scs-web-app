import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Container } from "../../components/container/Container";
import { CheckoutFormContainer } from "./CheckoutFormContainer";
import { OrderSummary } from "./OrderSummary";
import { fetchTruckAction } from "./store/sliceReducer";

export const Checkout = () => {
    const dispatch = useDispatch();
    const state = useSelector((state) => state.checkout);
    const authState = useSelector((state) => state.auth);

    const user = authState.isLoggedIn ? authState.user : null;

    const today = new Date();
    const date = `${today.getFullYear()}-${
        today.getMonth() + 1
    }-${today.getDate()}`;

    useEffect(() => {
        if (!state.trucks) {
            dispatch(fetchTruckAction());
        }
    }, [dispatch, state.trucks]);

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
        shippingFee: 0,
        totalPrice: 0,
        userId: user ? user.id : null,
        tripId: "",
    });

    return (
        <Container name="Checkout">
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "2.5em",
                }}
            >
                <div style={{ width: "70%", marginLeft: "30%" }}>
                    <CheckoutFormContainer
                        formData={formData}
                        setFormData={setFormData}
                    />
                </div>
                <div
                    style={{
                        display: "grid",
                        gridTemplateRows: "repeat(2, 1fr)",
                        gap: "2.5em",
                    }}
                >
                    <div>
                        <OrderSummary
                            formData={formData}
                            setFormData={setFormData}
                        />
                    </div>
                </div>
            </div>
        </Container>
    );
};
