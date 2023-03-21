import ListItem from "@mui/joy/ListItem";
import { AspectRatio, Typography, Sheet, styled, Grid } from "@mui/joy";

const Item = styled(Sheet)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "left",
    color: theme.vars.palette.text.tertiary,
}));

export const ShoppingCartItem = ({ item, quantity }) => {
    return (
        <ListItem>
            <Grid md={2}>
                <Item>
                    <AspectRatio objectFit="contain" sx={{ my: 2 }}>
                        <img src={item.imageURL} loading="lazy" alt="" />
                    </AspectRatio>
                </Item>
            </Grid>
            <Grid md={6}>
                <Item>
                    <div className="productInfo" style={{ paddingTop: "1em" }}>
                        <Typography level="h3" sx={{ paddingBottom: "0.5em" }}>
                            {item.name}
                        </Typography>
                        <Typography level="body1">
                            {item.description}
                        </Typography>
                        <Typography level="body2">
                            Brand: {item.brand}
                        </Typography>
                        <Typography level="body2">
                            Seller: {item.seller}
                        </Typography>
                        <Typography level="body2">${item.price}</Typography>
                        <Typography level="body2">
                            Quantity: {quantity}
                        </Typography>
                    </div>
                </Item>
            </Grid>
            <Grid md={4} />
        </ListItem>
    );
};
