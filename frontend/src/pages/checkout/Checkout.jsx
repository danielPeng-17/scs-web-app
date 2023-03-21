import { useState } from "react";

import { Container } from "../../components/container/Container";
import { CheckoutFormContainer } from "./CheckoutFormContainer";
import { OrderSummary } from "./OrderSummary";
import MapWindow from "./MapWindow";

export const Checkout = () => {
    const [location, setLocation] = useState({});

    return (
        <Container name="Checkout">
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "2.5em",
                }}
            >
                <div style={{ width: '70%', marginLeft: '30%' }}>
                    <CheckoutFormContainer setLocation={setLocation} />
                </div>
                <div
                    style={{
                        display: "grid",
                        gridTemplateRows: "repeat(2, 1fr)",
                        gap: "2.5em",
                    }}
                >
                    <div>
                        <OrderSummary />
                    </div>

                    <div>
                        <MapWindow location={location} />
                    </div>
                </div>
            </div>
        </Container>
    );
};
