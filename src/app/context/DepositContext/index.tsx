'use client'
import React, { createContext, useContext, useEffect, useState } from 'react';
import { DepositList } from '@/app/(DashboardLayout)/types/apps/industry';
import axios from '@/utils/axios';

interface DepositContextType {
    deposits: DepositList[];
    loading: boolean;
    error: Error | null;
    deleteEmail: () => {},
    addDeposit: (newDeposit: DepositList) => void;
    updateDeposit: (updatedDeposit: DepositList) => void;
}

export const DepositContext = createContext<DepositContextType | any>(undefined);

export const DepositProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [deposits, setDeposits] = useState<DepositList[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/data/depositdata');
                setDeposits(response.data);
                setLoading(false);
            } catch (error) {
                // setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Function to delete an deposit
    const deleteDeposit = async (id: number) => {
        try {

            await axios.delete('/api/data/depositdata/deletedeposit', { data: { depositId: id } });
            setDeposits((prevDeposits) => prevDeposits.filter((deposit) => deposit.id !== id));
        } catch (error) {
            console.error('Error deleting deposit:', error);

        }
    };

    const addDeposit = async (newDeposit: DepositList) => {
        try {
            const response = await axios.post('/api/data/depositdata/adddeposit', newDeposit);
            const addedDeposit = response.data;
            setDeposits((prevDeposits) => [...prevDeposits, addedDeposit]);
        } catch (error) {
            console.error('Error adding deposit:', error);
        }
    };

    //  Function to update an deposit
    const updateDeposit = async (updatedDeposit: DepositList) => {
        try {
            const response = await axios.put('/api/data/depositdata/updatedeposit', updatedDeposit);
            const updated = response.data;
            setDeposits((prevDeposits) =>
                prevDeposits.map((deposit) => (deposit.id === updated.id ? updated : deposit))
            );
        } catch (error) {
            console.error('Error updating deposit:', error);
        }
    };

    return (
        <DepositContext.Provider value={{ deposits, loading, error, deleteDeposit, addDeposit, updateDeposit }}>
            {children}
        </DepositContext.Provider>
    );
};
