import { ADD_CHAT_FAILURE, ADD_CHAT_REQUEST, ADD_CHAT_SUCCESS } from "../action/left-bar-action-types"

export type AddChatAction = 
| {type: typeof ADD_CHAT_REQUEST}
| {type: typeof ADD_CHAT_SUCCESS, payload: {chat: any}}
| {type: typeof ADD_CHAT_FAILURE, payload: {error: string}}

export type LeftBarAction = AddChatAction