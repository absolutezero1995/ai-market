import LeftBar from "../LeftBar/LeftBar";
import RightBar from "../Rightbar/RightBar";
import Table from "../Table/Table";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import "./Chat.css"
import { useState } from "react";


function ChatTable(): JSX.Element {
    const [leftBarVisible, setLeftBarVisible] = useState(true);
    const [rightBarVisible, setRightBarVisible] = useState(true);
    const [leftBlockVisible, setLeftBlockVisible] = useState(true);

    const toggleLeftBar = () => {
        setLeftBarVisible(!leftBarVisible);
    };

    const toggleRightBar = () => {
        setRightBarVisible(!rightBarVisible);
    };

    const handleCategoryClick = () => {
        setLeftBlockVisible(true);
    };

    return (
        <div className="block-chat">
            {leftBlockVisible && (
                <>
                <LeftBar visible={leftBarVisible} />
                <span className="icon-bar" onClick={toggleLeftBar}>
                    {leftBarVisible ? <FontAwesomeIcon icon={faChevronLeft} /> : <FontAwesomeIcon icon={faChevronRight} />}
                </span>
                </>
            )}

            <div className="chat-search">
                <div className="chat">
                    <div className="chat-position">
                        <Table />
                    </div>
                </div>
            </div>

            <span className="icon-bar" onClick={toggleRightBar}>
                {rightBarVisible ? <FontAwesomeIcon icon={faChevronRight} /> : <FontAwesomeIcon icon={faChevronLeft} />}
            </span>
            <RightBar visibleR={rightBarVisible} onCategoryClick={handleCategoryClick} />
        </div>
    );
}

export default ChatTable;
