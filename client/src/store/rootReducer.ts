import { combineReducers } from "@reduxjs/toolkit";
import ChatReducer from "../features/chat/chatSlice.ts"
import authSlice from "../features/auth/authSlice.ts";

const rootReducer = combineReducers({
    auth: authSlice,
    chat: ChatReducer
});

export default rootReducer