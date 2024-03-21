import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import "./Table.css";

import { sendMessage } from '../../features/chat/chatSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useState } from 'react';

function Table() {
  const dispatch = useAppDispatch();
  const [input, setInput] = useState<string>('');
  const [views, setViews] = useState<Array<string>>([]);
  const view = useAppSelector((state) => state.chat.view);


  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setViews([...views, input])
      handleSend();
    }
  }
  
  const handleSend = async () => {
    try {
      const res = await dispatch(sendMessage(input));
      setViews(prevViews => [...prevViews, res.payload]);
      setInput('');
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className='chat-container'>
      <div className="chat-messages">
        {views.map((el, i) => (
          <div key={i} className="message">{el}</div>
        ))}
      </div>
      <div className="block-search">
        <input className="input-search" placeholder="Введите ваше сообщение..." type='text' value={input} onChange={handleOnChange} onKeyPress={handleKeyPress} />
        <button className="btn-send" type='button' onClick={handleSend}><FontAwesomeIcon icon={faPaperPlane} /></button>
      </div>
    </div>
  );
}

export default Table;
