import LeftBar from "../LeftBar/LeftBar";
import RightBar from "../Rightbar/RightBar";
import Table from "../Table/Table";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import "./Chat.css"
import { useState } from "react";
function Chat(): JSX.Element {
    const [leftBarVisible, setLeftBarVisible] = useState(true);
    const [rightBarVisible, setRightBarVisible] = useState(true);
    const toggleLeftBar = () => {
        setLeftBarVisible(!leftBarVisible);
    };
    const toggleRightBar = () => {
        setRightBarVisible(!rightBarVisible);
    };


    return (
        <div className="block-chat">

            <div className="block-left">
                {leftBarVisible && <LeftBar visible={leftBarVisible} />}
                <span className="icon-bar" onClick={toggleLeftBar}>{leftBarVisible ? <FontAwesomeIcon icon={faChevronLeft} /> : <FontAwesomeIcon icon={faChevronRight} />}</span>
            </div>

            <div className="chat-search">
                <div className="chat">
                    <div className="chat-position">
                        <Table />
                    </div>
                </div>
            </div>

            <div className="block-right">
                <span className="icon-bar" onClick={toggleRightBar}>{rightBarVisible ? <FontAwesomeIcon icon={faChevronRight} /> : <FontAwesomeIcon icon={faChevronLeft} />}</span>
                <div className="content-right">
                    {rightBarVisible && <RightBar visibleR={rightBarVisible} />}
                </div>
            </div>
        </div>
    )
}

export default Chat;