import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { makeRequest } from '../../api/make-request';

interface MessageResponse {
  content: string;
  categories: string[];
}



interface ChatState {
  messages: string[];
  view: string[];
  categories: string[];
  chats: [],
  status: 'idle' | 'loading' | 'success' | 'failed';
  error: string | null;
}

const initialState: ChatState = {
  messages: [],
  view: [],
  chats: [],
  categories: [],
  status: 'idle',
  error: null
};


export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async ({id, request}: { id: number; request: string }, { rejectWithValue }) => {
    try {
      console.log(id, request)
      const data: MessageResponse = await makeRequest<MessageResponse>("/api/conversation", {
        method: 'POST',
        data: { id, request }
      });
      console.log(data, 'DATA 38!!!!!!!');
      return data;
    } catch (error) {
      throw rejectWithValue(error);
    }
  }
);

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

export const getCategories = createAsyncThunk(
  'chat/getCategory',
  async (categoryId, { rejectWithValue }) => {
    try {
      const data: MessageResponse[] =  makeRequest<MessageResponse[]>(`/api/getcategories/`, {
        method: 'GET',
      });
      return data;
    } catch (error) {
      throw rejectWithValue(error);
    }
  }
);

export const getHistory = createAsyncThunk(
  'chat/getHistory',
  async (chatId, { rejectWithValue }) => {
    try {
      console.log(chatId, 'id 78')
      const data: MessageResponse[] =  await makeRequest<MessageResponse[]>(`/api/gethistory/${chatId}`, {
        method: 'GET',
      });
      console.log(data, 'GET HISTORY DATA 82')
      return data;
    } catch (error) {
      throw rejectWithValue(error);
    }
  }
);

export const getCategoryList = createAsyncThunk(
  'chat/getCategoryList',
  async (categoryId, { rejectWithValue }) => {
    try {
      const data: MessageResponse[] = await makeRequest<MessageResponse[]>(`/api/getcategorylist/${categoryId}`, {
        method: 'GET',
      });
      console.log(data, 'data 81')
      return data;
    } catch (error) {
      throw rejectWithValue(error);
    }
  }
);

export const getChats = createAsyncThunk(
  'chat/getChats',
  async (category_id, { rejectWithValue }) => {
    try {
      const data  = await makeRequest<MessageResponse[]>("/api/getchats", {
        method: 'POST',
        data: { category_id }
      });
      console.log(data, 'getChats 98')
      return data;
    } catch (error) {
      throw rejectWithValue(error);
    }
  }
);

export const createChat = createAsyncThunk(
  'chat/createChats',
  async ({category_id, title} : {category_id: number, title: string}, { rejectWithValue }) => {
    try {
      const data  = await makeRequest<MessageResponse[]>("/api/createchat", {
        method: 'POST',
        data: { category_id, title }
      });
      return data;
    } catch (error) {
      throw rejectWithValue(error);
    }
  }
);

export const deleteChat = createAsyncThunk(
  'chat/deleteChats',
  async ({chatId, index} : {number, number}, { rejectWithValue }) => {
    try {
      await makeRequest<MessageResponse[]>(`/api/deletechat/${chatId}`, {
        method: 'DELETE',
      });
      return index;
    } catch (error) {
      throw rejectWithValue(error);
    }
  }
);

export const deleteMessage = createAsyncThunk(
  'chat/deleteMessage',
  async ({index, messageId} : {number, number}, { rejectWithValue}) => {
    try {
      console.log(index, messageId, '!!!!!@@@@@@@@@')
      const i = index;
      const res = await makeRequest<void>(`/api/deleteMessage/${messageId}`, {
        method: 'DELETE',
      });
      console.log(res);
      console.log(i, '@@@@@@@@@@@@@@@@@@@@@@@2');
      return i;
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
        console.log(action.payload, 'action.payload 168');
        state.view = state.view.concat(action.payload);
        state.status = 'success';
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.status = 'failed';
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
      .addCase(getCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.status = 'success';
        state.categories = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(getChats.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getChats.fulfilled, (state, action) => {
        state.status = 'success';
        state.chats = action.payload
      })
      .addCase(getChats.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(getCategoryList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCategoryList.fulfilled, (state, action) => {
        state.status = 'success';
        state.chats = action.payload
      })
      .addCase(getCategoryList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(createChat.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createChat.fulfilled, (state, action) => {
        console.log(state.chats, 'state.chats');
        state.status = 'success';
        state.chats = state.chats.concat(action.payload); // Добавление нового чата к существующим
    })
    
      .addCase(createChat.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(deleteChat.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteChat.fulfilled, (state, action) => {
        console.log(state.chats, 'state.chats');
        state.status = 'success';
        state.chats = state.chats.filter((_, index) => index !== action.payload); // Добавление нового чата к существующим
    })
    
      .addCase(deleteChat.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(deleteMessage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteMessage.fulfilled, (state, action) => {
        state.status = 'success';
        console.log(state.view, ' console.log(state.view); 236');
        state.view = state.view.filter((_, index) => index !== action.payload);
      })
      .addCase(deleteMessage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(getHistory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getHistory.fulfilled, (state, action) => {
        state.status = 'success';
        state.view = action.payload;
        console.log(state.view, 'state.view 248')
      })
      .addCase(getHistory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { libraryChat } = chatSlice.actions;

export default chatSlice.reducer;