'use client'
import React, { createContext, useContext, useEffect, useState } from 'react';
import { IIndustry } from '@/app/(DashboardLayout)/types/apps/industry';
import axios from '@/utils/axios';

interface IndustryContextType {
    industries: IIndustry[];
    loading: boolean;
    error: Error | null;
    deleteEmail: () => {},
    addIndustry: (newIndustry: IIndustry) => void;
    updateIndustry: (updatedIndustry: IIndustry) => void;
}

export const IndustryContext = createContext<IndustryContextType | any>(undefined);

export const IndustryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [industries, setIndustries] = useState<IIndustry[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/data/industrydata');
                setIndustries(response.data);
                setLoading(false);
            } catch (error) {
                // setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Function to delete an industry
    const deleteIndustry = async (id: number) => {
        try {

            await axios.delete('/api/data/industrydata/deleteindustry', { data: { industryId: id } });
            setIndustries((prevIndustries) => prevIndustries.filter((industry) => industry.id !== id));
        } catch (error) {
            console.error('Error deleting industry:', error);

        }
    };

    const addIndustry = async (newIndustry: IIndustry) => {
        try {
            const response = await axios.post('/api/data/industrydata/addindustry', newIndustry);
            const addedIndustry = response.data;
            setIndustries((prevIndustries) => [...prevIndustries, addedIndustry]);
        } catch (error) {
            console.error('Error adding industry:', error);
        }
    };

    //  Function to update an industry
    const updateIndustry = async (updatedIndustry: IIndustry) => {
        try {
            const response = await axios.put('/api/data/industrydata/updateindustry', updatedIndustry);
            const updated = response.data;
            setIndustries((prevIndustries) =>
                prevIndustries.map((industry) => (industry.id === updated.id ? updated : industry))
            );
        } catch (error) {
            console.error('Error updating industry:', error);
        }
    };

    return (
        <IndustryContext.Provider value={{ industries, loading, error, deleteIndustry, addIndustry, updateIndustry }}>
            {children}
        </IndustryContext.Provider>
    );
};
