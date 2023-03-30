import { Button, Sheet, Typography } from "@mui/joy";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DoneRounded } from "@mui/icons-material";

import { Container } from "../../components/container/Container";
import { roundNumberToTwoDeciamls } from "../../utils/utils";

export const OrderConfirmation = () => {
    const state = useSelector((state) => state.checkout);
    const navigate = useNavigate();
    
    const { success, data } = state;
    const destination = data && data?.destination ? data.destination : "";

    const Map = () => {
        const url = `https://maps.googleapis.com/maps/api/staticmap?center=${destination}&zoom=14&size=400x400&markers=size:mid%7Ccolor:red%7C${destination}&key=${process.env.REACT_APP_GOOGLE_MAP_KEY}`;
        return <img src={url} alt="map" />;
    };

    return (
        <Container>
            <Sheet
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    pb: 5,
                    mt: "120px",
                }}
            >
                <Sheet sx={{ textAlign: "center" }}>
                    {success ? (
                        <>
                            <div
                                style={{
                                    border: "3px solid",
                                    borderColor: "#d7dade",
                                    borderRadius: "50%",
                                    width: "fit-content",
                                    padding: "18px",
                                    margin: "auto",
                                }}
                            >
                                <DoneRounded
                                    sx={{
                                        color: "#096BDE",
                                        fontSize: "2.5em",
                                        fontWeight: "600",
                                    }}
                                />
                            </div>
                            <Typography
                                level="h2"
                                fontSize="xl"
                                sx={{
                                    my: 2,
                                    color: "#096BDE",
                                    fontWeight: "600",
                                    letterSpacing: "1px",
                                }}
                            >
                                Order successful!
                            </Typography>
                            <p style={{ marginBottom: "0" }}>
                                Order id: {state.data.orderId}
                            </p>
                            <p style={{ margin: "0 auto" }}>
                                Total: $
                                {roundNumberToTwoDeciamls(
                                    state.data.totalPrice
                                )}
                            </p>
                            <p style={{ marginTop: "0" }}>
                                Arrival date: {state.data.dateReceived}
                            </p>
                            <Sheet sx={{ mb: 4 }}>
                                {destination ? <Map /> : null}
                                <p style={{ marginTop: "0" }}>
                                    Address: {destination}
                                </p>
                            </Sheet>
                        </>
                    ) : (
                        <p>
                            An error has occurred while processing your order.
                            Please try again.
                        </p>
                    )}
                    <Button onClick={() => navigate("/")}>Back to shop!</Button>
                </Sheet>
            </Sheet>
        </Container>
    );
};
