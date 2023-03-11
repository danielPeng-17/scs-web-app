import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Nav } from '../../components/nav/Nav';
import { Divider, List, AspectRatio, Typography, Sheet, styled, Grid, Button, Box, Select, Option } from '@mui/joy';
import { Review } from '../../components/shopView/Review';

const Item = styled(Sheet)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.vars.palette.text.tertiary,
}));

export const ProductView = () => {
    const [quantity, setQuantity] = useState(0);
    
    let { productId } = useParams();
    let product = {
        productId: 2,
        imageUrl: "https://images.unsplash.com/photo-1605296830714-7c02e14957ac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
        productName: "Playstation 5",
        brand: "Sony",
        productDescription: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse nec sem posuere, interdum dui vitae, mollis mauris. 
        " Nam viverra sapien id libero bibendum, at pulvinar nulla efficitur. Vivamus vel felis facilisis leo elementum tincidunt ac ac est. Nullam 
        ipsum orci, vulputate eget egestas sed, sodales eu velit. Nullam mattis, nunc ac convallis egestas, sem purus fermentum nibh, eget pretium 
        ante purus sit amet eros. Ut tincidunt neque nisl, a euismod dui dignissim ac. Ut vel vestibulum nibh. Integer auctor consectetur neque, 
        et hendrerit ex. Etiam faucibus tellus dolor. Ut at ornare neque. In a erat at turpis tincidunt volutpat at id purus.`,
        productQuantity: 5,
        seller: "Sony",
        price: 500.00,
        reviews: [
            {
                reviewId: 1,
                username: "Joe",
                score: 5,
                title: "A very good console",
                date: "March 6, 2023",
                reviewContent: `Nullam mattis, nunc ac convallis egestas, sem purus fermentum nibh, eget pretium 
                ante purus sit amet eros. Ut tincidunt neque nisl, a euismod dui dignissim ac. Ut vel vestibulum nibh. Integer auctor consectetur neque, 
                et hendrerit ex. Etiam faucibus tellus dolor. Ut at ornare neque. In a erat at turpis tincidunt volutpat at id purus.`,
                recommended: true

            },
            {
                reviewId: 2,
                username: "Joe",
                score: 6,
                title: "A pretty decent console",
                date: "March 6, 2023",
                reviewContent: `Nullam mattis, nunc ac convallis egestas, sem purus fermentum nibh, eget pretium 
                ante purus sit amet eros. Ut tincidunt neque nisl, a euismod dui dignissim ac. Ut vel vestibulum nibh. Integer auctor consectetur neque, 
                et hendrerit ex. Etiam faucibus tellus dolor. Ut at ornare neque. In a erat at turpis tincidunt volutpat at id purus.`,
                recommended: true
            }
        ],
        rating: 3
    }

    useEffect(() => {
        // some api call to fetch the product based off productId
    }, []);

    return(
        <>
            <Nav />
            <Grid container direction="row" justifyContent="center" sx={{ flexGrow: 1, paddingTop: '2em'}}>
                <Grid md={6}>
                    <Item>
                        <AspectRatio objectFit="contain" sx={{ my: 2 }}>
                        <img
                            src={product.imageUrl}
                            loading="lazy"
                            alt=""
                        />
                        </AspectRatio>
                    </Item>
                </Grid>
                <Grid md={4}>
                    <Item>
                        <div className="productInfo" style={{paddingTop: '1em'}}>
                            <Typography level="h3" sx={{ paddingBottom: '0.5em'}}>{product.productName}</Typography>
                            <Typography level="body1" >User Ratings: {product.rating}</Typography>
                            <Typography level="body2">Brand: {product.brand}</Typography>
                            <Typography level="body2">Seller: {product.seller}</Typography>
                            <Typography level="h4">${product.price}</Typography>
                            <Typography level="body1">{product.productDescription}</Typography>
                        </div>
                        <div className='actions'>
                            <Select defaultValue="1" sx={{maxWidth: '4em', mt: '1em' }}>
                                <Option value="1">1</Option>
                                <Option value="2">2</Option>
                                <Option value="3">3</Option>
                                <Option value="4">4</Option>
                                <Option value="5">5</Option>
                            </Select>
                            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', paddingTop: '2em' }}>
                                <Button>Add to cart</Button>
                                <Button>Buy now</Button>
                            </Box>
                        </div>
                    </Item>
                </Grid>
            </Grid>
             <Grid container direction="row">
                <Grid md/>
                <Grid md={10}>
                    <Item>
                        <Typography level="h4">Customer Reviews: {product.reviews.length}</Typography>
                        <Divider />
                        <List orientation="vertical">
                            {product.reviews.map((reviewItem) => {
                                return (
                                <div key={reviewItem.reviewId}>
                                    <Review reviewItem={reviewItem} /> 
                                    <Divider />
                                </div>
                                )
                            })}
                        </List>
                    </Item>
                </Grid>
                <Grid md/>
            </Grid>
        </>
    );
    
}