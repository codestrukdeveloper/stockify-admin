'use client'
import React, { createContext, useContext, useEffect, useState } from 'react';
import { CategoryList } from '@/app/(DashboardLayout)/types/apps/industry';
import axios from '@/utils/axios';

interface CategoryContextType {
    categories: CategoryList[];
    loading: boolean;
    error: Error | null;
    deleteEmail: () => {},
    addCategory: (newCategory: CategoryList) => void;
    updateCategory: (updatedCategory: CategoryList) => void;
}

export const CategoryContext = createContext<CategoryContextType | any>(undefined);

export const CategoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [categories, setCategories] = useState<CategoryList[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/data/categorydata');
                setCategories(response.data);
                setLoading(false);
            } catch (error) {
                // setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Function to delete an category
    const deleteCategory = async (id: number) => {
        try {

            await axios.delete('/api/data/categorydata/deletecategory', { data: { categoryId: id } });
            setCategories((prevCategories) => prevCategories.filter((category) => category.id !== id));
        } catch (error) {
            console.error('Error deleting category:', error);

        }
    };

    const addCategory = async (newCategory: CategoryList) => {
        try {
            const response = await axios.post('/api/data/categorydata/addcategory', newCategory);
            const addedCategory = response.data;
            setCategories((prevCategories) => [...prevCategories, addedCategory]);
        } catch (error) {
            console.error('Error adding category:', error);
        }
    };

    //  Function to update an category
    const updateCategory = async (updatedCategory: CategoryList) => {
        try {
            const response = await axios.put('/api/data/categorydata/updatecategory', updatedCategory);
            const updated = response.data;
            setCategories((prevCategories) =>
                prevCategories.map((category) => (category.id === updated.id ? updated : category))
            );
        } catch (error) {
            console.error('Error updating category:', error);
        }
    };

    return (
        <CategoryContext.Provider value={{ categories, loading, error, deleteCategory, addCategory, updateCategory }}>
            {children}
        </CategoryContext.Provider>
    );
};
