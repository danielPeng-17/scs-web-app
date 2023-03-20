import * as React from 'react';
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import Badge from '@mui/joy/Badge';
import Typography from '@mui/joy/Typography';
import { IconButton } from '@mui/joy';
import { ItemCard } from './ItemCard';
import { useEffect, useState } from 'react';
import { getProducts } from '../../services';
import { useDispatch } from "react-redux";
import { addCartAction } from '../../pages/shoppingCart/store/sliceReducer';
import { Link } from "react-router-dom";

export const Catalog = () => {
  const [products, setProducts] = useState(null);
  const [shoppingCart, setShoppingCart] = useState(null);

  const dispatch = useDispatch();

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("id", id);
  }

  const handleDrop = (e) => {
    let id = e.dataTransfer.getData("id");
    let payload = {
      id: id,
      quantity: 1
    }
    dispatch(addCartAction(payload));
  }

  const handleDragOver = e => {
    e.preventDefault();
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
    <div style={{ position: "relative"}}>
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
        
        <Link to={"/shoppingCart"}>
          <IconButton color="neutral">
            <Badge badgeContent={shoppingCart ? shoppingCart.length : 0} sx={{padding: "1em"}}>
              <Typography fontSize="2em">🛒</Typography>
            </Badge>
          </IconButton>
        </Link>
      </div>
    </div>

  );
}