import { useDispatch, useSelector } from "react-redux";
import { Container } from "../../components/container/Container";
import { List, Typography, Grid, Button } from "@mui/joy";
import { useEffect, useState } from "react";
import { getShoppingCart } from "../../services";
import { ShoppingCartItem } from "./ShoppingCartItem";
import { updateTotalPrice } from "./store/sliceReducer";

export const ShoppingCart = () => {
    const dispatch = useDispatch();
    const state = useSelector((state) => state.cart);

    const [shoppingCart, setShoppingCart] = useState(null);

    const getQuantity = (id) =>
        state.items.find((item) => item.id === `${id}`).quantity;

    const total = shoppingCart
        ? shoppingCart.reduce(
              (a, b) => a + Number(b.price) * getQuantity(b.id),
              0
          )
        : 0;

    useEffect(() => {
        if (shoppingCart == null) {
            // take out the quantity value from the object when sending to API
            getShoppingCart(state.items).then((res) => {
                const data = res.data;
                setShoppingCart(data);
            });
        }
    }, [shoppingCart, setShoppingCart, state.items]);

    return (
        <Container name="Shopping Cart">
            <Grid
                container
                direction="row"
                sx={{ flexGrow: 1, paddingTop: "2em" }}
            >
                <List>
                    {shoppingCart &&
                        shoppingCart.map((item) => (
                            <ShoppingCartItem
                                key={item.id}
                                item={item}
                                quantity={getQuantity(item.id)}
                            />
                        ))}
                </List>
            </Grid>
            <Grid
                container
                direction="row"
                sx={{ flexGrow: 1, paddingTop: "2em" }}
            >
                <Typography level="h4">Total: ${total} </Typography>
            </Grid>
            <Button
                sx={{ mt: "2em" }}
                onClick={() => dispatch(updateTotalPrice({ total }))}
            >
                Checkout
            </Button>
        </Container>
    );
};
