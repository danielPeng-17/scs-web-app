import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Grid, Button, Alert, Table, Divider } from "@mui/joy";
import { ShoppingCartCheckoutOutlined } from "@mui/icons-material";

import { Container } from "../../components/container/Container";
import { getShoppingCart } from "../../services";
import { ShoppingCartItem } from "./ShoppingCartItem";
import { updateTotalPrice } from "./store/sliceReducer";
import { useNavigate } from "react-router-dom";
import { roundNumberToTwoDeciamls } from "../../utils/utils";

export const ShoppingCart = () => {
    const dispatch = useDispatch();
    const authState = useSelector((state) => state.auth);
    const state = useSelector((state) => state.cart);
    const navigate = useNavigate();

    const isLoggedIn = authState.isLoggedIn;

    const [shoppingCart, setShoppingCart] = useState(null);

    const total = useMemo(() => {
        const getCartItem = (id) =>
            state.items.find((item) => item.id === id) ?? null;

        return shoppingCart && state.items.length > 0
            ? shoppingCart.reduce(
                  (acc, item) =>
                      acc +
                      Number(item.price) *
                          (getCartItem(item.id)?.quantity ?? 0),
                  0
              )
            : 0;
    }, [shoppingCart, state.items]);

    useEffect(() => {
        if (shoppingCart == null && state.items.length > 0) {
            // take out the quantity value from the object when sending to API
            getShoppingCart(state.items).then((res) =>
                setShoppingCart(res.data)
            );
        }
    }, [shoppingCart, setShoppingCart, state.items]);

    const tableHeadings = ["Description", "Quantity", "Price", "Remove"];

    return (
        <Container name="Shopping Cart">
            {state.items.length > 0 ? (
                <>
                    <Table stripe="odd" sx={{ fontSize: "1.1em" }}>
                        <thead>
                            <tr>
                                {tableHeadings.map((heading) => (
                                    <th
                                        key={heading}
                                        style={{
                                            width:
                                                heading === "Description"
                                                    ? "40%"
                                                    : undefined,
                                            textAlign: "center",
                                            paddingBottom: "1.25em",
                                        }}
                                    >
                                        {heading}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {state.items && shoppingCart
                                ? state.items.map((item) => (
                                      <ShoppingCartItem
                                          key={item.id}
                                          item={shoppingCart.find(
                                              (x) => x.id === item.id
                                          )}
                                      />
                                  ))
                                : null}
                        </tbody>
                    </Table>
                    <Divider />
                    <Alert color="warning" sx={{ mt: 2 }}>
                        Limited time only: Free shipping for subtotals over
                        $1000.00 & checkout with code:{" "}
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
                    <div style={{ display: "flex", justifyContent: "right" }}>
                        <Grid container direction="column" sx={{ mt: "2em" }}>
                            <div
                                style={{
                                    border: "4px solid",
                                    borderColor: "#ECECEC",
                                    padding: "1.5em 1.75em",
                                }}
                            >
                                <Typography level="h4">
                                    Subtotal: ${roundNumberToTwoDeciamls(total)}
                                </Typography>
                            </div>
                            {!isLoggedIn && (
                                <Alert
                                    variant="soft"
                                    color="danger"
                                    sx={{ width: "340px", textAlign: "center" }}
                                >
                                    <span style={{ width: "100%" }}>
                                        You must log in before proceeding to
                                        checkout!
                                    </span>
                                </Alert>
                            )}
                            <Button
                                sx={{ mt: "2em", letterSpacing: "1px" }}
                                color={isLoggedIn ? "primary" : "neutral"}
                                disabled={!isLoggedIn}
                                onClick={() => {
                                    if (isLoggedIn) {
                                        dispatch(updateTotalPrice({ total }));
                                        navigate("/shoppingCart/checkout");
                                    }
                                }}
                                endDecorator={<ShoppingCartCheckoutOutlined />}
                            >
                                Checkout
                            </Button>
                        </Grid>
                    </div>
                </>
            ) : (
                <div
                    style={{
                        height: "500px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <p>Currently, there are no items in your shopping cart.</p>
                </div>
            )}
        </Container>
    );
};
