import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { makeRequest } from '../../api/make-request.ts'

type User = {
  email: string
  name: string
  password: string
}

export interface AuthState {
  isAuthenticated: boolean
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
  user: {
    id: string
    email: string
    name: string
  } | null // Добавляем объект user
  accessToken: string
  refreshToken: string
  message: string
}

const initialState: AuthState = {
  isAuthenticated: false,
  status: 'idle',
  error: null,
  user: null,
  accessToken: '',
  refreshToken: '',
  message: ''
}

type AuthResponseType = Omit<AuthState, 'isAuthenticated' | 'status' | 'error'>

export const register = createAsyncThunk(
  'auth/register',
  async (userData: User, { rejectWithValue }) => {
    try {
      const res = await makeRequest<AuthResponseType>('/api/signup', {
        method: 'POST',
        data: userData
      })
      console.log(res, 'authSlice44')
      return res;
      
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message)
      }
      return rejectWithValue('An unknown error occurred')
    }
  }
)

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: Omit<User, 'name'>, { rejectWithValue }) => {
    try {
      return await makeRequest<AuthResponseType>('/api/signin', {
        method: 'POST',
        data: credentials
      })
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message)
      }
      return rejectWithValue('An unknown error occurred.')
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state: AuthState) => {
      state.isAuthenticated = false
      state.error = null
      state.status = 'idle'
      state.refreshToken = ''
      state.accessToken = ''
      state.user = null

      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('userId')
    },
    restoreSession: (state, action) => {
      const { accessToken, refreshToken, user } = action.payload
      if (accessToken && refreshToken && user) {
        state.isAuthenticated = true
        state.accessToken = accessToken
        state.refreshToken = refreshToken
        state.user = user // Восстанавливаем объект пользователя
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        resetState(state)
      })
      .addCase(register.fulfilled, (state, action) => {
        updateStateWithSuccessData(state, action.payload)
      })
      .addCase(register.rejected, (state, action) => {
        updateStateWithFailureData(state, action.payload as string)
      })
      .addCase(login.pending, (state) => {
        resetState(state)
      })
      .addCase(login.fulfilled, (state, action) => {
        updateStateWithSuccessData(state, action.payload)
      })
      .addCase(login.rejected, (state, action) => {
        updateStateWithFailureData(state, action.payload as string)
      })
  }
})

function resetState(state: AuthState) {
  state.status = 'loading'
  state.error = null
  state.isAuthenticated = false
  state.message = ''
  state.user = null
  state.refreshToken = ''
  state.accessToken = ''
}

function updateStateWithSuccessData(state: AuthState, payload: AuthResponseType) {
  state.status = 'succeeded'
  console.log('11111111111111111');
  state.isAuthenticated = true
  state.error = null
  state.message = payload.message
  state.user = payload.user // Обновляем данные пользователя
  state.accessToken = payload.accessToken
  state.refreshToken = payload.refreshToken

  // Сохранение в localStorage
  localStorage.setItem('accessToken', payload.accessToken)
  localStorage.setItem('refreshToken', payload.refreshToken)
  localStorage.setItem('userId', payload?.user?.id as string)
}

function updateStateWithFailureData(state: AuthState, payload: string) {
  state.status = 'failed'
  state.error = payload
  state.isAuthenticated = false
  state.message = payload
  state.user = null // Сбрасываем данные пользователя
  state.accessToken = ''
  state.refreshToken = ''
}

export default authSlice.reducer

export const { logout, restoreSession } = authSlice.actions
