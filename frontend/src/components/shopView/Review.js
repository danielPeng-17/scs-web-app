import React from "react";
import { Divider, Grid, ListDivider, ListItem } from "@mui/joy";
import { styled } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import { Box } from "@mui/joy";

const Item = styled(Sheet)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.vars.palette.text.tertiary,
}));

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