import './App.css';
// import { Route, Routes } from 'react-router-dom';
// import Home from './components/Home/Home';
import Navigation from './components/Navigation/Navigation';
import Chat from './components/Chat/Chat';

function App() {
  return (
    <>
      <Navigation />
      {/* <Routes>
        <Route path="/" element={<Home />} />
      </Routes> */}
      <Chat />
    </>
  )
}

export default App;
