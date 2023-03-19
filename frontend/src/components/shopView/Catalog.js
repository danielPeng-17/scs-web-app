import * as React from 'react';
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import Badge from '@mui/joy/Badge';
import Typography from '@mui/joy/Typography';
import { IconButton } from '@mui/joy';
import { ItemCard } from './ItemCard';
import { useEffect, useState } from 'react';
import { getProducts } from '../../services';
import { dropInstance } from 'localforage';

export const Catalog = () => {
  const [products, setProducts] = useState(null);
  const [shoppingCart, setShoppingCart] = useState(null);

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("id", id);
  }

  const handleDrop = (e) => {
    console.log(e.dataTransfer.getData("id"));
  }

  const handleDragOver = e => {
    e.preventDefault();
  }
  
  const addToShoppingCart = () => {
    
  }

  useEffect(() => {
    if (products == null) {
      getProducts().then(res => {
        const data = res.data;
        setProducts(data);
      });
    }
  }, [products, setProducts]);

  return(
    <div style={{ position: "relative", minHeight: "100vh" }}>
      <Box sx={{ flexGrow: 1 }}>
        <List sx={{"--ListItem-paddingX": "14px", "--ListItem-paddingY": "12px"}} orientation="horizontal">
            {products && products.map((item) => {
              return (
                <div 
                  key={item.id} 
                  draggable="true" 
                  onDragStart={e => handleDragStart(e, item.id)}
                >
                  <ItemCard item={item}/>
                </div>
              );
            }
            )}
        </List>
      </Box>
      <div 
        style={{ position: "fixed", bottom: "20px", right: "20px"}}
        onDrop={e => handleDrop(e)}
        onDragOver={e => handleDragOver(e)}
      >
        <IconButton color="neutral">
          <Badge badgeContent={shoppingCart ? shoppingCart.length : 0} sx={{padding: "1em"}}>
            <Typography fontSize="2em">🛒</Typography>
          </Badge>
        </IconButton>
      </div>
    </div>

  );
}