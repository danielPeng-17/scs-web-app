import { combineReducers } from "@reduxjs/toolkit";
import authReducer from '../auth/store/sliceReducer';

const rootReducer = combineReducers({
    auth: authReducer
});

export default rootReducer;
