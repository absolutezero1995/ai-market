import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faTrash, faCopy } from '@fortawesome/free-solid-svg-icons';
import "./Table.css";

import { deleteMessage, saveMessage, sendMessage } from '../../features/chat/chatSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

interface Message {
    id: number | string | undefined | null,
    request: string;
    responce: string;
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

function Table() {
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const [textarea, setTextarea] = useState<string>('');
    const stateView = useAppSelector((state: RootState) => state.chat.view)
    const [views, setViews] = useState<Message[]>([]);
    const [isSending, setIsSending] = useState<boolean>(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);  

    console.log(stateView, 'STATEVIEV 38');

    console.log(id, 'id39')
    useEffect(() => {
        setViews(stateView);
    }, [stateView])

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
            setTextarea(e.target.value);
        }
    }


    const messageChatGPT = async () => {
        try {
            setIsSending(true);
            const res = await dispatch(sendMessage({ id, request: textarea }));
            console.log(res.payload, 'res,payload 76');
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

    const handleDelete = async (index: number, messageId: number) => {
        try {
            // const deletedMessage = views[index];
            // console.log(deletedMessage, index, '!!!!!!!!!!!!!!!!!!!!!');
            // const stateViewIndex = stateView.findIndex((message) => {
            //     if (typeof message !== 'string' && typeof deletedMessage !== 'string') {
            //         return (message as Message).content === (deletedMessage as Message).content;
            //     }
            //     return false;
            // });
            await dispatch(deleteMessage({ index, messageId }));
        } catch (e) {
            console.error("Ошибка при удалении:", e);
        }
    }

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [views]);

    console.log(views, 'views 143');

    return (
        <div className='block-table'>
            <div className='table-inner'>
                {views && (
                    views.map((chat, index) => (
                        <div className='table-inner-item' key={index}>
                            <p>User:</p>
                            <div className='span-scroll'><span>{chat.request}</span></div>
                            <p>ChatGPT:</p>
                            <p className='span-scroll'>{chat.responce}</p>
                            <div>
                                <button onClick={() => handleCopy(chat.responce)}><FontAwesomeIcon icon={faCopy} /></button>
                                <button onClick={() => handleDelete(index, chat.id)}><FontAwesomeIcon icon={faTrash} /></button>
                            </div>
                        </div>
                    ))
                )}
                                <div ref={messagesEndRef} />
            </div>
            <div className='block-search'>
                <div className="search-inner">
                    <textarea className="textarea-search" placeholder="Введите ваш запрос..." value={textarea} onChange={handleOnChange} ref={textareaRef} disabled={isSending} onKeyPress={handleKeyPress} autoFocus />
                    <button className="btn-search" type='button' onClick={handleSend} disabled={textarea.length === 0}><FontAwesomeIcon icon={faPaperPlane} /></button>
                </div>
            </div>
        </div>
    );
}

export default Table;