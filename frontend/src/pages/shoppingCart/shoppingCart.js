import { useDispatch, useSelector } from "react-redux";
import { Nav } from '../../components/nav/Nav';

export const ShoppingCart = () => {
    const dispatch = useDispatch();
    const state = useSelector((state) => state.cart);

    return (
        <>
            <Nav />
            Shopping Cart Page
        </>
    );
}
