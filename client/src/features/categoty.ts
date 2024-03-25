import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { makeRequest } from "../api/make-request";

interface MessageResponse {
    // content: string,
    chat: string
}

interface Category {
    selectedCategory: null,
    chats: Record<string, string[]>;
    status: 'idle' | 'loading' | 'success' | 'failed';
    error: string | null;
}

const initialState: Category = { 
    selectedCategory: null,
    chats: {},
    status: 'idle',
    error: null
}

// const { setSelectedCategory } = useCategoryContext()

export const fetchCategories = createAsyncThunk(
    'category/fetchCategories',
    async(index: number, {rejectWithValue }) => {
        try {
            const data: MessageResponse = await makeRequest<MessageResponse>(`/api/test/${index}`, {
                method: "GET",
            });
            return data[index].chat
        } catch (error) {
            throw rejectWithValue (error)
        }
    }
)

const getChatsFromCategoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setSelectedCategories(state, action) {
            state.selectedCategory = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchCategories.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(fetchCategories.fulfilled, (state, action) => {
            state.status = 'success';
            state.chats = action.payload;
            state.error = null
        })
        .addCase(fetchCategories.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload
        })
    }
})

export const { setSelectedCategory } = getChatsFromCategoriesSlice.actions;
export default getChatsFromCategoriesSlice.reducer;