import { useState } from "react";
import "./Leftbar.css";
import ConversationForm from "../Rightbar/Conversation/ConvesationForm/ConversationForm";

interface Props {
  visible: boolean;
  chats: JSX.Element[];
}

function LeftBar({ visible, chats }: Props) {
  const [setting, setSetting] = useState(false);
  return (
    <div className={`block-left-bar ${!visible ? "hidden" : ""}`}>
      <div className="block-left-bar-content">
        <div className="block-navbar">
          <p>Your chat</p>
          <ul>
            {chats.map((chat, index) => (
              <li key={index}>
                {chat}
                <br />
                название чата из бд
                <br />
                <button
                  type="button"
                  onClick={() => setSetting((prev) => !prev)}
                >
                  Setting
                </button>
                {setting && <ConversationForm />}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default LeftBar;
