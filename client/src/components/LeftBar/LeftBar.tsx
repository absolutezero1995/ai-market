import { useEffect, useState } from "react";
import "./Leftbar.css";
import ConversationForm from "../Conversation/ConversationForm";
import Conversation from "../Conversation/Conversation";
import { useCategoryContext } from "../Rightbar/CategoryContext";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchCategories, setSelectedCategory } from "../../features/categoty";

interface visibleProps {
  visible: boolean;
}

interface ChatSettings {
  index: number;
  isOpen: boolean;
}

function LeftBar({ visible }: visibleProps): JSX.Element {

  // const  setSelectedCategory  = useCategoryContext()
  // console.log(selectedCategory);
  

  const [originalChats, setOriginalChats] = useState<JSX.Element[]>([])
  const [chats, setChats] = useState<JSX.Element[]>([]);
  const [chatSettings, setChatSettings] = useState<ChatSettings[]>([]);
  const dispatch = useAppDispatch();
  const chatsCategory = useAppSelector((state) => state.chat)
  
  const selectedCategory = useAppSelector((state) => state.chats.selectedCategory);
  const categoryChats = useAppSelector((state) => state.chats.chats[selectedCategory || ""]);



  const onHandleAddNewChat = () => {
    const newIndex = chats.length;
    const newChat = <Conversation key={newIndex} />;
    const newChatSettings = { index: newIndex, isOpen: false };
    setOriginalChats((prevChats) => [...prevChats, newChat]);
    setChats((prevChats) => [...prevChats, newChat]);
    setChatSettings((prevSettings) => [...prevSettings, newChatSettings]);
    if (selectedCategory === null) {
      dispatch(setSelectedCategory("defaultCategory"));
 // Замените "defaultCategory" на ваше значение по умолчанию
    }
  };

  const toggleSetting = (index: number) => {
    setChatSettings(prevSettings =>
      prevSettings.map((setting, i) =>
        i === index ? { ...setting, isOpen: !setting.isOpen } : setting
      )
    );
  };

  useEffect(() => {
    // Здесь обновляем список чатов при изменении данных в Redux
    setChats(categoryChats?.map((chat, index) => <Conversation key={index} />) || []);
  }, [categoryChats]);

  useEffect(() => {
    if (selectedCategory !== null) {
      dispatch(fetchCategories(selectedCategory)); // Здесь запрашиваются чаты для выбранной категории
    }
  }, [selectedCategory, dispatch]);

  return (
    <div className={`block-left-bar ${!visible ? 'hidden' : ''}`}>
        <div className="block-navbar">
          <p>Your chat <button type="button" onClick={onHandleAddNewChat}>new chat</button></p>
          <ul>
            {chats.map((chat, index) => (
              <li key={index}>
                {chat}
                <button type="button" onClick={() => toggleSetting(index)}>Setting</button>
                {chatSettings[index] && chatSettings[index].isOpen && <ConversationForm />}
              </li>
            ))}
          </ul>
      </div>
    </div>
  );
}

export default LeftBar;
