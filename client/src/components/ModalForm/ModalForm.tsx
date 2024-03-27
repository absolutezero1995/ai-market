import React, { ReactNode } from "react";
import "./ModalForm.css";

interface ModalFormProps {
  title: string;
  children: ReactNode | undefined;
  onSave: (data: { [key: string]: string }) => void;
  onClose: () => void;
  positiveButtonMessage: string;
  negativeButtonMessage: string;
  showButtons: boolean;
}

const Modal: React.FC<ModalFormProps> = ({
  title,
  children,
  onSave,
  onClose,
  positiveButtonMessage = "Ok",
  negativeButtonMessage = "Cancel",
  showButtons,
}) => {
  const handleSubmit = () => {
    const inputs = document.querySelectorAll("input");
    const data: { [key: string]: string } = {};
    inputs.length === 0 && onClose();
    inputs.forEach((input) => {
      const { name, value } = input;
      data[name] = value;
    });
    onSave(data);
    onClose();
  };
  return (
    <div className="modalContent">
      <div className="modalClose"><span onClick={onClose}>&#10006;</span></div>
        <h2 className="headerText">{title}</h2>
      <div className="mainBody">
      {children}</div>
      { showButtons &&
      <div className="modalBtn">
        <button onClick={handleSubmit}>{positiveButtonMessage}</button>
        <button onClick={onClose}>{negativeButtonMessage}</button>
      </div>
      }
    </div>
  );
};

export default Modal;
