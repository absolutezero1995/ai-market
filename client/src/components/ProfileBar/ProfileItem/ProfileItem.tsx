import { Link } from 'react-router-dom';
import './ProfileItem.css'

const ProfileItem = ({img, text }) => {
    return (
        <li className='dropdown-item'>
            <img className='dropdown-item-img' src={img}></img>
            <Link to='/'> {text} </Link>
        </li>
    )
}

export default ProfileItem;
