import React, { useState } from "react";
import ConversationForm from "./ConvesationForm/ConversationForm";

function Conversation() {
  const [form, setFrom] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setFrom((prev) => !prev)}>
        Conversation
      </button>
      {/* {form && <ConversationForm />} */}
    </>
  );
}

export default Conversation;
