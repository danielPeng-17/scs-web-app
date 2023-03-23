import { useDispatch, useSelector } from "react-redux";
import { AspectRatio, IconButton } from "@mui/joy";
import { DeleteOutline, Remove, Add } from "@mui/icons-material";
import {
    removeCartItemAction,
    updateCartItemAction,
} from "./store/sliceReducer";
import { roundNumberToTwoDeciamls } from "../../utils/utils";

export const ShoppingCartItem = ({ item }) => {
    const dispatch = useDispatch();
    const state = useSelector(state => state.cart);

    const itemIndex = state.items.findIndex(x => x.id === item.id);
    const quantity = itemIndex > -1 ? state.items[itemIndex].quantity : 0;

    const Label = ({ text, value }) => (
        <p style={{ fontSize: "0.8em", margin: "4px auto" }}>
            {text}: <span style={{ fontWeight: "600" }}>{value}</span>
        </p>
    );

    const StyledIconButton = ({ children, onClick, disabled }) => (
        <IconButton
            variant="outlined"
            color="neutral"
            sx={{ borderRadius: "30px", p: 2 }}
            disabled={disabled ? disabled : false}
            onClick={onClick ? onClick : () => {}}
        >
            {children}
        </IconButton>
    );

    return (
        <tr style={{ textAlign: "center" }}>
            <td>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "center",
                    }}
                >
                    <AspectRatio
                        objectFit="contain"
                        sx={{ my: 2, height: "100%", width: "256px" }}
                    >
                        <img src={item.imageURL} loading="lazy" alt="" />
                    </AspectRatio>

                    <div style={{ marginLeft: "1.75em", textAlign: "left" }}>
                        <h3 style={{ fontWeight: "bold" }}>{item.name}</h3>
                        <Label text="Brand" value={item.brand} />
                        <Label text="Seller" value={item.seller} />
                    </div>
                </div>
            </td>
            <td>
                <div style={{ display: "inline-flex" }}>
                    <StyledIconButton
                        onClick={() =>
                            dispatch(
                                updateCartItemAction({
                                    id: item.id,
                                    quantity: quantity - 1,
                                })
                            )
                        }
                        disabled={quantity === 1}
                    >
                        <Remove />
                    </StyledIconButton>
                    <h3 style={{ margin: "auto 1em" }}>{quantity}</h3>
                    <StyledIconButton
                        onClick={() =>
                            dispatch(
                                updateCartItemAction({
                                    id: item.id,
                                    quantity: quantity + 1,
                                })
                            )
                        }
                    >
                        <Add />
                    </StyledIconButton>
                </div>
            </td>
            <td>
                <h3>{`$${roundNumberToTwoDeciamls(
                    Number(item.price) * quantity
                )}`}</h3>
            </td>
            <td>
                <StyledIconButton
                    onClick={() =>
                        dispatch(removeCartItemAction({ id: item.id }))
                    }
                >
                    <DeleteOutline sx={{ width: "1.25em", height: "1.25em" }} />
                </StyledIconButton>
            </td>
        </tr>
    );
};
