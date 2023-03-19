import { combineReducers } from "@reduxjs/toolkit";
import authReducer from '../auth/store/sliceReducer';
import cartReducer from '../pages/shoppingCart/store/sliceReducer';
import dbmReducer from '../pages/dbMaintain/store/sliceReducer';

import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist'

const authPersistConfig = {
    key: 'auth',
    storage: storage
}

const rootReducer = combineReducers({
    auth: persistReducer(authPersistConfig, authReducer),
    cart: cartReducer,
    dbm: dbmReducer
});

export default rootReducer;
