import React from "react";
import { Nav } from "../../compoents/nav/Nav";
import { Catalog } from "../../compoents/shop/Catalog";
import Typography from '@mui/joy/Typography';
import { padding } from "@mui/system";


export const Home = () => {
    return (
        <div>
            <Nav />
            <div>
                <Typography 
                    sx={{padding: '0.5em 0 0.5em 0.5em'}} level="display2">Electronics</Typography>
                <Catalog></Catalog>
            </div>
        </div>
    );
}