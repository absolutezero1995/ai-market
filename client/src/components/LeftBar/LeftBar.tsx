import "./Leftbar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from "react";
import Conversation from "../Conversation/Conversation";
import ChatItem from "../Chat/ChatItem/ChatItem";
import axios from 'axios';
import { api } from '../../api/make-request';

interface ChatSettings {
  index: number;
  isOpen: boolean;
}



const LeftBar: React.FC = ({chatHistory, setChatHistory}) => {
  const [leftBarVisible, setLeftBarVisible] = useState(true); 
  const [chats, setChats] = useState<JSX.Element[]>([]);

  const getChats = async () => {
    try {
      const res = await api.get('/api/getchats');
      setChats(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getChats();
  }, [])

  const onHandleAddNewChat = () => {
    const newIndex = chats.length;
    const newChat = <Conversation key={newIndex} />;
    const newChatSettings = { index: newIndex, isOpen: false };
    setChats((prevChats) => [...prevChats, newChat]);
    setChatSettings((prevSettings) => [...prevSettings, newChatSettings]);
  };

  const toggleLeftBar = () => {
    setLeftBarVisible(!leftBarVisible);
  };



  return (
    <div className='left-bar-container'>
      {/* <div className="hide-icon">
        <span className="icon-bar" onClick={toggleLeftBar}>
          {leftBarVisible ? <FontAwesomeIcon icon={faChevronLeft} /> : <FontAwesomeIcon icon={faChevronRight} />}
        </span>
      </div> */}
      <div className={`block-left-bar ${!leftBarVisible ? "hiddenL" : ""}`}>
        <div className="block-navbar">
          <div className="create-btn">
          <input type="button" onClick={onHandleAddNewChat} value={'CREATE NEW CHAT'}/>
          </div>
          <ul>
              {chats.map((chats) => (
                <ChatItem chatHistory={chatHistory} setChatHistory={setChatHistory} chats={chats}  />
              ))
            }
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
