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
      console.log(data, 'I AM DATA 39')
      return data;
    } catch (error) {
      throw rejectWithValue(error);
    }
  }
);

// export const getHistoryChat = createAsyncThunk(
//   'history/getHistoryChat',
//   async (chat_id: ChatId, { rejectWithValue }) => {
//     try {
//       const data: MessageResponse[] = await makeRequest<MessageResponse[]>(`/api/getcategories/${chat_id.chat_id}`, {
//         method: "GET",
//       })
//       return data.map(messages => messages.content)
//     } catch (error) {
//       throw rejectWithValue(error)
//     }
//   }
// )

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

export const getCategory = createAsyncThunk(
  'chat/getCategory',
  async (_ , { rejectWithValue }) => {
    try {
      const data: MessageResponse[] =  makeRequest<MessageResponse[]>("/api/getcategories", {
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
      // console.log(data[0], '- getChats')
      console.log(data, '- ChatHistories')
      return data;
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
        state.messages.push(action.payload);
        state.view = [...state.messages];
        state.status = 'success';
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      // .addCase(getHistoryChat.pending, (state) => {
      //   state.status = "loading";
      // })
      // .addCase(getHistoryChat.fulfilled, (state, action) => {
      //   state.status = "success";
      //   state.messages = action.payload;
      //   state.error = null;
      // })
      // .addCase(getHistoryChat.rejected, (state, action) => {
      //   state.status = "failed";
      //   state.error = action.payload as string;
      // })
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
        // state.messages.push(action.payload)
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