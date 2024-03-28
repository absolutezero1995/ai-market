import "./RightBar.css";
import { useCategoryContext } from "./CategoryContext";
import ProfileList from "../ProfileBar/ProfileList/ProfileList";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/redux";
import { getCategories, getCategoryList } from "../../features/chat/chatSlice";

interface visibleProps {
    visibleR: boolean;
    onCategoryClick: () => void;
}

function RightBar({ visibleR, onCategoryClick }: visibleProps) {
    const dispatch = useAppDispatch();
    const [categories, setCategories] = useState([]);
    const { setSelectedCategory } = useCategoryContext() || {};


    const onHandleOpenCategoryChat = async (categoryId) => {
        try {
            const res = await dispatch(getCategoryList(categoryId))
            setSelectedCategory?.(categoryId);
        } catch (error) {
            console.log(error);
        }
 


    };

    useEffect( () => {
        const axiosCategories = async () => {
        const res = await dispatch(getCategories());
        console.log(res.payload, 'res28')
        if(res){
            setCategories(res.payload)
        }
        onHandleOpenCategoryChat(1)
        }
        axiosCategories();
    }, [])

    return (
        <div className={`block-right-bar ${!visibleR ? 'hiddenR' : ''}`}>
            <div className="block-navbar">
                    <div className="profile-icon-container">
                    <ProfileList />
                <ul className="content-navbar-right">
                    {categories.map((category) => {
                        console.log(category.id , " - id")
                        return(<li onClick={() => onHandleOpenCategoryChat(category.id)} key={category.id}>{category.category}</li>)
                    })}
                </ul>
            </div>
            </div>
        </div>
    );
}

export default RightBar;
