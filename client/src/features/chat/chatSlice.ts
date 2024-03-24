import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { makeRequest } from '../../api/make-request';

interface MessageResponse {
  content: string;
}

interface ChatId {
  chat_id: number
}

interface ChatState {
  messages: string[];
  view: string[];
  status: 'idle' | 'loading' | 'success' | 'failed';
  error: string | null;
}

const initialState: ChatState = {
  messages: [],
  view: [],
  status: 'idle',
  error: null
};


export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async (message: string, { rejectWithValue }) => {
    try {
      const data: MessageResponse = await makeRequest<MessageResponse>("/api/conversation", {
        method: 'POST',
        data: { message }
      });
      return data.content;
    } catch (error) {
      throw rejectWithValue(error);
    }
  }
);

export const getHistoryChat = createAsyncThunk(
  'history/getHistoryChat',
  async (chat_id: ChatId, { rejectWithValue }) => {
    try {
      const data: MessageResponse[] = await makeRequest<MessageResponse[]>(`/api/getHistoryChat/${chat_id.chat_id}`, {
        method: "GET",
      })
      return data.map(messages => messages.content)
    } catch (error) {
      throw rejectWithValue(error)
    }
  }
)

export const saveMessage = createAsyncThunk(
  'chat/saveMessage',
  async ({ message, content }: { message: string, content: string }, { rejectWithValue }) => {
    try {
      await makeRequest<MessageResponse>("/api/saveMessage", {
        method: 'POST',
        data: { message, content }
      });
    } catch (error) {
      throw rejectWithValue(error);
    }
  }
);

export const deleteMessage = createAsyncThunk(
  'chat/deleteMessage',
  async (index: number, { rejectWithValue}) => {
    try {
      await makeRequest<void>(`/api/deleteMessage/${index}`, {
        method: 'DELETE',
        data: { index }
      });
      return index;
    } catch (error) {
      throw rejectWithValue(error);
    }
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload);
        state.view = [...state.messages];
        state.status = 'success';
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(getHistoryChat.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getHistoryChat.fulfilled, (state, action) => {
        state.status = "success";
        state.messages = action.payload;
        state.error = null;
      })
      .addCase(getHistoryChat.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(saveMessage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(saveMessage.fulfilled, (state) => {
        state.status = 'success';
      })
      .addCase(saveMessage.rejected, (state, action) => {
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

export default chatSlice.reducer;