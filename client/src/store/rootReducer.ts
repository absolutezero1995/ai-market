import { combineReducers } from 'redux'
import authSlice from '../features/auth/authSlice.ts'
// import booksReducer from '../features/book/bookSlice.ts'

const rootReducer = combineReducers({
  auth: authSlice,
  // books: booksReducer
})

export default rootReducer
