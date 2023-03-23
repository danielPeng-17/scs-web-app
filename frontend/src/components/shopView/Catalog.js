import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IconButton, List, Box } from "@mui/joy";
import { ShoppingCartOutlined } from "@mui/icons-material";

import { ItemCard } from "./ItemCard";
import { getProducts } from "../../services";
import { addCartAction } from "../../pages/shoppingCart/store/sliceReducer";


export const Catalog = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [products, setProducts] = useState(null);

    const handleDragStart = (e, id) => {
        e.dataTransfer.setData("id", id);
    };

    const handleDrop = (e) => {
        let id = e.dataTransfer.getData("id");

        dispatch(
            addCartAction({
                id: Number(id),
                quantity: 1,
            })
        );
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    useEffect(() => {
        if (products == null) {
            getProducts().then((res) => {
                const data = res.data;
                setProducts(data);
            });
        }
    }, [products, setProducts]);

    return (
        <div style={{ position: "relative" }}>
            <Box sx={{ flexGrow: 1 }}>
                <List
                    sx={{
                        "--ListItem-paddingX": "14px",
                        "--ListItem-paddingY": "12px",
                    }}
                    orientation="horizontal"
                >
                    {products &&
                        products.map((item) => {
                            return (
                                <div
                                    key={item.id}
                                    draggable="true"
                                    onDragStart={(e) =>
                                        handleDragStart(e, item.id)
                                    }
                                >
                                    <ItemCard item={item} />
                                </div>
                            );
                        })}
                </List>
            </Box>
            <div
                style={{ position: "fixed", bottom: "20px", right: "20px" }}
                onDrop={(e) => handleDrop(e)}
                onDragOver={(e) => handleDragOver(e)}
            >
                <IconButton
                    color="neutral"
                    sx={{ p: "1em 1.25em", width: "128px", height: "128px" }}
                    onClick={() => {
                        navigate("/shoppingCart");
                    }}
                >
                    <ShoppingCartOutlined
                        sx={{
                            width: "64px",
                            height: "64px",
                        }}
                    />
                </IconButton>
            </div>
        </div>
    );
};
