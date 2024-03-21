import { useEffect, useState } from "react";
import "./Leftbar.css"
import ConversationForm from "../Conversation/ConversationForm";
import Conversation from "../Conversation/Conversation";

interface visibleProps {
    visible: boolean;
}

interface ChatSettings {
    index: number,
    isOpen: boolean,
}

function LeftBar({ visible }: visibleProps): JSX.Element {
    const [chats, setChats] = useState<JSX.Element[]>([])
    const [chatSettings, setChatSettings] = useState<ChatSettings[]>([])

    const onHandleAddNewChat = () => {
        const newIndex = chats.length;
        const newChat = <Conversation key={newIndex} />
        const newChatSettings = { index: newIndex, isOpen: false };
        setChats((prevChats) => [...prevChats, newChat]);
        setChatSettings((prevSettings) => [...prevSettings, newChatSettings])
    }

    const toggleSetting = (index: number) => {
        setChatSettings((prevSettings) =>
            prevSettings.map((setting) =>
                setting.index === index ? { ...setting, isOpen: !setting.isOpen } : setting
            )
        );
    };

    useEffect(() => {
        console.log(chats);
        console.log(chatSettings);
    }, [chats, chatSettings])

    return (
        <div className={`block-left-bar ${!visible ? 'hidden' : ''}`}>
            <div className="block-left-bar-content">
                <div className="block-navbar">
                    <p>Your chat</p>
                    <ul>
                        <button type="button" onClick={onHandleAddNewChat}>Add new chat</button>
                        {chats.map((chat, index) => (
                            <li key={index}>{chat}
                                <button type="button" onClick={() => toggleSetting(index)}>Setting</button>{chatSettings[index].isOpen && <ConversationForm />}</li>
                        ))}

                    </ul>
                </div>
            </div>
        </div>
    )
}

export default LeftBar