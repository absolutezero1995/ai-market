import LeftBar from "../LeftBar/LeftBar";
import RightBar from "../Rightbar/RightBar";
import Table from "../Table/Table";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import "./Chat.css"
import { useState } from "react";
function Chat() {
    const [leftBarVisible, setLeftBarVisible] = useState(true);
    const [rightBarVisible, setRightBarVisible] = useState(true);
    const [chats, setChats] = useState([])
    const toggleLeftBar = () => {
        setLeftBarVisible(!leftBarVisible);
    };
    const toggleRightBar = () => {
        setRightBarVisible(!rightBarVisible);
    };
    const addChat = (chat) => {
        setChats([...chats, chat])
    }

    return(
        <div className="block-chat">
            <div className="block-left">
                {leftBarVisible && <LeftBar visible={leftBarVisible} chats={chats}/>}
                <span className="icon-bar" onClick={toggleLeftBar}>{leftBarVisible ? <FontAwesomeIcon icon={faChevronRight} /> : <FontAwesomeIcon icon={faChevronLeft} />}</span>
            </div>
            
            <div className="chat-search"> 
                <div className="chat">
                    <div className="chat-position">
                        <Table />
                    </div>
                </div>
                <span className="icon-bar" onClick={toggleRightBar}>{rightBarVisible ? <FontAwesomeIcon icon={faChevronLeft} /> : <FontAwesomeIcon icon={faChevronRight} />}</span>
            </div>
             
                {rightBarVisible && <RightBar visibleR={rightBarVisible} addChat={addChat}/>}
        </div>
    )
}

export default Chat;