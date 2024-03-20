import { Dispatch } from "react"
import { AddChatAction } from "../types/left-bar-types"
import { ADD_CHAT_FAILURE, ADD_CHAT_REQUEST } from "../action/left-bar-action-types"
import { makeRequest } from "../../api/make-request"
export const addChat = (chatName: string) => {
    return async (dispatch: Dispatch<AddChatAction>) => {
        dispatch({ type: ADD_CHAT_REQUEST})
        try {
            const addChat = await makeRequest("/conversation")
        } catch (error) {
            dispatch({type: ADD_CHAT_FAILURE, payload: { error: error.message}})
        }
    }
}