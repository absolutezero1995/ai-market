import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { logout } from '../../features/auth/authSlice';
import './Navigation.css';


function Navigation() {
  const { isAuthenticated } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <>
    <div className="navigation-container">
      {isAuthenticated && (
        <nav className="navbar">
          <ul>
            <li>
              <Link to="/">home</Link>
            </li>
            <li>
              <Link to="/chat">chat</Link>
            </li>
            <li>
              <button onClick={handleLogout}>exit</button>
            </li>
          </ul>
        </nav >
      )}
    </div>
  )
}

export default Navigation;