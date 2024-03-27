import { createContext, useContext, useState, Dispatch, SetStateAction, ReactNode } from "react";

interface CategoryContexType {
    selectedCategory: string | number | null;
    setSelectedCategory: Dispatch<SetStateAction<string | number | null>> | null;
}

const CategoryContext = createContext<CategoryContexType | undefined>(undefined);

export const useCategoryContext = () => {
    const context = useContext(CategoryContext);
    return context;
}

export const CategoryProvider: React.FC<{children: ReactNode}>= ({ children }) => {
    const [selectedCategory, setSelectedCategory] = useState<string | number | null>(null);
    return ( 
        <CategoryContext.Provider value={{ selectedCategory, setSelectedCategory }}>
            {children}
        </CategoryContext.Provider>
    );
}