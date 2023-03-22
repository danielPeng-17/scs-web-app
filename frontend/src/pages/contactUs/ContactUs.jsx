import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "./ContactUs.css";
import { Container } from "../../components/container/Container";

export const ContactUs = () => {
    const contactInfo = {
        email: "contact@website.com",
        phone: "123-456-7890",
        address: "123 Main St, Anytown USA",
    };

    return (
        <Container name="Contact Us">
            <Box sx={{ flexGrow: 1 }}>
                <Box sx={{ m: 2 }} className="contactus-container">
                    <Typography variant="body1" gutterBottom>
                        You can reach us by email, phone, or at our physical
                        address:
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Email: {contactInfo.email}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Phone: {contactInfo.phone}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Address: {contactInfo.address}
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
};
