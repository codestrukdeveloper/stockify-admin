'use client'
import React, { createContext, useContext, useEffect, useState } from 'react';
import { ISector } from '@/app/(DashboardLayout)/types/apps/industry';
import axios from '@/utils/axios';

interface SectorContextType {
    sectors: ISector[];
    loading: boolean;
    error: Error | null;
    deleteEmail: () => {},
    addSector: (newSector: ISector) => void;
    updateSector: (updatedSector: ISector) => void;
}

export const SectorContext = createContext<SectorContextType | any>(undefined);

export const SectorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [sectors, setIndustries] = useState<ISector[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/data/sectordata');
                setIndustries(response.data);
                setLoading(false);
            } catch (error) {
                // setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Function to delete an sector
    const deleteSector = async (id: number) => {
        try {

            await axios.delete('/api/data/sectordata/deletesector', { data: { sectorId: id } });
            setIndustries((prevIndustries) => prevIndustries.filter((sector) => sector.id !== id));
        } catch (error) {
            console.error('Error deleting sector:', error);

        }
    };

    const addSector = async (newSector: ISector) => {
        try {
            const response = await axios.post('/api/data/sectordata/addsector', newSector);
            const addedSector = response.data;
            setIndustries((prevIndustries) => [...prevIndustries, addedSector]);
        } catch (error) {
            console.error('Error adding sector:', error);
        }
    };

    //  Function to update an sector
    const updateSector = async (updatedSector: ISector) => {
        try {
            const response = await axios.put('/api/data/sectordata/updatesector', updatedSector);
            const updated = response.data;
            setIndustries((prevIndustries) =>
                prevIndustries.map((sector) => (sector.id === updated.id ? updated : sector))
            );
        } catch (error) {
            console.error('Error updating sector:', error);
        }
    };

    return (
        <SectorContext.Provider value={{ sectors, loading, error, deleteSector, addSector, updateSector }}>
            {children}
        </SectorContext.Provider>
    );
};
