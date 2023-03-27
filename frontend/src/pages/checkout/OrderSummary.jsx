import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import {
    Divider,
    Grid,
    Button,
    Sheet,
    Typography,
    Input,
    Alert,
} from "@mui/joy";
import {
    ConfirmationNumberOutlined,
    ExpandMoreOutlined,
    ExpandLessOutlined,
} from "@mui/icons-material";

import { roundNumberToTwoDeciamls } from "../../utils/utils";

export const OrderSummary = ({ formData, setFormData }) => {
    const state = useSelector((state) => state.cart);
    const [open, setOpen] = useState(false);
    const [discount, setDiscount] = useState(0);
    const [discountCode, setDiscountCode] = useState("");
    const [error, setError] = useState(false);

    const shippingFee = formData.shippingFee;
    const itemTotal = state.totalPrice;
    const subtotal = itemTotal - discount;
    const tax = subtotal * 0.13;
    const total = useMemo(
        () => subtotal + tax + (itemTotal > 1000 ? 0 : shippingFee),
        [itemTotal, shippingFee, subtotal, tax]
    );

    useEffect(() => {
        if (formData.totalPrice !== total) {
            setFormData({ ...formData, totalPrice: total });
        }
    }, [formData, setFormData, total]);

    const validateDiscount = () => {
        if (discountCode.toLowerCase() === "scs") {
            setDiscount(200);
            setError(false);
            setOpen(false);
        } else {
            setError(true);
        }
    };

    const Row = ({
        label,
        price,
        isNegative = false,
        isTotal = false,
        isDiscount = false,
    }) => {
        const totalStyles = {
            fontSize: "1.25em",
            fontWeight: "bold",
        };

        const normalStyles = {
            fontWeight: "600",
            fontSize: "0.9em",
        };

        return (
            <Grid container sx={{ flexGrow: 1 }}>
                <Grid xs={8}>
                    <span
                        style={{ ...(!isTotal ? normalStyles : totalStyles) }}
                    >
                        {label}
                    </span>
                </Grid>
                <Grid xs={4} sx={{ textAlign: "right" }}>
                    <span
                        style={{ ...(!isTotal ? normalStyles : totalStyles) }}
                    >
                        {price > 0 || isDiscount
                            ? `${
                                  isNegative ? "-" : ""
                              }$${roundNumberToTwoDeciamls(price)}`
                            : "--"}
                    </span>
                </Grid>
            </Grid>
        );
    };

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
                    Summary
                </Typography>

                <Row label="Items total price" price={itemTotal} />
                <Row label="Discount" price={discount} isNegative isDiscount />
                <Divider />
                <Row label="Subtotal" price={subtotal} />
                <Row label="Tax" price={tax} />
                <Row label="Shipping" price={shippingFee} />
                {itemTotal > 1000 && shippingFee > 0 && (
                    <Row
                        label="Shipping discount"
                        price={shippingFee}
                        isNegative
                    />
                )}
                <Divider />
                <Row label="Total" price={total} isTotal />
                <Divider />
                <Button
                    variant="plain"
                    disabled={discount > 0}
                    startDecorator={<ConfirmationNumberOutlined />}
                    endDecorator={
                        !open ? <ExpandMoreOutlined /> : <ExpandLessOutlined />
                    }
                    sx={{ ":hover": { backgroundColor: "white" } }}
                    onClick={() => setOpen(!open)}
                >
                    Apply discount code
                </Button>
                {open ? (
                    <div>
                        {error ? (
                            <Alert variant="soft" color="danger" sx={{ mb: 2 }}>
                                Invalid discount code
                            </Alert>
                        ) : null}

                        <Input
                            key="discount-code-input"
                            sx={{ "--Input-decoratorChildHeight": "45px" }}
                            placeholder="Code"
                            value={discountCode}
                            onChange={(e) => setDiscountCode(e.target.value)}
                            endDecorator={
                                <Button
                                    variant="solid"
                                    color="primary"
                                    sx={{
                                        borderTopLeftRadius: 0,
                                        borderBottomLeftRadius: 0,
                                    }}
                                    onClick={() => validateDiscount()}
                                >
                                    Apply
                                </Button>
                            }
                        />
                    </div>
                ) : null}
            </Sheet>
        </>
    );
};
