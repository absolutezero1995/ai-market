import { Link } from 'react-router-dom';
// import './Navigation.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToggleOff } from '@fortawesome/free-solid-svg-icons';

function Navigation() {
  return (
    <nav className="bg-gray-400 h-12 flex items-center justify-end text-white p-4">
      <ul className="list-none flex gap-x-8">
      <li>
        <div className='block-light'><FontAwesomeIcon icon={faToggleOff} /></div>
        </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/signup">Signup</Link>
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