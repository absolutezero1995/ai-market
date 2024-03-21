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
      console.log(message, data.content)
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
      const data: MessageResponse = await makeRequest<MessageResponse>("/api/saveMessage", {
        method: 'POST',
        data: { message, content }
      });
      console.log(data);
      return data.content;
    } catch (error) {
      throw rejectWithValue(error);
    }
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    // receiveMessage(state, action) {
    //   state.messages.push(action.payload);
    //   state.view = [action.payload];
    // }
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload);
        state.view = [action.payload];
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
        state.messages = action.payload
        state.error = null
      })
      .addCase(getHistoryChat.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(saveMessage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(saveMessage.fulfilled, (state, action) => {
        // state.messages.push(action.payload);
        state.view = [action.payload];
        state.status = 'success';
      })
      .addCase(saveMessage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  }
});

export default chatSlice.reducer;
