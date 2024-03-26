import  { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faCircleQuestion, } from '@fortawesome/free-regular-svg-icons';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

import ProfileItem from "../ProfileItem/ProfileItem";
import './ProfileList.css';

function ProfileList() {
    const [open, setOpen] = useState(false);

    const menuRef = useRef();
    useEffect(() => {
        const handler = (e) => {
            if (!menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handler);

        return () => {
            document.removeEventListener("mousedown", handler);
        };
    }, []);

    return (
        <div className='menu-container' ref={menuRef}>
            <div className='menu-trigger' onClick={() => setOpen(!open)}>
                <div className={`menu-trigger-img ${open ? 'active-logo-profile' : '' } `}><FontAwesomeIcon icon={faUser} /></div>
            </div>
            <div className={`dropdown-menu ${open ? 'active' : 'inactive'}`}>
                <h3 className="dropdown-menu-h3">user.name</h3>
                <div className="dropdown-list">
                    <ProfileItem img={faUser} text={"My Profile"} />
                    <ProfileItem img={faEnvelope} text={"Inbox"} />
                    <ProfileItem img={faCircleQuestion} text={"About us"} />
                    <ProfileItem img={faArrowRightFromBracket} text={"Logout"} />
                </div>
            </div>
        </div>
    );
}

export default ProfileList;
