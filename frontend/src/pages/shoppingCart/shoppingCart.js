import { useDispatch, useSelector } from "react-redux";
import { Container } from "../../components/container/Container";
import { List, AspectRatio, Typography, Sheet, styled, Grid, Box, Button } from '@mui/joy';
import { useEffect, useState } from "react";
import { getShoppingCart } from "../../services";
import { ShoppingCartItem } from "./ShoppingCartItem";
import { updateTotalPrice } from "./store/sliceReducer";

export const ShoppingCart = () => {
    const dispatch = useDispatch();
    const state = useSelector((state) => state.cart);

    const [shoppingCart, setShoppingCart] = useState(null);
    const total = shoppingCart != null ? shoppingCart.reduce((a, b) => a + Number(b.price) * state.items.find((item) => Number(item.id) == b.id).quantity, 0) : 0;

    const checkout = () => {
        let payload = {
            total
        }
        dispatch(updateTotalPrice(payload));
    }

    useEffect(() => {
        if (shoppingCart == null) {
            // take out the quantity value from the object when sending to API
            getShoppingCart(state.items).then((res) => {
                const data = res.data;
                setShoppingCart(data);
            });
        }
    }, [shoppingCart, setShoppingCart]);

    return (
        <Container name="Shopping Cart">
            <Grid container direction="row" sx={{ flexGrow: 1, paddingTop: '2em'}}>
                <List>
                {shoppingCart && shoppingCart.map((item) => {
                    const quantity = state.items.find((i) => Number(i.id) == item.id).quantity
                    return(
                        <ShoppingCartItem key={item.id} item={item} quantity={quantity}/>
                    );
                })}
                </List>
            </Grid>
            <Grid container direction="row" sx={{ flexGrow: 1, paddingTop: '2em'}}>
                <Typography level="h4">Total: {total} </Typography>
            </Grid>
            <Button sx={{mt: "2em" }} onClick={() => checkout()}>
                Checkout
            </Button>
        </Container>
    );
}
