import Conversation from "./Conversation/Conversation";
import "./RightBar.css";

interface Props {
  visibleR: boolean;
  addChat: (chat: JSX.Element) => void;
  // selectModel: (modelId: number) => void если будет БД с моделями
}

function RightBar({ visibleR, addChat, /*selectModel*/}: Props) {
  
  return (
    <div className={`block-right-bar ${!visibleR ? "hidden" : ""}`}>
      <div className="block-right-bar-content">
        <div className="block-navbar">
          <p>Category</p>
          <ul>
            <li onClick={() => addChat(<Conversation />)}>
              <Conversation />
            </li>
            <li>
              {/* логика для мапа нейронок */}
            </li>
            <li>chat2</li>
            <li>chat3</li>
            <li>chat1</li>
            <li>chat1</li>
            <li>chat1</li>
            <li>chat1</li>
            <li>chat1</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default RightBar;
