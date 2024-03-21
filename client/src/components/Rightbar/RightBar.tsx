import "./RightBar.css"
import { useCategoryContext } from "./CategoryContext";

interface visibleProps {
    visibleR: boolean;
}

function RightBar({ visibleR }: visibleProps) {
    const {setSelectedCategory} = useCategoryContext()
    const categories = [{category: "Conversation"}, {category: "Image"}, {category: "Video"}, {category: "Audio"}]
    const onHandleOpenCategoryChat = (category: string) => {
        setSelectedCategory(category)
    };

    return (
        <div className={`block-right-bar ${!visibleR ? 'closeR' : 'openR'}`}>
            <div className="block-right-bar-content">
                <div className="block-navbar">
                    <p>Category</p>
                    <ul>
                        {categories.map((category, index) => (
                            <li onClick={() => onHandleOpenCategoryChat(category.category)} key={index}>{category.category}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default RightBar
