import React from "react";
import { Catalog } from "../../components/shopView/Catalog";
import { Container } from "../../components/container/Container";
import { Alert } from "@mui/joy";

export const Home = () => {
    return (
        <Container name="Electronics">
            <Alert color="warning" sx={{ my: 2 }}>
                Limited time only: Free shipping for subtotals over $1000.00 &
                checkout with code:{" "}
                <code
                    style={{
                        margin: "0 8px",
                        backgroundColor: "lightgray",
                        padding: "2px 6px",
                        borderRadius: "6px",
                    }}
                >
                    SCS
                </code>{" "}
                to get an additional $200 off!
            </Alert>
            <Catalog />
        </Container>
    );
};
