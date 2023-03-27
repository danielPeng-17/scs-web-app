import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Input, FormLabel, Textarea, Button, Select, Option, FormControl, Grid, Typography, Divider, Box, Alert, IconButton } from "@mui/joy";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { addReview } from "../../services";

export const ReviewForm = () => {
    const [rating, setRating] = useState("");
    const [headline, setHeadline] = useState("");
    const [content, setContent] = useState("");
    const [name, setName] = useState("");
    const [reviewComplete, setReviewComplete] = useState(false);
    const [showError, setShowError] = useState(false);

    const state = useSelector((state) => state.auth);

    const navigate = useNavigate();
    let { productId } = useParams();
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (state && state.isLoggedIn) {
        if (rating && headline && content && name) {
            let payload = {
                productId: productId,
                name: name,
                headline: headline,
                content: content,
                rating: rating
            }
    
            addReview(payload)
                .then((res) => {
                    if (res.success === false) {
                        throw new Error(res.statusText);
                    }
                    setReviewComplete(true);
                })
                .catch((error) => {
                    console.error(error);
                });

        } else {
            setShowError(true);
          }
      }
    };

    const handleAlertClose = () => {
        setShowError(false);
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)}> 
            <Grid container spacing={2} sx={{ flexGrow: 1, mt: "3em" }}>
                <Grid md={3}/>
                <Grid md={6}>
                    <Typography level="h3">Write your review</Typography>
                    <Divider sx={{mb: "2em"}}/>
                    <FormControl sx={{pb: "1em"}}>
                    <FormLabel htmlFor="rating">Overall rating (1-5)</FormLabel>
                    <Select
                        onChange={(e, value) => setRating(value)}
                        >
                            <Option value={1}>1</Option>
                            <Option value={2}>2</Option>
                            <Option value={3}>3</Option>
                            <Option value={4}>4</Option>
                            <Option value={5}>5</Option>
                    </Select>
                    </FormControl>
            
                    <FormControl sx={{pb: "1em"}}>
                        <FormLabel htmlFor="headline">Headline</FormLabel>
                        <Input
                        id="headline"
                        value={headline}
                        onChange={(e) => setHeadline(e.target.value)}
                        />
                    </FormControl>
                
                    <FormControl sx={{pb: "1em"}}>
                        <FormLabel htmlFor="content">Written review</FormLabel>
                        <Textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        sx={{height: "200px"}}
                        />
                    </FormControl>
                
                    <FormControl sx={{pb: "1em"}}>
                        <FormLabel htmlFor="name">Name</FormLabel>
                        <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        />
                    </FormControl>

                    {!reviewComplete ?
                        <Box sx={{display: "flex", gap: 2}}>
                            <Button type="submit">Submit</Button>
                            <Button type="button" onClick={() => navigate(-1)}>Cancel</Button>
                        </Box>
                        :
                        <Box sx={{display: "flex", gap: 2}}>
                            <Button type="button" onClick={() => navigate("/")}>Continue shopping</Button>
                        </Box>
                    }

                    {}

                    {showError && (
                        <Alert 
                            severity="error" 
                            sx={{ mt: 2 }}
                            color="danger"
                            endDecorator={
                                <IconButton variant="plain" size="sm" color="neutral">
                                    <CloseRoundedIcon onClick={() => handleAlertClose()} />
                                </IconButton>
                            }
                        >
                            Please fill in all fields before submitting.
                        </Alert>
                    )}

                    {reviewComplete && (
                        <Alert 
                        sx={{ mt: 2 }}
                        color="success"
                    >
                        Your review has been submited
                    </Alert>
                    )}
                </Grid>
                <Grid md={3} />
            </Grid>
        </form>
    );
};