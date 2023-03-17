import * as React from 'react';
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import { ItemCard } from './ItemCard';
import { useEffect, useState } from 'react';
import { getProducts } from '../../services';

export const Catalog = () => {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    if (products == null) {
      getProducts().then(res => {
        const data = res.data;
        setProducts(data);
      });
    }
  }, [products, setProducts]);

  return(
    <Box component="nav" aria-label="My site" sx={{ flexGrow: 1 }}>
      <List sx={{"--ListItem-paddingX": "14px", "--ListItem-paddingY": "12px"}} orientation="horizontal">
          {products && products.map((item) => 
              <ItemCard key={item.id} item={item}/>
          )}
      </List>
    </Box>
  );
}