import  { useEffect, useRef, useState } from "react";
import ProfileItem from "../ProfileItem/ProfileItem";
import user from "../../../../public/img/user.png"; // Импорт изображения пользователя
import edit from "../../../../public/img/edit.png"; // Импорт изображения редактирования
import inbox from "../../../../public/img/envelope.png"; // Импорт изображения входящих сообщений
import settings from "../../../../public/img/settings.png"; // Импорт изображения настроек
import help from "../../../../public/img/question.png"; // Импорт изображения помощи
import logout from "../../../../public/img/log-out.png"; // Импорт изображения выхода
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
                <img className={`menu-trigger-img ${open ? 'active-logo-profile' : '' } `} src={user} alt="User" />
            </div>
            <div className={`dropdown-menu ${open ? 'active' : 'inactive'}`}>
                <h3 className="dropdown-menu-h3">user.name</h3>
                <div className="dropdown-list">
                    <ProfileItem img={user} text={"My Profile"} />
                    <ProfileItem img={inbox} text={"Inbox"} />
                    <ProfileItem img={help} text={"About us"} />
                    <ProfileItem img={logout} text={"Logout"} />
                </div>
            </div>
        </div>
    );
}

export default ProfileList;
