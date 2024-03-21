import { createContext, useContext, useState, Dispatch, SetStateAction, ReactNode } from "react";

interface CategoryContexType {
    selectedCategory: string | null;
    setSelectedCategory: Dispatch<SetStateAction<string | null>> | null;
}

const CategoryContext = createContext<CategoryContexType | undefined>(undefined);

export const useCategoryContext = () => {
    const context = useContext(CategoryContext);
    return context;
}

export const CategoryProvider: React.FC<{children: ReactNode}>= ({ children }) => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    return ( 
        <CategoryContext.Provider value={{ selectedCategory, setSelectedCategory }}>
            {children}
        </CategoryContext.Provider>
    );
}
