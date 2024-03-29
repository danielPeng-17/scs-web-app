import { useDispatch } from "react-redux";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import ListItem from "@mui/joy/ListItem";
import { Link } from "react-router-dom";
import { addCartAction } from "../../pages/shoppingCart/store/sliceReducer";
import { setToast } from "../container/store/sliceReducer";

export const ItemCard = ({ item }) => {
    const dispatch = useDispatch();

    return (
        <ListItem role="none" sx={{ pl: 0, pr: 3 }}>
            <Card variant="outlined" sx={{ width: 320 }}>
                <Link
                    style={{ padding: 0 }}
                    to={`/product/${item.id}`}
                    draggable="false"
                >
                    <Typography level="h2" fontSize="md" sx={{ mb: 0.5 }}>
                        {item.name}
                    </Typography>
                </Link>
                <Typography level="body2">Rating: {item.rating}</Typography>
                <AspectRatio minHeight="120px" maxHeight="200px" sx={{ my: 2 }}>
                    <img
                        draggable="false"
                        src={item.imageURL}
                        loading="lazy"
                        alt=""
                    />
                </AspectRatio>
                <Box sx={{ display: "flex" }}>
                    <div>
                        <Typography level="body3">Total price:</Typography>
                        <Typography fontSize="lg" fontWeight="lg">
                            ${item.price}
                        </Typography>
                    </div>
                    <Button
                        variant="solid"
                        size="sm"
                        color="primary"
                        sx={{ ml: "auto", fontWeight: 600 }}
                        onClick={() => {
                            dispatch(
                                addCartAction({
                                    id: item.id,
                                    quantity: 1,
                                })
                            );
                            dispatch(setToast(true));
                        }}
                    >
                        Add to Cart
                    </Button>
                </Box>
            </Card>
        </ListItem>
    );
};
