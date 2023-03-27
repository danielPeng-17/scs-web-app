import { useState} from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";
import { getOrderWithIds } from "../../../services";

const SearchBar = () => {
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [id, setId] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [order, setOrder] = useState({});

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setError("");
    setSuccess("");
  };

  const handleSearch = async () => {
    try {
      if (order && order.userId === userId && order.id === id) {
        setSuccess("Order DONE");
        setError("");
      } else {
          const result = await getOrderWithIds({ userId, id });
          setOrder(result.data);
          if (result.data.userId === userId && result.data.id === id) {
            setSuccess("Order DONE");
            setError("");
          } else {
            setError("Order does not exist");
            setSuccess("");
          }
      }
    }
    catch {
      setError("Error");
      setSuccess("");
    }
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
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
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