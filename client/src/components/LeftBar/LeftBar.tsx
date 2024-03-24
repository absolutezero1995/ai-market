import { useEffect, useState } from "react";
import "./Leftbar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';
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
  const { selectedCategory } = useCategoryContext() || {};
  
  const [chats, setChats] = useState<{ [key: string]: JSX.Element[] }>({});
  const [chatSettings, setChatSettings] = useState<{ [key: string]: ChatSettings[] }>({});
  
  useEffect(() => {
    if (selectedCategory && !chats[selectedCategory]) {
      setChats(prevChats => ({...prevChats, [selectedCategory]: []}));
      setChatSettings(prevSettings => ({...prevSettings,[selectedCategory]: []}));
    }
  }, [selectedCategory]);
  
  const onHandleAddNewChat = () => {
    if (selectedCategory) {
      const newIndex = chats[selectedCategory]?.length || 0;
      const newChat = <Conversation key={newIndex} />;
      const newChatSettings = { index: newIndex, isOpen: false };
      
      setChats(prevChats => ({...prevChats, [selectedCategory]: [...(prevChats[selectedCategory] || []), newChat]}));
      setChatSettings(prevSettings => ({...prevSettings, [selectedCategory]: [...(prevSettings[selectedCategory] || []), newChatSettings]}));
    }
  };

  const toggleSetting = (index: number) => {
    if (selectedCategory) {
      setChatSettings(prevSettings => ({...prevSettings, [selectedCategory]: prevSettings[selectedCategory]?.map((setting) => setting.index === index ? { ...setting, isOpen: !setting.isOpen } : setting ) || []}));
    }
  };

  return (
    <div className={`block-left-bar ${!visible ? 'hidden' : ''}`}>
      <div className="block-navbar">
        <p>Your chat</p>
        <div className="block-btn-add"><button type="button" onClick={onHandleAddNewChat}>New chat <span><FontAwesomeIcon icon={faSquarePlus} /></span></button></div>
        <ul>
          {chats[selectedCategory || '']?.map((chat, index) => (
            <li key={index}>
              {chat}
              <button type="button" onClick={() => toggleSetting(index)}>Setting</button>
              {chatSettings[selectedCategory || '']?.[index]?.isOpen && <ConversationForm />}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default LeftBar;
