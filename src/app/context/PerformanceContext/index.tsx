'use client'
import React, { createContext, useContext, useEffect, useState } from 'react';
import { IPerformance } from '@/app/(DashboardLayout)/types/apps/industry';
import axios from '@/utils/axios';

interface PerformanceContextType {
    performances: IPerformance[];
    loading: boolean;
    error: Error | null;
    deleteEmail: () => {},
    addPerformance: (newPerformance: IPerformance) => void;
    updatePerformance: (updatedPerformance: IPerformance) => void;
}

export const PerformanceContext = createContext<PerformanceContextType | any>(undefined);

export const PerformanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [performances, setPerformance] = useState<IPerformance[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/data/performancedata');
                setPerformance(response.data);
                setLoading(false);
            } catch (error) {
                // setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Function to delete an performance
    const deletePerformance = async (id: number) => {
        try {

            await axios.delete('/api/data/performancedata/deleteperformance', { data: { performanceId: id } });
            setPerformance((prevPerformance) => prevPerformance.filter((performance) => performance.id !== id));
        } catch (error) {
            console.error('Error deleting performance:', error);

        }
    };

    const addPerformance = async (newPerformance: IPerformance) => {
        try {
            const response = await axios.post('/api/data/performancedata/addperformance', newPerformance);
            const addedPerformance = response.data;
            setPerformance((prevPerformance) => [...prevPerformance, addedPerformance]);
        } catch (error) {
            console.error('Error adding performance:', error);
        }
    };

    //  Function to update an performance
    const updatePerformance = async (updatedPerformance: IPerformance) => {
        try {
            const response = await axios.put('/api/data/performancedata/updateperformance', updatedPerformance);
            const updated = response.data;
            setPerformance((prevPerformance) =>
                prevPerformance.map((performance) => (performance.id === updated.id ? updated : performance))
            );
        } catch (error) {
            console.error('Error updating performance:', error);
        }
    };

    return (
        <PerformanceContext.Provider value={{ performances, loading, error, deletePerformance, addPerformance, updatePerformance }}>
            {children}
        </PerformanceContext.Provider>
    );
};
