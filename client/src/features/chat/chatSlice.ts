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
    async ({ chat_id, request }: { chat_id: number; request: string }, { rejectWithValue }) => {
      try {
        console.log(chat_id, request, 'CHATID31')
        const data: MessageResponse = await makeRequest<MessageResponse>("/api/conversation", {
          method: 'POST',
          data: { chat_id, request }
        });
        console.log(data, 'DATA')
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
  async (id: number, { rejectWithValue }) => {
    try {
      console.log(id, 'id74');
      const res = await makeRequest<void>(`/api/deleteMessage/${id}`, {
        method: 'DELETE'
      });
      console.log(res, "DATA80");
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
        console.log('Deleted message index:', state.view);
      })
      .addCase(deleteMessage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string || 'An error occurred';
      });
  },
});

export default chatSlice.reducer;