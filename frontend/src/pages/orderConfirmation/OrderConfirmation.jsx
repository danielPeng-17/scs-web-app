import { Button } from "@mui/joy";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container } from "../../components/container/Container";

export const OrderConfirmation = () => {
    const state = useSelector((state) => state.checkout);
    const navigate = useNavigate();

    const {success, orderId, totalPrice, dateReceived} = state.data;

    return (
        <Container name="Order Confirmation">
            {success ? (
                <>
                    <p>Your order was a success!</p>
                    <p>Your order id: {orderId}</p>
                    <p>Total cost: {totalPrice}</p>
                    <p>Shipment arrival date: {dateReceived}</p>
                </>
            ) : (
                <p>
                    An error has occurred while processing your order. Please
                    try again.
                </p>
            )}
            <Button onClick={() => navigate('/')}>
                Back to shop!
            </Button>
        </Container>
    );
};
