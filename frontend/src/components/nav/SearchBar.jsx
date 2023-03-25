import { useState } from "react";
import { Input, Button } from "@mui/material";
import { Search } from "@mui/icons-material";

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const onSearch = () => {
        fetch("http://localhost:80/scs/orders.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userid: searchQuery }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.exists) {
                    alert("Order done");
                } else {
                    alert("Order does not exist");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    return (
        <div>
            <Input
                placeholder="Search"
                sx={{
                    borderRadius: "25px",
                }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        onSearch();
                    }
                }}
                endDecorator={
                    <Button
                        variant="outlined"
                        color="neutral"
                        sx={{ border: "none", borderRadius: "25px" }}
                        onClick={onSearch}
                    >
                        <Search />
                    </Button>
                }
            />
        </div>
    );
};

export default SearchBar;


