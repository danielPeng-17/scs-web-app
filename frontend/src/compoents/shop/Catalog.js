import * as React from 'react';
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import { ItemCard } from './ItemCard';

let mockAllItems = [
  { 
    productId: 1,
    imageUrl: "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2680&q=80",
    productName: "IPhone 14",
    brand: "Apple",
    productDescription: "Something about IPhones",
    productQuantity: 3,
    seller: "Apple",
    price: 1400.00,
    reviews: [],
    rating: 4
  }
  ,
  {
  productId: 2,
  imageUrl: "https://images.unsplash.com/photo-1605296830714-7c02e14957ac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
  productName: "Playstation 5",
  brand: "Sony",
  productDescription: "Something about PS5",
  productQuantity: 5,
  seller: "Sony",
  price: 500.00,
  reviews: [],
  rating: 3
  }
]

export const Catalog = () => {
    return(
      <Box component="nav" aria-label="My site" sx={{ flexGrow: 1 }}>
        <List sx={{"--ListItem-paddingX": "14px", "--ListItem-paddingY": "12px"}} orientation="horizontal">
            {mockAllItems.map((item) => 
               <ItemCard key={item.productId} item={item}/>
            )}
        </List>
      </Box>
    );
}