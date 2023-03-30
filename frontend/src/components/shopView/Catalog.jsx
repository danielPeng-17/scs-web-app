import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IconButton, Box, Sheet } from "@mui/joy";
import { ShoppingCartOutlined } from "@mui/icons-material";

import { ItemCard } from "./ItemCard";
import { getProducts } from "../../services";
import { addCartAction } from "../../pages/shoppingCart/store/sliceReducer";
import { setToast } from "../container/store/sliceReducer";

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

        dispatch(setToast(true));
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
                <Sheet
                    sx={{
                        mt: 4,
                        display: "grid",
                        gridColumnGap: "12px",
                        gridRowGap: '32px',
                        gridTemplateColumns: "repeat(auto-fill, minmax(356px, 1fr))",
                    }}
                >
                    {products &&
                        products.map((item) => (
                            <div
                                key={item.id}
                                draggable="true"
                                onDragStart={(e) => handleDragStart(e, item.id)}
                                style={{ width: 'fit-content' }}
                            >
                                <ItemCard item={item} />
                            </div>
                        ))}
                </Sheet>
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
