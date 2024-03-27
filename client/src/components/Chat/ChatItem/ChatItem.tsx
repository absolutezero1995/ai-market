import { useNavigate } from 'react-router-dom';
import './ChatItem.css';


const ChatItem = ({ chats, setChatHistory }) => {

    const navigate = useNavigate();

    const handleChat = (id) => {
        // getHistory(id);
        navigate(`/chat/${id}`);
    }
    

    return (
        <div className='chat-item-container' key={chats.id}>
            <div className='chat-item-title'>
                <input type='button' onClick={() => handleChat(chats.id)} value={chats.title} />
            </div>
            <div className='chat-item-btn-settings'>
                <button type="button" >*</button>
            </div>
        </div>
    )
}

export default ChatItem