import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { makeRequest } from '../../api/make-request';

interface MessageResponse {
  content: string;
  categories: string[];
}

interface ChatId {
  chat_id: number
}

interface ChatState {
  messages: string[];
  view: string[];
  categories: string[];
  status: 'idle' | 'loading' | 'success' | 'failed';
  error: string | null;
}

const initialState: ChatState = {
  messages: [],
  view: [],
  categories: [],
  status: 'idle',
  error: null
};


export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async ({id, request}: { id: number; request: string }, { rejectWithValue }) => {
    try {
      const data: MessageResponse = await makeRequest<MessageResponse>("/api/conversation", {
        method: 'POST',
        data: { id, request }
      });
      console.log(data);
      return data;
    } catch (error) {
      throw rejectWithValue(error);
    }
  }
);

export const getCategory = createAsyncThunk(
  'chat/getCategory',
  async (_ , { rejectWithValue }) => {
    try {
      const data: MessageResponse[] = await makeRequest<MessageResponse[]>("/api/getcategories", {
        method: 'GET',
      });
      return data;
    } catch (error) {
      throw rejectWithValue(error);
    }
  }
);

export const getChats = createAsyncThunk(
  'chat/getChats',
  async (category_id, { rejectWithValue }) => {
    console.log(category_id);
    try {
      const data  = await makeRequest<MessageResponse[]>("/api/getchats", {
        method: 'POST',
        data: { category_id }
      });
      console.log(data, '- ChatHistories')
      return data;
    } catch (error) {
      throw rejectWithValue(error);
    }
  }
);

export const deleteMessage = createAsyncThunk(
  'chat/deleteMessage',
  async (id, { rejectWithValue}) => {
    try {
      await makeRequest<void>(`/api/deleteMessage/${id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      throw rejectWithValue(error);
    }
  }
);


const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    libraryChat(state, action) {
      state.messages.push(action.payload);
      state.view = [action.payload];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        // state.messages.push(action.payload);
        state.view = action.payload;
        state.status = 'success';
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(getCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.status = 'success';
        state.categories = action.payload;
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(getChats.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getChats.fulfilled, (state, action) => {
        state.status = 'success';
        state.view = action.payload
      })
      .addCase(getChats.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(deleteMessage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteMessage.fulfilled, (state, action) => {
        state.status = 'success';
        state.view = state.view.filter((_, index) => index !== action.payload);
      })
      .addCase(deleteMessage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { libraryChat } = chatSlice.actions;

export default chatSlice.reducer;