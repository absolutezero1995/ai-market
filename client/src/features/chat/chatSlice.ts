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

interface SetSetting {
  model: string;
  chat_id: number;
  temperature: number;
  role: string;
}

const initialState: ChatState = {
  messages: [],
  view: [],
  status: 'idle',
  error: null
};


export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async ({ message, messages }: { message: string, messages: ""[]}, { rejectWithValue }) => {
    try {
      console.log(messages, 'messages38')
      const data: MessageResponse = await makeRequest<MessageResponse>("/api/conversation", {
        method: 'POST',
        data: { message, messages }
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
      return data.content;
    } catch (error) {
      throw rejectWithValue(error);
    }
  }
);

export const setSettingOfChat = createAsyncThunk(
  'chat/setSettingOfChat',
  async (settings: SetSetting, { rejectWithValue }) => {
    try {
      const data: string = await makeRequest<string>(`/api/setSettingOfChat/${settings.chat_id}`, {
        method: "POST",
        data: { settings }
      })
      return data
    } catch (error) {
      throw rejectWithValue(error)
    }
  }
)

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
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
      })
      .addCase(setSettingOfChat.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(setSettingOfChat.fulfilled, (state) => {
        state.status = 'success';
      })
      .addCase(setSettingOfChat.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });


  }
});

export default chatSlice.reducer;
