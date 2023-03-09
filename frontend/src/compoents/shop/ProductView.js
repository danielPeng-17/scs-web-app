import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

export const ProductView = () => {
    let { productId } = useParams();
    let mockData = {
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
    
    useEffect(() => {
        // some api call to fetch the product based off productId
    }, []);

    return(
        <>This is the product page</>
    );
    
}