import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Nav } from "../../components/nav/Nav";
import {
    Divider,
    List,
    AspectRatio,
    Typography,
    Sheet,
    styled,
    Grid,
    Button,
    Box,
    Select,
    Option,
} from "@mui/joy";
import { Review } from "../../components/shopView/Review";
import { getReviews, getSingleProduct } from "../../services";
import { useDispatch, useSelector } from "react-redux";
import { addCartAction } from "../shoppingCart/store/sliceReducer";

const Item = styled(Sheet)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "left",
    color: theme.vars.palette.text.tertiary,
}));

export const ProductView = () => {
    const [quantity, setQuantity] = useState(0);
    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState(null);
    const [avgRating, setAvgRating] = useState(0);

    const state = useSelector((state) => state.auth);
    const isLoggedIn = state.isLoggedIn;
    const navigate = useNavigate();

    let dispatch = useDispatch();
    let { productId } = useParams();
    

    const addToShoppingCart = () => {
        let payload = {
            id: productId,
            quantity: quantity,
        };

        dispatch(addCartAction(payload));
    };

    useEffect(() => {
        if (product == null) {
            getSingleProduct(productId).then((res) => {
                const data = res.data;
                setProduct(data);
            });
        }
    }, [product, setProduct, productId]);

    useEffect(() => {
        if (reviews == null) {
            getReviews(productId).then((res) => {
                if (res) {
                    const data = res.data.rows;
                    const avgData = res.data.avg_rating;
                    setReviews(data);
                    setAvgRating(Number(avgData).toFixed(1));
                }
            })
        }
    }, [reviews, setReviews, setAvgRating, productId])

    if (product) {
        return (
            <>
                <Nav />
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    sx={{ flexGrow: 1, paddingTop: "2em" }}
                >
                    <Grid md={6}>
                        <Item>
                            <AspectRatio objectFit="contain" sx={{ my: 2 }}>
                                <img
                                    src={product.imageURL}
                                    loading="lazy"
                                    alt=""
                                />
                            </AspectRatio>
                        </Item>
                    </Grid>
                    <Grid md={4}>
                        <Item>
                            <div
                                className="productInfo"
                                style={{ paddingTop: "1em" }}
                            >
                                <Typography
                                    level="h3"
                                    sx={{ paddingBottom: "0.5em" }}
                                >
                                    {product.name}
                                </Typography>
                                <Typography level="body1">
                                    User Ratings: {avgRating}
                                </Typography>
                                <Typography level="body2">
                                    Brand: {product.brand}
                                </Typography>
                                <Typography level="body2">
                                    Seller: {product.seller}
                                </Typography>
                                <Typography level="h4">
                                    ${product.price}
                                </Typography>
                                <Typography level="body1">
                                    {product.description}
                                </Typography>
                            </div>
                            <div className="actions">
                                <Select
                                    defaultValue="1"
                                    sx={{ maxWidth: "4em", mt: "1em" }}
                                    onChange={(e, value) => setQuantity(value)}
                                >
                                    <Option value="1">1</Option>
                                    <Option value="2">2</Option>
                                    <Option value="3">3</Option>
                                    <Option value="4">4</Option>
                                    <Option value="5">5</Option>
                                </Select>
                                <Box
                                    sx={{
                                        display: "flex",
                                        gap: 2,
                                        flexDirection: "column",
                                        paddingTop: "2em",
                                    }}
                                    >
                                    <Button sx={{maxWidth: "200px"}} onClick={() => addToShoppingCart()}>Add to cart</Button>
                                    {isLoggedIn && (
                                        <Button sx={{maxWidth: "200px", mt: "1em"}} onClick={() => navigate(`/reviewForm/${productId}`)}>Write a review</Button>
                                    )}
                                    </Box>
                            </div>
                        </Item>
                    </Grid>
                </Grid>
                <Grid container direction="row">
                    <Grid md />
                    <Grid md={10}>
                        <Item>
                            <Typography level="h5">
                                Total Reviews:{" "}
                                {reviews && reviews.length}
                                {reviews && reviews.length > 0 ? ` | Average Rating: ${avgRating}` : ''}
                            </Typography>
                            <Divider />
                            <List orientation="vertical">
                                {reviews &&
                                    reviews.map((reviewItem) => {
                                        return (
                                            <div key={reviewItem.id}>
                                                <Review
                                                    reviewItem={reviewItem}
                                                />
                                                <Divider />
                                            </div>
                                        );
                                    })}
                            </List>
                        </Item>
                    </Grid>
                    <Grid md />
                </Grid>
            </>
        );
    } else {
        return <></>;
    }
};
