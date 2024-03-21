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
  status: 'idle' | 'loading' | 'succeded' | 'failed';
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
        console.log(action.payload);
        state.view = [action.payload];
        state.status = 'succeded';
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(getHistoryChat.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getHistoryChat.fulfilled, (state, action) => {
        state.status = "succeded";
        state.messages = action.payload
        state.error = null
      })
      .addCase(getHistoryChat.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
  }
});


export default chatSlice.reducer;

