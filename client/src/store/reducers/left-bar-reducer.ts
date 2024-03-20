import { LeftBarAction } from "../types/left-bar-types"

import {
    ADD_CHAT_REQUEST,
    ADD_CHAT_SUCCESS,
    ADD_CHAT_FAILURE
} from "../action/left-bar-action-types"

type LeftBarState = {
    chats: any
    loading: boolean
    error: string | null
}

const initialState = {
    chats: [],
    loading: false,
    error: null
}

export const leftBarReducer = (state: LeftBarState = initialState, action: LeftBarAction): LeftBarState => {
    const { type, payload } = action;
    switch (type) {
        case ADD_CHAT_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            }
            case ADD_CHAT_SUCCESS: 
            return {
                ...state,
                loading: false,
                error: null,
                chats: action.payload.chat
            }
            case ADD_CHAT_FAILURE: 
            return {
                ...state, 
                loading: false,
                error: action.payload.error
            }
        default:
            return state
    }
}