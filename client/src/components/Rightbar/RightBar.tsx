import { useEffect, useState } from "react";
import "./RightBar.css";

interface visibleProps {
    visibleR: boolean;
}

function RightBar({ visibleR }: visibleProps) {
    const [isVisible, setIsVisible] = useState(visibleR);

    // Используем useEffect для обработки изменений видимости компонента
    useEffect(() => {
        setIsVisible(visibleR);
    }, [visibleR]);

    const handleHideClick = () => {
        // При нажатии на кнопку "Скрыть", устанавливаем isVisible в false
        setIsVisible(false);
    };

    return (
        <div className={`block-right-bar ${isVisible ? 'visible' : ''}`}>
            <div className="block-right-bar-content">
                <div className="block-navbar">
                    <p>Category</p>
                    <ul>
                        <li>chat1</li>
                        <li>chat2</li>
                        <li>chat3</li>
                        <li>chat1</li>
                        <li>chat1</li>
                        <li>chat1</li>
                        <li>chat1</li>
                        <li>chat1</li>
                    </ul>
                </div>
                <button onClick={handleHideClick} className="hide-button">Скрыть</button>
            </div>
        </div>
    );
}

export default RightBar;
