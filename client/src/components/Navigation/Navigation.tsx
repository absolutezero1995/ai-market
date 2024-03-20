import { Link, useNavigate } from 'react-router-dom';
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
    navigate('/login')
  }

  return (
    <div className='block-menu'>
    <nav className="nav-menu">
      <ul className='ul-list'>
      <li>
        <div className='block-light'><FontAwesomeIcon icon={faToggleOff} /></div>
      </li>
      <li>
        <Link to="/main" >Main</Link>
      </li>
      {isAuthenticated ? (
      <>
      <li>
        <Link to="/chat">Chat</Link>
      </li>
      <li>
        <Link to="/account">Sign-out</Link>
      </li>
      </>
      ) : (
      <>
      <li>
        <Link to="/sign-in">Sign-in</Link>
      </li>
      <li>
        <Link to="/sign-up">Sign-up</Link>
      </li>
      </>
      )
      }
      </ul>
    </nav>
    </div>
  )
}

export default Navigation;