'use client'
import React, { createContext, useContext, useEffect, useState } from 'react';
import { GenderList } from '@/app/(DashboardLayout)/types/apps/industry';
import axios from '@/utils/axios';

interface GenderContextType {
    genders: GenderList[];
    loading: boolean;
    error: Error | null;
    deleteEmail: () => {},
    addGender: (newGender: GenderList) => void;
    updateGender: (updatedGender: GenderList) => void;
}

export const GenderContext = createContext<GenderContextType | any>(undefined);

export const GenderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [genders, setGender] = useState<GenderList[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/data/genderdata');
                setGender(response.data);
                setLoading(false);
            } catch (error) {
                // setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Function to delete an gender
    const deleteGender = async (id: number) => {
        try {

            await axios.delete('/api/data/genderdata/deletegender', { data: { genderId: id } });
            setGender((prevGender) => prevGender.filter((gender) => gender.id !== id));
        } catch (error) {
            console.error('Error deleting gender:', error);

        }
    };

    const addGender = async (newGender: GenderList) => {
        try {
            const response = await axios.post('/api/data/genderdata/addgender', newGender);
            const addedGender = response.data;
            setGender((prevGender) => [...prevGender, addedGender]);
        } catch (error) {
            console.error('Error adding gender:', error);
        }
    };

    //  Function to update an gender
    const updateGender = async (updatedGender: GenderList) => {
        try {
            const response = await axios.put('/api/data/genderdata/updategender', updatedGender);
            const updated = response.data;
            setGender((prevGender) =>
                prevGender.map((gender) => (gender.id === updated.id ? updated : gender))
            );
        } catch (error) {
            console.error('Error updating gender:', error);
        }
    };

    return (
        <GenderContext.Provider value={{ genders, loading, error, deleteGender, addGender, updateGender }}>
            {children}
        </GenderContext.Provider>
    );
};
