import React, { useEffect, useState, useRef } from "react";
import "./LeftBar.css";
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import ConversationForm from "../Conversation/ConversationForm";
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
  const chatsList = useSelector((state) => state.chat.chats);
  const [chats, setChats] = useState([]);
  const [chatSettings, setChatSettings] = useState<{ [key: string]: ChatSettings[] }>({});
  const [showModal, setShowModal] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const axiosChats = async () => {
      if (selectedCategory && !chats[selectedCategory]) {
        const res = await dispatch(getChats(selectedCategory));
        if (res) {
          setChats(res.payload);
        }
      }
      setChatSettings(prevSettings => ({ ...prevSettings, [selectedCategory]: [] }));
    };
    axiosChats();
  }, [selectedCategory]);

  const onHandleAddNewChat = () => {
    setShowModal(true);
  };

  const toggleSetting = (index: number) => {
    if (selectedCategory) {
      setChatSettings(prevSettings => ({
        ...prevSettings,
        [selectedCategory]: prevSettings[selectedCategory]?.map((setting) => setting.index === index ? { ...setting, isOpen: !setting.isOpen } : setting) || []
      }));
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setShowModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInsideClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  const handleCreateBotClick = () => {
    closeModal();
  };

  return (
    <div className={`block-left-bar ${!visible ? 'hidden' : ''}`}>
      <div className="block-navbar">
        <p>{selectedCategory} chat</p>
        <div className="block-btn-add"><button type="button" onClick={onHandleAddNewChat}>New chat <span><FontAwesomeIcon icon={faSquarePlus} /></span></button></div>
        <ul>
          {chatsList.map((chat, index) => (
            <li key={chat.id}>
              <ChatItem chat={chat} index={index}/>
              {chatSettings[selectedCategory || '']?.[chat.id]?.isOpen && <ConversationForm />}
            </li>
          ))}
        </ul>
      </div>
      {showModal && (
        <div className="modal" ref={modalRef} onClick={closeModal}>
          <div className="modal-content" onClick={handleInsideClick}>
            <div className="modal-header">
              <h2>Add New Chat</h2>
              <button className="close" onClick={closeModal}>×</button>
            </div>
            <div className="modal-body">
              <ConversationForm setShowModal={setShowModal} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LeftBar;
