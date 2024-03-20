import React, { useState } from "react";

function ConversationForm(): JSX.Element {
  const [model, setModel] = useState("gpt-3.5-turbo");
  const [temperature, setTemperature] = useState(0.7);
  const [role, setRole] = useState("default");

  const handleOnForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={handleOnForm}>
        <label>Model</label>
        <br />
        <select value={model} onChange={(e) => setModel(e.target.value)}>
          <option value="gpt 3.5-turbo">GPT 3.5-TURBO</option>
          <option value="gpt 4">GPT 4</option>
        </select>
      <label>
        Temperature
        <input
          type="number"
          min={0}
          max={1}
          step={0.1}
          value={temperature}
          onChange={(e) => setTemperature(parseFloat(e.target.value))}
        />
      </label>
      <label>
        Role
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="parent">Parent</option>
          <option value="parent">Teacher</option>
          <option value="parent">Programer</option>
        </select>
      </label>
      <button type="submit">OK</button>
    </form>
  );
}

export default ConversationForm;
