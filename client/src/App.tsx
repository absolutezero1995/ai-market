import { Route, Routes } from 'react-router-dom'

// import './App.css'
import Navigation from './components/Navigation/Navigation.tsx'
import Signup from './components/Signup/Signup.tsx'
import Profile from './components/Profile/Profile.tsx'
import Login from './components/Login/Login.tsx'
import { useAppDispatch, useAppSelector } from './hooks/redux.ts'
import ProtectedRoute from './components/Protected-Route/Protected-Route.tsx'
import Chat from './components/Chat/Chat';

import { logout, restoreSession } from './features/auth/authSlice.ts'
import { useEffect } from 'react'
import Home from './components/Home/Home.tsx'

function App() {
  const dispatch = useAppDispatch()
  const { isAuthenticated } = useAppSelector((store) => store.auth)

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')
    const userId = localStorage.getItem('userId')

    if (accessToken && refreshToken && userId) {
      dispatch(restoreSession({ accessToken, refreshToken, userId }))
    }
  }, [dispatch])

  console.log('*************APP.TSX');
  
// const isAuthenticated = true //!!!

  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path={isAuthenticated ? '/profile' : '/signup'}
          element={isAuthenticated ? <Profile /> : <Signup />}
        />
        {/* <Route
          path="/add-book"
          element={
            <ProtectedRoute>
              <AddBook />
            </ProtectedRoute>
          }
        /> */}
        <Route
          path={isAuthenticated ? '/logout' : '/login'}
          element={
            isAuthenticated ? <button onClick={() => dispatch(logout())}>Logout</button> : <Login />
          }
        />
        <Route
          path={isAuthenticated ? '/chat' : '/'}
          element={isAuthenticated ? <Chat /> : <Home />}
        />
      </Routes>
      {/* <Chat /> */}

    </>
  )
}

export default App

// import './App.css';
// import { Route, Routes } from 'react-router-dom';
// import Home from './components/Home/Home';
// import Navigation from './components/Navigation/Navigation';
// import Chat from './components/Chat/Chat';
// import Login from './components/Login/Login';
// import Signup from './components/Signup/Signup';

// function App() {
//   return (
//     <>
//       <Navigation />
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//         </Routes>
//       <Chat />
//     </>
//   )
// }

// export default App;
