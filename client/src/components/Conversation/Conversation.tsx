import { useAppDispatch } from '../../hooks/redux'
import { getHistoryChat } from '../../features/chat/chatSlice'

function Conversation() {
    const dispatch = useAppDispatch()

    const onHandleConversationClick = async() =>{
        try {
            await dispatch(getHistoryChat({chat_id: 0}))
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
        <button type='button' onClick={onHandleConversationClick}>
            Conversation
        </button>
        </>

    )
}

export default Conversation