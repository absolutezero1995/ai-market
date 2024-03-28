import React, { useState } from "react";
import { useCategoryContext } from "../Rightbar/CategoryContext";
import { useAppDispatch } from "../../hooks/redux";
import { createChat } from "../../features/chat/chatSlice";

function ConversationForm({ setShowModal }): JSX.Element {
  const { selectedCategory } = useCategoryContext() || {};
  const [model, setModel] = useState("gpt-3.5-turbo");
  const [temperature, setTemperature] = useState(0.7);
  const [title, setTitle] = useState('');
  const [role, setRole] = useState("default");
  const dispatch = useAppDispatch();

  const handleOnForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleInputChange = (e) => {
    setTitle(e.target.value);
  };

  const handleCreateChat =  async () => {
    console.log(title, 'title 19')
    console.log(selectedCategory, 'selectedCategory');
    await dispatch(createChat({category_id: selectedCategory, title}))
    setShowModal(false);
  }

  return (
    <form onSubmit={handleOnForm}>
        <label>Model</label>
        <input type="text" value={title} onChange={handleInputChange} />
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
      <button type="submit" onClick={handleCreateChat}>OK</button>
    </form>
  );
}

export default ConversationForm;