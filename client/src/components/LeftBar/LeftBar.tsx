import { useEffect, useState } from "react";
import "./Leftbar.css";
import ConversationForm from "../Conversation/ConversationForm";
import Conversation from "../Conversation/Conversation";
import { useCategoryContext } from "../Rightbar/CategoryContext";

interface visibleProps {
  visible: boolean;
}

interface ChatSettings {
  index: number;
  isOpen: boolean;
}

function LeftBar({ visible }: visibleProps): JSX.Element {

  const { selectedCategory } = useCategoryContext()

  const [chats, setChats] = useState<JSX.Element[]>([]);
  const [chatSettings, setChatSettings] = useState<ChatSettings[]>([]);

  const onHandleAddNewChat = () => {
    const newIndex = chats.length;
    const newChat = <Conversation key={newIndex} />;
    const newChatSettings = { index: newIndex, isOpen: false };
    setChats((prevChats) => [...prevChats, newChat]);
    setChatSettings((prevSettings) => [...prevSettings, newChatSettings]);
  };

  const toggleSetting = (index: number) => {
    setChatSettings((prevSettings) =>
      prevSettings.map((setting) =>
        setting.index === index ? { ...setting, isOpen: !setting.isOpen } : setting
      )
    );
  };

  ///???????????????????????????????????????????????????????????????
//   useEffect(() => {
//     const filteredChats = chats.filter((chat, index) => {
//       const chatCategory = selectedCategory;
//       return chatCategory
//       // return chatCategory === selectedCategory;
//     })
//     setChats(filteredChats)
//   }, [selectedCategory]);
///???????????????????????????????????????????????????????????????

  return (
    <div className={`block-left-bar ${!visible ? 'hidden' : ''}`}>
        <div className="block-navbar">
          <p>Your chat <button type="button" onClick={onHandleAddNewChat}>new chat</button></p>
          <ul>
            {chats.map((chat, index) => (
              <li key={index}>
                {chat}
                <button type="button" onClick={() => toggleSetting(index)}>Setting</button>
                {chatSettings[index].isOpen && <ConversationForm />}
              </li>
            ))}
          </ul>
      </div>
    </div>
  );
}

export default LeftBar;