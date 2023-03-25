import { useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";

const SearchBar = ({ onSearch }) => {
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [orderId, setOrderId] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSearch = () => {
    onSearch({ userId, orderId });
    handleClose();
  };

  return (
    <>
      <Button startIcon={<Search />} onClick={handleOpen}>
        Search
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Search Orders</DialogTitle>
        <DialogContent>
          <TextField
            label="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Order ID"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSearch} variant="contained" color="primary">
            Search
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SearchBar;
