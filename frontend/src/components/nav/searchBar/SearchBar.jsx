import { useState, useEffect } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";
import { getOrderWithIds } from "../../../services";

const SearchBar = ({ onSearch }) => {
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [id, setId] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [order, setOrder] = useState({});

  useEffect(() => {
    const fetchOrder = async () => {
      if (userId && id) {
        try {
          const result = await getOrderWithIds({ userId, id });
          setOrder(result);
        } catch (error) {
          // If there is an error while fetching the order, log the error to the console and display an error message to the user
          console.log("Error fetching order:", error);
          setError("Failed to fetch order. Please try again.");
        }
      }
    };

    fetchOrder();
  }, [userId, id]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setError("");
    setSuccess("");
  };

  const handleSearch = async () => {
    if (order && order.userId === userId && order.id === id) {
      onSearch({ userId, id });
      setSuccess("Order DONE");
    } else {
      try {
        const result = await getOrderWithIds({ userId, id });
        setOrder(result);
        if (result.userId === userId && result.id === id) {
          onSearch({ userId, id });
          setSuccess("Order DONE");
        } else {
          setError("Order does not exist");
        }
      } catch (error) {
        setError("Order does not exist");
      }
    }
  };

  const handleUserIdFocus = () => {
    setUserId("");
    setError("");
    setSuccess("");
  };

  const handleIdFocus = () => {
    setId("");
    setError("");
    setSuccess("");
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
            label="Order ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
            onFocus={handleIdFocus}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            onFocus={handleUserIdFocus}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          {error && (
            <p style={{ color: "red", marginTop: "16px" }}>{error}</p>
          )}
          {success && (
            <p style={{ color: "green", marginTop: "16px" }}>{success}</p>
          )}
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