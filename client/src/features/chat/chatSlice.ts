import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { makeRequest } from '../../api/make-request';

interface MessageResponse {
  content: string;
}

interface ChatState {
  messages: string[];
  view: string[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
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
      console.log(data.content, "data-content")
      return data.content;
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
      .addCase(sendMessage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload);
        state.view = [action.payload] ;
        state.status = 'succeeded';
      });
  }
});

export default chatSlice.reducer;