import { Button, Sheet, Typography } from "@mui/joy";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DoneRounded } from "@mui/icons-material";

import { Container } from "../../components/container/Container";
import { roundNumberToTwoDeciamls } from "../../utils/utils";
// import { useEffect, useState } from "react";
// import { getLocation } from "../../services";
// import MapWindow from "./MapWindow";

export const OrderConfirmation = () => {
    const state = useSelector((state) => state.checkout);
    // const [coords, setCoords] = useState(null);
    const navigate = useNavigate();

    const { success, data } = state;

    // const destination = data && data?.destination ? data.destination : "";

    // useEffect(() => {
    //     if (destination !== "" && !coords) {
    //         getLocation({
    //             address: destination,
    //             apiKey: process.env.REACT_APP_GOOGLE_MAP_KEY,
    //         }).then((res) => {
    //             const location = res.data.results[0].geometry.location;
    //             setCoords({ lat: location.lat, lng: location.lng });
    //         });
    //     }
    // }, [destination, coords, setCoords]);

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

                            {/* {destination !== "" && coords ? (
                                <MapWindow
                                    key={process.env.REACT_APP_GOOGLE_MAP_KEY}
                                    center={coords}
                                />
                            ) : null} */}
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
