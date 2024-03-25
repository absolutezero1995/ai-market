import LeftBar from "../LeftBar/LeftBar";
import RightBar from "../Rightbar/RightBar";
import Table from "../Table/Table";
import { useParams } from 'react-router-dom';
import "./Chat.css"
import { useState } from "react";

function Chat(): JSX.Element {
    const [chatHistory, setChatHistory] = useState([])
    let { id } = useParams();

    return (
        <div className="block-chat">
            <LeftBar chatHistory={chatHistory} setChatHistory={setChatHistory} />
            <div className="chat-search">
                <div className="chat">
                    <div className="chat-position">
                        <Table chatHistory={chatHistory} setChatHistory={setChatHistory}  id={id} />
                    </div>
                </div>
            </div>
            <RightBar />
        </div>
    )
}

export default Chat;