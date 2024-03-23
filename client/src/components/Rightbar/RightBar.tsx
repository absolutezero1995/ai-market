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
        <div className={`block-right-bar ${!visibleR ? 'hiddenR' : ''}`}>
            <div className="block-navbar">
                <p>Category</p>
                <ul className="content-navbar-right">
                    {categories.map((category, index) => (
                        <li onClick={() => onHandleOpenCategoryChat(category.category)} key={index}>{category.category}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default RightBar