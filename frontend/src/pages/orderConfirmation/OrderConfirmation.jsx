import { Button } from "@mui/joy";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container } from "../../components/container/Container";

export const OrderConfirmation = () => {
    const state = useSelector((state) => state.checkout);
    const navigate = useNavigate();

    console.log("in order confirmation", state);

    const { success } = state;

    return (
        <Container name="Order Confirmation">
            {success ? (
                <>
                    <p>Your order was a success!</p>
                    <p>Your order id: {state.data.orderId}</p>
                    <p>Total cost: {state.data.totalPrice}</p>
                    <p>Shipment arrival date: {state.data.dateReceived}</p>
                </>
            ) : (
                <p>
                    An error has occurred while processing your order. Please
                    try again.
                </p>
            )}
            <Button onClick={() => navigate("/")}>Back to shop!</Button>
        </Container>
    );
};
