import { Sheet, Typography } from "@mui/joy";

export const OrderSummary = () => {
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
                <p> Item Subtotal </p>
                <p> Shipping Total </p>
                <hr />
                <Typography level="h6" component="h1">
                    <b>Total</b>
                </Typography>
            </Sheet>
        </>
    );
};
