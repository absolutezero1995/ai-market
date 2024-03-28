import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks/redux';
import { getHistory } from '../../../features/chat/chatSlice'
import { deleteChat } from '../../../features/chat/chatSlice';
import './ChatItem.css';



const ChatItem = ({ chat, index}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleChat = async (id) => {
        console.log(chat);
        await dispatch(getHistory(id))
        navigate(`/chat/${id}`)
    }

    const handleDeleteChat = async (chatId, index) => {
        await dispatch(deleteChat({chatId, index}))
    }


    return (
        <div className='chat-item-container' key={chat.id}>
            <div className='chat-item-title'>
                <input type='button' onClick={() => handleChat(chat.id)} value={chat.title} />
            </div>
            <div className='chat-item-btn-settings'>
                <button type="button" onClick={() => handleDeleteChat(chat.id, index)} >del</button>
            </div>
        </div>
    )
}

export default ChatItem;
