import { useNavigate } from 'react-router-dom';
import './ChatItem.css';
import {  useState } from 'react';

const ChatItem = ({ chats, setChatHistory }) => {

    const navigate = useNavigate();

const getHistory = async (id) => {
        try {
            const res = await fetch(`http://localhost:3000/api/gethistorychat/${id}`);
            const data = await res.json()
            console.log(data)
            setChatHistory(data);
        } catch (error) {
            console.log(error)
        }
    }

    const handleChat = (id) => {
        getHistory(id);
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