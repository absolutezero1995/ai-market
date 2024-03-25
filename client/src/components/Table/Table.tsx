import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faTrash, faCopy } from '@fortawesome/free-solid-svg-icons';
import "./Table.css";

import { deleteMessage, saveMessage, sendMessage } from '../../features/chat/chatSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useEffect, useRef, useState } from 'react';

interface Message {
    message: string;
    content: string;
}

interface ChatState {
    messages: string[];
    view: string[];
    status: 'idle' | 'loading' | 'success' | 'failed';
    error: string | null;
}

interface RootState {
    chat: ChatState;
}

function Table({ id, chatHistory, setChatHistory }) {
    const dispatch = useAppDispatch();
    const [textarea, setTextarea] = useState<string>('');
    const [views, setViews] = useState<Message[]>([]);
    const [isSending, setIsSending] = useState<boolean>(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const stateView = useAppSelector((state: RootState) => state.chat.view)

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.focus();
        }
    }, [views]);

    const getHistory = async () => {
        try {
            const res = await fetch(`http://localhost:3000/api/gethistorychat/${id}`);
            const data = await res.json()
            console.log(data[0].chat_id, 'DATA43');
            if (data !== undefined) {
                setViews(data);
            }
            console.log(chatHistory, 'CHATHISTORY')

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        console.log('I AM USEEFFECT');
        getHistory()
    }, [id])

    const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const currentTextarea = textareaRef.current;
        if (currentTextarea) {
            const singleLineHeight = 22;
            currentTextarea.style.height = '22px';
            const scrollHeight = currentTextarea.scrollHeight - 30;
            if (scrollHeight > singleLineHeight) {
                currentTextarea.style.height = `${scrollHeight}px`;
            } else {
                currentTextarea.style.height = `${singleLineHeight}px`;
            }

            if (scrollHeight > 200) {
                currentTextarea.style.overflowY = 'scroll';
                currentTextarea.style.height = '200px';
            } else {
                currentTextarea.style.overflowY = 'hidden';
            }

            setTextarea(e.target.value); // .replace(/^\s+/g, '')
        }
    }

    const messageChatGPT = async () => {
        try {
            setIsSending(true);
            const chat_id = id;
            const res = await dispatch(sendMessage({ chat_id, request: textarea }));
            const newMessage: Message = { chat_id, request: textarea, responce: res.payload as string };
            setViews(prevViews => [...prevViews, newMessage]);
            dispatch(saveMessage(newMessage));
            setTextarea('');
            setIsSending(false);
        } catch (e) {
            console.error("Ошибка отправки сообщения:", e);
            setIsSending(false);
        }
    }

    const handleKeyPress = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (textarea.length !== 0 && e.key === 'Enter' && !e.shiftKey) {
            await messageChatGPT();
        }
    }

    const handleSend = async () => {
        if (textarea.length !== 0) {
            await messageChatGPT();
        }
    }

    const handleCopy = (content: string) => {
        navigator.clipboard.writeText(content)
    }

    const handleDelete = async (index: number, id: number) => {
        try {
            console.log('!!!!!!!!!!!!!!!!!!!');
            const deletedMessage = views[index] as Message;
            const stateViewIndex = stateView.findIndex((message) => {
                if (typeof message === 'string' && typeof deletedMessage === 'string') {
                    return message === deletedMessage;
                }
                if (typeof message !== 'string' && typeof deletedMessage !== 'string') {
                    return (message as Message).content === deletedMessage.content;
                }
                return false;
            });
            setViews(prevViews => prevViews.filter((_, i) => i !== index)); // Удаляем сообщение из views
            dispatch(deleteMessage(id))
            // Удаляем сообщение из stateView и обновляем Redux state
            // if (stateViewIndex !== -1) {
            //     const newStateView = [...stateView];
            //     newStateView.splice(stateViewIndex, 1);
            //     console.log(id, 'id132')
            //     dispatch(deleteMessage(id));
            // }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div>
            {/* <div>
                {chatHistory.length !== 0 ? (
                    chatHistory.map(chatHistoryItem => (
                        <div key={chatHistoryItem.id}> 
                            {chatHistoryItem.request}
                            {chatHistoryItem.responce}
                        </div>
                    ))
                ) : (
                    <div>
                        No history
                    </div>
                )}      
            </div> */}
            <div>
                {views.map((el, i) => {
                    return (
                        <div key={i} className='block-table'>
                            <p>chat{el.chat_id}: {el.request}</p>
                            <p>ChatGPT: {el.responce}</p>
                            <button onClick={() => handleCopy(el.content)}><FontAwesomeIcon icon={faCopy} /></button>
                            <button onClick={() => handleDelete(i, el.id)}><FontAwesomeIcon icon={faTrash} /></button>
                        </div>
                    )
                })}
            </div>
            <div className="block-search">
                <textarea
                    className="textarea-search"
                    placeholder="Введите ваш запрос..."
                    value={textarea}
                    onChange={handleOnChange}
                    ref={textareaRef}
                    disabled={isSending}
                    onKeyPress={handleKeyPress}
                    autoFocus
                />
                <button className="btn-search" type='button' onClick={handleSend} disabled={textarea.length === 0}><FontAwesomeIcon icon={faPaperPlane} /></button>
            </div>
        </div>
    );
}
export default Table;
