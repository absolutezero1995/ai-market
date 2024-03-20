import React, { useState } from "react";

function Conversation() {
  const [, setFrom] = useState(false);

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
