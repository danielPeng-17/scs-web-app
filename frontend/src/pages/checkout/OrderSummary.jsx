import { Sheet, Typography } from "@mui/joy";
import { useSelector } from "react-redux";

export const OrderSummary = () => {
    const state = useSelector((state) => state.cart);

    return (
        <>
            <Sheet
                sx={{
                    width: "34%",
                    ml: "0%",
                    mt: "0%",
                    p: 5,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    borderRadius: "sm",
                    boxShadow: "md",
                }}
                variant="outlined"
            >
                <Typography level="h4" component="h1">
                    <b>Order Summary</b>
                </Typography>
                <hr />
                <p>Item Subtotal</p>
                <p>Shipping Total</p>
                <hr />
                <Typography level="h5" component="h1">
                    Total:{" "}
                    <span style={{ fontWeight: "bold" }}>
                        ${state.totalPrice}
                    </span>
                </Typography>
            </Sheet>
        </>
    );
};
