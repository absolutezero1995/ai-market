import { Link, Outlet, useNavigate } from 'react-router-dom';
import './Navigation.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToggleOff } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { logout } from '../../features/auth/authSlice';

function Navigation() {
  const { isAuthenticated } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/signin')
  }

  return (
    <>
    <div className='block-menu'>
    <nav className="nav-menu">
      <ul className='ul-list'>
      <li>
        <div className='block-light'><FontAwesomeIcon icon={faToggleOff} /></div>
      </li>
      <li>
        <Link to="/" >home</Link>
      </li>
      {isAuthenticated ? (
      <>
      <li>
        <Link to="/chat">Chat</Link>
      </li>
      <li>
        <button onClick={handleLogout}>Sign-out</button>
      </li>
      </>
      ) : (
      <>
      <li>
        <Link to="/signin">sign-in</Link>
      </li>
      <li>
        <Link to="/signup">sign-up</Link>
      </li>
      </>
      )
      }
      </ul>
    </nav>
    </div>
    <Outlet />
    </>
  )
}

export default Navigation;