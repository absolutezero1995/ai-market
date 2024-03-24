import { combineReducers } from "@reduxjs/toolkit";
import ChatReducer from "../features/chat/chatSlice.ts"
import authSlice from "../features/auth/authSlice.ts";
import getChatsFromCategoriesSlice from "../features/categoty.ts"

const rootReducer = combineReducers({
    auth: authSlice,
    chat: ChatReducer,
    chats: getChatsFromCategoriesSlice
});

export default rootReducer
