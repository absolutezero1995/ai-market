import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faTrash, faCopy } from '@fortawesome/free-solid-svg-icons';
import "./Table.css";

import { deleteMessage, getChats, saveMessage, sendMessage } from '../../features/chat/chatSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

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
    const {id} = useParams();
    console.log(typeof(id));
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
            if (scrollHeight > 150) {
                currentTextarea.style.overflowY = 'scroll';
                currentTextarea.style.height = '150px';
            } else {
                currentTextarea.style.overflowY = 'hidden';
            }
            setTextarea(e.target.value); // .replace(/^\s+/g, '')
        }
    }

    useEffect(() => {
        const axiosLibrary = async () => {
            const libraryChats = await dispatch(getChats(id))
            setViews(libraryChats.payload[0]);
            console.log(views)
            // console.log(libraryChats.payload[0].ChatHistories)
        }
        axiosLibrary()
    }, [id]);

    const messageChatGPT = async () => {
        try {
            setIsSending(true);
            const res = await dispatch(sendMessage(textarea));
            const newMessage: Message = { message: textarea, content: res.payload as string };
            setViews(prevViews => [...prevViews, res.payload as string]);
            dispatch(saveMessage(newMessage));
            setTextarea('');
            setIsSending(false);
            if (textareaRef.current) {
                textareaRef.current.style.height = '22px';
            }
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

    const handleDelete = async (index: number) => {
        try {
            const deletedMessage = views[index];
            console.log(deletedMessage);
            const stateViewIndex = stateView.findIndex((message) => {
                if (typeof message !== 'string' && typeof deletedMessage !== 'string') {
                    return (message as Message).content === (deletedMessage as Message).content;
                }
                return false;
            });
                setViews(prevViews => prevViews.filter((_, i) => i !== index));
                await dispatch(deleteMessage(stateViewIndex)); // Диспетчеризуем deleteMessage с обновленным stateView
        } catch (e) {
            console.error("Ошибка при удалении:", e);
        }
    }
    

    return (
        <div className='block-table'>
          <div className='table-inner'>
            {views}
            {/* {views.map((el) => {
            return (
                <div key={i} className='table-item'>
                    <p>User:</p>
                    <div className='span-scroll'><span>{el.message}</span></div>
                    <p>ChatGPT:</p>
                    <p className='span-scroll'>{el.content}</p>
                    <div>
                    <button onClick={() => handleCopy(el.content)}><FontAwesomeIcon icon={faCopy} /></button>
                    <button onClick={() => handleDelete(i)}><FontAwesomeIcon icon={faTrash} /></button>
                    </div>
                </div>
            )})} */}
            </div>
            <div className='block-search'>
                <div className="search-inner">
                    <textarea  className="textarea-search" placeholder="Введите ваш запрос..." value={textarea} onChange={handleOnChange} ref={textareaRef} disabled={isSending} onKeyPress={handleKeyPress} autoFocus/>
                    <button className="btn-search" type='button' onClick={handleSend} disabled={textarea.length === 0}><FontAwesomeIcon icon={faPaperPlane} /></button>
                </div>
            </div>
        </div>
    );
}
export default Table;
