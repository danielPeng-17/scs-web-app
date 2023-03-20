import React from "react";
import { Catalog } from "../../components/shopView/Catalog";
import { Container } from "../../components/container/Container";

export const Home = () => {
    return (
        <Container name="Electronics">
            <Catalog />
        </Container>
    );
}