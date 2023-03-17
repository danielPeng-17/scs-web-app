import React from "react";
import { Nav } from "../../components/nav/Nav";
import { Catalog } from "../../components/shopView/Catalog";
import Typography from '@mui/joy/Typography';

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