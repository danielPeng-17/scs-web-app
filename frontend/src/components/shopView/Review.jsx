import React from "react";
import { ListItem } from "@mui/joy";
import Typography from '@mui/joy/Typography';
import { Box } from "@mui/joy";

export const Review = ({ reviewItem }) => {
    return(
        <ListItem>
            <Box>
            <Typography level="h6">{reviewItem.name}</Typography>
            <Typography level="h6">{reviewItem.headline} | {' '} Rating: {reviewItem.rating}</Typography>
            <Typography level="body2" pb={ '1em' }>Date: {reviewItem.date}</Typography>
            <Typography levl="body1">{reviewItem.content}</Typography>
            </Box>
        </ListItem>
    );
}