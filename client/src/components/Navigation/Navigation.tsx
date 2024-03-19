import { Link } from 'react-router-dom';
import './Navigation.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToggleOff } from '@fortawesome/free-solid-svg-icons';

function Navigation() {
  return (
    <nav className="nav-menu">
      
      <ul className='ul-list'>
      <li>
        <div className='block-light'><FontAwesomeIcon icon={faToggleOff} /></div>
        </li>
      <li>
        <Link to="/account">Sign-in</Link>
      </li>
      <li>
        <Link to="/account">Sign-up</Link>
        </li>
      {/* <li>
        <Link to="/account">Аccount</Link>
      </li>
      <li>
        <Link to="/account">Sign-out</Link>
      </li> */}
      </ul>
    </nav>
  )
}

export default Navigation;