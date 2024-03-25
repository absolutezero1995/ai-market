import "./RightBar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from "react";
import ProfileList from "../ProfileBar/ProfileList/ProfileList";
import { Link } from "react-router-dom";




const RightBar: React.FC = () => {
    const [rightBarVisible, setRightBarVisible] = useState(false);

    // const toggleRightBar = () => {
    //     setRightBarVisible(!rightBarVisible);
    // };
    return (
        <>
        <div className="right-bar-container">
        <div className="hide-icone">
            {/* <span className="icon-bar" onClick={toggleRightBar}>
                {rightBarVisible ? <FontAwesomeIcon icon={faChevronLeft} /> : <FontAwesomeIcon icon={faChevronRight} />}
                </span> */}
            </div>
        <div className={`block-right-bar ${!rightBarVisible ? "hiddenR" : ""}`}>
            <div className="block-navbar">
            <div className="profile-icon-container">
                <ProfileList />
            </div>
                <ul className="content-navbar-right">
                <Link to="/">Conversation</Link>
                <Link to="/">Image</Link>
                <Link to="/">Video</Link>
                <Link to="/">Audio</Link>
                </ul>
            </div>
        </div>
        </div>
</>
    );
};

export default RightBar;
