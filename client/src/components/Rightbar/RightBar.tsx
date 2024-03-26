import "./RightBar.css";
import { useCategoryContext } from "./CategoryContext";
import ProfileList from "../ProfileBar/ProfileList/ProfileList";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/redux";
import { getCategory } from "../../features/chat/chatSlice";

interface visibleProps {
    visibleR: boolean;
    onCategoryClick: () => void;
}

function RightBar({ visibleR, onCategoryClick }: visibleProps) {
    const dispatch = useAppDispatch();
    const [categories, setCategories] = useState([]);
    const { setSelectedCategory } = useCategoryContext() || {};


    const onHandleOpenCategoryChat = (categoryId) => {
        setSelectedCategory?.(categoryId);
        onCategoryClick();
    };

    useEffect( () => {
        const axiosCategories = async () => {
        const res = await dispatch(getCategory());
        if(res){
            setCategories(res.payload)
        }
        }
        axiosCategories();
    }, [])

    return (
        <>
        <div className="right-bar-container">
        <div className="hide-icone">
            {/* <span className="icon-bar" onClick={toggleRightBar}>
                {rightBarVisible ? <FontAwesomeIcon icon={faChevronLeft} /> : <FontAwesomeIcon icon={faChevronRight} />}
                </span> */}
            </div>
        <div className={`block-right-bar ${!rightBarVisible ? "hiddenR" : ""}`}>
            <div className="block-navbar">
            <div className="profile-icon-container">
                <ProfileList />
            </div>
                <ul className="content-navbar-right">
                    {categories.map((category) => {
                        console.log(category.id , " - id")
                        return(<li onClick={() => onHandleOpenCategoryChat(category.id)} key={category.id}>{category.category}</li>)
                    })}
                </ul>
                <div className="profile-icon-container">
                <ProfileList />
            </div>
            </div>
        </div>
    );
}

export default RightBar;
