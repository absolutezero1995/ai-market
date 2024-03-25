import './App.css';
import Navigation from './components/Navigation/Navigation';
import Chat from './components/Chat/Chat';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { restoreSession } from './features/auth/authSlice';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Signin from './components/Signin/Signin';
import Signup from './components/Signup/Signup';
import ActionBars from './components/ActionBars/ActionBars';

function App() {
  const { isAuthenticated } = useAppSelector((store) => store.auth)
  const dispatch = useAppDispatch()


  useEffect(() => {
    console.log('I AM USEEFFECT!!!!!!');
    const accessToken = localStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')
    const userId = localStorage.getItem('userId')

    if (accessToken && refreshToken && userId) {
      dispatch(restoreSession({ accessToken, refreshToken, userId }))
    }
    console.log(isAuthenticated, 'isAuthenticated27')
  }, [dispatch])


  return (
    <div className='app-container'>
      <Routes>
        <Route path='/' element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/action' element={<ActionBars />} />
          <Route path='/chat/:id' element={<Chat />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
