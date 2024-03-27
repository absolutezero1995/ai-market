import { useEffect, useState } from "react";
import "./Leftbar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import ConversationForm from "../Conversation/ConversationForm";
import Conversation from "../Conversation/Conversation";
import { useCategoryContext } from "../Rightbar/CategoryContext";
import ChatItem from "../Chat/ChatItem/ChatItem";
import { useAppDispatch } from "../../hooks/redux";
import { getChats } from "../../features/chat/chatSlice";

interface visibleProps {
  visible: boolean;
}

interface ChatSettings {
  index: number;
  isOpen: boolean;
}

function LeftBar({ visible, chatHistory, setChatHistory }: visibleProps): JSX.Element {
  const { selectedCategory } = useCategoryContext() || {};
  const dispatch = useAppDispatch();
  const [chats, setChats] = useState([]);
  const [chatSettings, setChatSettings] = useState<{ [key: string]: ChatSettings[] }>({});
  

  
  useEffect(() => {
    const axiosChats = async () => {
    if (selectedCategory && !chats[selectedCategory]) {
      const res = await dispatch(getChats(selectedCategory));
      console.log(res, 'res33')
      if(res){
        setChats(res.payload)
      }
    }
      setChatSettings(prevSettings => ({...prevSettings,[selectedCategory]: []}));
    }
    axiosChats()
  }, [selectedCategory]);

  const onHandleAddNewChat = () => {
    if (selectedCategory) {
      const category_id = selectedCategory;
      // const newChat = <Conversation key={category_id} />;
      // const newChatSettings = { category_id: category_id, isOpen: false };
      // setChats(prevChats => ({...prevChats, [selectedCategory]: [...(prevChats[selectedCategory] || []), newChat]}));
      // setChatSettings(prevSettings => ({...prevSettings, [selectedCategory]: [...(prevSettings[selectedCategory] || []), newChatSettings]}));
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
          {/* {chats[selectedCategory || '']?.map((chats, index) => (
            <li key={index}>
              <ChatItem chatHistory={chatHistory} setChatHistory={setChatHistory} chats={chats}  />
              <button type="button" onClick={() => toggleSetting(index)}>Setting</button>
              {chatSettings[selectedCategory || '']?.[index]?.isOpen && <ConversationForm />}
            </li>
          ))} */}
          {chats.map((chat) => (
            <li key={chat.id}>
              <ChatItem chatHistory={chatHistory} setChatHistory={setChatHistory} chats={chat}  />
              <button type="button" onClick={() => toggleSetting(chat.id)}>Setting</button>
              {chatSettings[selectedCategory || '']?.[chat.id]?.isOpen && <ConversationForm />}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default LeftBar;
