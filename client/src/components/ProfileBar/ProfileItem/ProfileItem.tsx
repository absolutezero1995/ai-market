import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './ProfileItem.css'

interface ProfileType{
    img: any,
    text: string
}

const ProfileItem = ({img, text }: ProfileType) => {
    return (
        <li className='dropdown-item'>
            <div className='dropdown-item-img'><FontAwesomeIcon icon={img} /></div>
            <Link to='/'> {text} </Link>
        </li>
    )
}

export default ProfileItem;
