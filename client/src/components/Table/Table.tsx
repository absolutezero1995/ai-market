// брат помоги с кодом
// import { useState } from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
// import "./Table.css";

// function Table(){
//   const [input, setInput] = useState<string>('');
//   // const [responses, setResponses] = useState('');
//   const [view, setView] = useState<string[]>([]);

//     const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//       setInput(e.target.value);
//     }

//     const handleKeyPress = (e:  React.KeyboardEvent<HTMLInputElement>) => {
//       if (e.key === 'Enter') {
//         handleSend()
//       }
//     }

// const handleSent = () => {
//   handleSend()
// }

// const handleSend = async () => {
//   try {
//     setView([...view, input]);
//     setInput('');
//     const response = await fetch("api/conversation", {
//       method: 'POST',
//       credentials: 'include',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ message: input })
//     });
//     if (!response.ok) {
//       throw new Error('Ошибка сети');
//     }
//     const data = await response.json();
//     setView(prevView => [...prevView, data.content]);
//     console.log(view, 'view');
//   } catch (error) {
//     console.error('Ошибка отправки сообщения:', error);
//   }
// }

//     return (
//       <div>
//         {view.map((el, i) => (
//           <div key={i}>{el}</div>
//         ))}
//         <div className="block-search">
//           <input className="input-search" placeholder="Введите ваш запрос..." type='text' value={input} onChange={handleOnChange} onKeyPress={handleKeyPress}/>
//           <button className="btn-search" type='button' onClick={handleSent}><FontAwesomeIcon icon={faPaperPlane} /></button>
//         </div>
//       </div>
//     );
// }

// export default Table

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import "./Table.css";

import { sendMessage } from '../../features/chat/chatSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useState } from 'react';

function Table() {
  const dispatch = useAppDispatch();
  const [input, setInput] = useState<string>('');
  const [views, setViews] = useState<Array>([]);
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
      console.log(res, 'TABLE92');
      setViews(prevViews => [...prevViews, res.payload]);
      setInput('');
    } catch (e) {
      console.log(e);
    }
  }



  return (
    <div>
      {views.map((el, i) => (
        <div key={i}>{el}</div>
      ))}
      <div className="block-search">
        <input className="input-search" placeholder="Введите ваш запрос..." type='text' value={input} onChange={handleOnChange} onKeyPress={handleKeyPress} />
        <button className="btn-search" type='button' onClick={handleSend}><FontAwesomeIcon icon={faPaperPlane} /></button>
      </div>
    </div>
  );
}

export default Table;