import "./RightBar.css";
import { useCategoryContext } from "./CategoryContext";

interface visibleProps {
    visibleR: boolean;
    onCategoryClick: () => void;
}

function RightBar({ visibleR, onCategoryClick }: visibleProps) {
    const { setSelectedCategory } = useCategoryContext() || {};

    const categories = ["Conversation", "Image", "Video", "Audio"];

    const onHandleOpenCategoryChat = (category: string) => {
        setSelectedCategory?.(category);
        onCategoryClick();
    };

    return (
        <div className={`block-right-bar ${!visibleR ? 'hiddenR' : ''}`}>
            <div className="block-navbar">
                <p>Category</p>
                <ul className="content-navbar-right">
                    {categories.map((category, index) => (
                        <li onClick={() => onHandleOpenCategoryChat(category)} key={index}>{category}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default RightBar;
