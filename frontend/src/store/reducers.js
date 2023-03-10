import { combineReducers } from "@reduxjs/toolkit";
import authReducer from '../auth/store/sliceReducer';
import cartReducer from '../pages/shoppingCart/store/sliceReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    cart: cartReducer
});

export default rootReducer;
