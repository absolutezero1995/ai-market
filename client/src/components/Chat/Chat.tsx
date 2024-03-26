import LeftBar from "../LeftBar/LeftBar";
import RightBar from "../Rightbar/RightBar";
import Table from "../Table/Table";
import { useParams } from 'react-router-dom';
import "./Chat.css"
import { useState } from "react";


function Chat(): JSX.Element {
    const [leftBarVisible, setLeftBarVisible] = useState(true);
    const [rightBarVisible, setRightBarVisible] = useState(true);
    const [leftBlockVisible, setLeftBlockVisible] = useState(false);

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
                // <div className="block-left">
                <>
                <LeftBar visible={leftBarVisible} />
                <span className="icon-bar" onClick={toggleLeftBar}>
                    {leftBarVisible ? <FontAwesomeIcon icon={faChevronLeft} /> : <FontAwesomeIcon icon={faChevronRight} />}
                </span>
                </>
                // </div>
            )}

            <div className="chat-search">
                <div className="chat">
                    <div className="chat-position">
                        <Table chatHistory={chatHistory} setChatHistory={setChatHistory}  id={id} />
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

export default Chat;
