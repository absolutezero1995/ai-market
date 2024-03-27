import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import "./ConversationForm.css";

function ConversationForm(): JSX.Element {
  const [model, setModel] = useState("gpt-3.5-turbo");
  const [temperature, setTemperature] = useState(0.7);
  const [role, setRole] = useState("default");

  const handleOnForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const getBackgroundColor = (temp: number): string => {
    const r = Math.round((1 - temp) * 255);
    const g = Math.round(temp * 255);
    return `rgb(${r}, ${g}, 0)`;
  };

  const inputRangeStyle = {
    "--range-background": getBackgroundColor(temperature),
  };


  return (
    <div className="block-addChat">
    <form name="addChat-form">
      <p>Title Chat:</p>
      <input type="text" name="title" placeholder="Name chats..."/>
      <p>Model:</p>
      <select value={model} onChange={(e) => setModel(e.target.value)} onFocus={(e) => e.target.parentElement.classList.add('select-focused')} onBlur={(e) => e.target.parentElement.classList.remove('select-focused')}>
        <option value="gpt-3.5-turbo">GPT 3.5-TURBO</option>
        <option value="gpt-4" disabled>GPT 4</option>
      </select>
      <p>Temperature: <span>{temperature}</span></p>
      <input
          type="range"
          name="temperature"
          min={0}
          max={1}
          step={0.1}
          value={temperature}
          onChange={(e) => setTemperature(parseFloat(e.target.value))}
          style={inputRangeStyle}
        />
      <p>Role:</p>
      <select value={role} onChange={(e) => setRole(e.target.value)} onFocus={(e) => e.target.parentElement.classList.add('select-focused')} onBlur={(e) => e.target.parentElement.classList.remove('select-focused')}>
          <option value="parent">Parent</option>
          <option value="teacher">Teacher</option>
          <option value="programmer">Programmer</option>
      </select>
    </form>
    </div>
  );
}

export default ConversationForm;
