import React from "react";
import { ListItem } from "@mui/joy";
import { styled } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import { Box } from "@mui/joy";

export const Review = ({ reviewItem }) => {
    return(
        <ListItem>
            <Box>
            <Typography level="h6">{reviewItem.username}</Typography>
            <Typography level="h6">{reviewItem.title} | {' '} Rating: {reviewItem.score}</Typography>
            <Typography level="body2" pb={ '1em' }>Date: {reviewItem.date}</Typography>
            <Typography levl="body1">{reviewItem.reviewContent}</Typography>
            </Box>
        </ListItem>
    );
}