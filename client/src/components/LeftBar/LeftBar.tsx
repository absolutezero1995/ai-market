import { useEffect, useState } from "react";
import "./Leftbar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import ConversationForm from "../Conversation/ConversationForm";
import { useCategoryContext } from "../Rightbar/CategoryContext";
import ChatItem from "../Chat/ChatItem/ChatItem";
import { useAppDispatch } from "../../hooks/redux";
import { getChats } from "../../features/chat/chatSlice";
import Modal from "../ModalForm/ModalForm";

interface visibleProps {
  visible: boolean;
}

interface ChatSettings {
  index: number;
  isOpen: boolean;
}

function LeftBar({ visible }: visibleProps): JSX.Element {
  const { selectedCategory } = useCategoryContext() || {};
  const dispatch = useAppDispatch();
  const [chats, setChats] = useState([]);
  const [chatSettings, setChatSettings] = useState<{ [key: string]: ChatSettings[] }>({});
  

  const positiveButtonMessage = 'OK'
  const negativeButtonMessage = 'Cancel'

  const [isModalOpen, setIsModalOpen] = useState(false)
  //хэндлеры для открытия/закрытия модалки
  const handleOpenModal = () => {
    setIsModalOpen(true)
  }
  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleSave = async (_data: { [key: string]: string }) => {
    const addChat = document.forms.namedItem('addChat-form') as HTMLFormElement
    const formData = new FormData(addChat);
  }


  useEffect(() => {
    const axiosChats = async () => {
    if (selectedCategory) {
      const res = await dispatch(getChats(selectedCategory));
      console.log(selectedCategory, '- selectedCategory 33');
      if(res){
        setChats(res.payload)
      }
    }
      setChatSettings(prevSettings => ({...prevSettings,[selectedCategory]: []}));
    }
    axiosChats()
  }, [selectedCategory]);

  // const onHandleAddNewChat = () => {
  //   if (selectedCategory) {
  //     console.log(selectedCategory)
  //     const newIndex = chats[selectedCategory]?.length || 0;
  //     const newChatSettings = { index: newIndex, isOpen: false };
  //     setChatSettings(prevSettings => ({...prevSettings, [selectedCategory]: [...(prevSettings[selectedCategory] || []), newChatSettings]}));
  //   }
  // };

  // const toggleSetting = (index: number) => {
  //   if (selectedCategory) {
  //     setChatSettings(prevSettings => ({...prevSettings, [selectedCategory]: prevSettings[selectedCategory]?.map((setting) => setting.index === index ? { ...setting, isOpen: !setting.isOpen } : setting ) || []}));
  //   }
  // };

  return (
    <div className={`block-left-bar ${!visible ? 'hidden' : ''}`}>
      <div className="block-navbar">
        <p>Your chat</p>
        <div className="block-btn-add"><button type="button" onClick={handleOpenModal}>New chat <span><FontAwesomeIcon icon={faSquarePlus} /></span></button></div>
        <ul>
          {chats.map((chat, index) => (
            <li key={index}>
              <ChatItem chats={chat}  />
              {/* <button type="button" onClick={() => toggleSetting(index)}>Setting</button> */}
            </li>
          ))}
        </ul>
      </div>
      {isModalOpen && (
        <div className='modal-background'>
          <Modal
            title='New chat'
            positiveButtonMessage={positiveButtonMessage}
            negativeButtonMessage={negativeButtonMessage}
            onSave={handleSave}
            onClose={handleCloseModal}
            showButtons={true}>
            <ConversationForm />
          </Modal>
        </div>
      )}
    </div>
  );
}

export default LeftBar;
