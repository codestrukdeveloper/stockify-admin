'use client'
import React, { createContext, useContext, useEffect, useState } from 'react';
import { DhrpsList } from '@/app/(DashboardLayout)/types/apps/industry';
import axios from '@/utils/axios';

interface DhrpsContextType {
    dhrpss: DhrpsList[];
    loading: boolean;
    error: Error | null;
    deleteEmail: () => {},
    addDhrps: (newDhrps: DhrpsList) => void;
    updateDhrps: (updatedDhrps: DhrpsList) => void;
}

export const DhrpsContext = createContext<DhrpsContextType | any>(undefined);

export const DhrpsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [dhrpss, setDhrps] = useState<DhrpsList[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/data/dhrpsdata');
                setDhrps(response.data);
                setLoading(false);
            } catch (error) {
                // setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Function to delete an dhrps
    const deleteDhrps = async (id: number) => {
        try {

            await axios.delete('/api/data/dhrpsdata/deletedhrps', { data: { dhrpsId: id } });
            setDhrps((prevDhrps) => prevDhrps.filter((dhrps) => dhrps.id !== id));
        } catch (error) {
            console.error('Error deleting dhrps:', error);

        }
    };

    const addDhrps = async (newDhrps: DhrpsList) => {
        try {
            const response = await axios.post('/api/data/dhrpsdata/adddhrps', newDhrps);
            const addedDhrps = response.data;
            setDhrps((prevDhrps) => [...prevDhrps, addedDhrps]);
        } catch (error) {
            console.error('Error adding dhrps:', error);
        }
    };

    //  Function to update an dhrps
    const updateDhrps = async (updatedDhrps: DhrpsList) => {
        try {
            const response = await axios.put('/api/data/dhrpsdata/updatedhrps', updatedDhrps);
            const updated = response.data;
            setDhrps((prevDhrps) =>
                prevDhrps.map((dhrps) => (dhrps.id === updated.id ? updated : dhrps))
            );
        } catch (error) {
            console.error('Error updating dhrps:', error);
        }
    };

    return (
        <DhrpsContext.Provider value={{ dhrpss, loading, error, deleteDhrps, addDhrps, updateDhrps }}>
            {children}
        </DhrpsContext.Provider>
    );
};
