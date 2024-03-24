// import "./RightBar.css"
// // import { useCategoryContext } from "./CategoryContext";
// import { fetchCategories } from "../../features/categoty";
// import { useAppDispatch } from "../../hooks/redux";

// interface visibleProps {
//     visibleR: boolean;
// }


// function RightBar({ visibleR }: visibleProps) {
//     // const {setSelectedCategory} = useCategoryContext()
//     const dispatch = useAppDispatch()
    
//     const categories = [{category: "Conversation"}, {category: "Image"}, {category: "Video"}, {category: "Audio"}]
//     const onHandleOpenCategoryChat = async(index: number) => {
//         try {
//             await dispatch(fetchCategories(index))
//         } catch (error) {
//             console.log(error);
            
//         }
//     };

//     return (
//         <div className={`block-right-bar ${!visibleR ? 'hiddenR' : ''}`}>
//             <div className="block-navbar">
//                 <p>Category</p>
//                 <ul className="content-navbar-right">
//                     {categories.map((category, index) => (
//                         <li onClick={() => onHandleOpenCategoryChat(index)} key={index}>{category.category}</li>
//                     ))}
//                 </ul>
//             </div>
//         </div>
//     )
// }

// export default RightBar

import { useState } from "react";
import "./RightBar.css";
import { useAppDispatch } from "../../hooks/redux";
import { fetchCategories } from "../../features/categoty";

interface Category {
  category: string;
}

interface RightBarProps {
  visibleR: boolean;
}

function RightBar({ visibleR }: RightBarProps) {
  const categories: Category[] = [
    { category: "Conversation" },
    { category: "Image" },
    { category: "Video" },
    { category: "Audio" }
  ];
  const dispatch = useAppDispatch()

  const onHandleOpenCategoryChat = async(index: number) => {
    try {
        await dispatch(fetchCategories(index))
    } catch (error) {
        console.log(error);
        
    }
  };

  return (
    <div className={`block-right-bar ${!visibleR ? 'hiddenR' : ''}`}>
      <div className="block-navbar">
        <p>Category</p>
        <ul className="content-navbar-right">
          {categories.map((category, index) => (
            <li onClick={() => onHandleOpenCategoryChat(index)} key={index}>{category.category}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default RightBar;
