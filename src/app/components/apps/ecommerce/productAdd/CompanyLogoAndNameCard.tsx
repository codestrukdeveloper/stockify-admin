"use client"
import { Box,Grid, TextField, InputLabel, Select, FormControl, SelectChangeEvent, MenuItem } from '@mui/material';
import { StaticImageData } from 'next/image';
import React, { useState } from 'react';
import CompanyImage from './CompanyImage';
import { Common } from '@/app/(DashboardLayout)/types/apps/common';
import CustomMultiSelect from './Select';

interface CompanyLogoAndNameCardProps {
    logo?: string | StaticImageData;
    name?: string;
    sector?: string;
    industry?: string;
    deposits?: string[];
};

const selectData: Common[] = [
    {
        _id: "1",
        name: "Cdsl",
    },
    {
        _id: "2",
        name: "nsdl",
    },
];


interface SelectProps {
    options: Common[];
    name: string;
    onChange?: (value: string) => void; // assuming the onChange expects a value
}

const CustomSelect: React.FC<SelectProps> = ({ options, name, onChange }) => {
    const [selectedValue, setSelectedValue] = useState<string>('');

    const handleChange = (event: SelectChangeEvent) => {
        const value = event.target.value;
        setSelectedValue(value);
        // onChange(value);
    };

    return (
        <Box>
            <FormControl fullWidth variant="filled">
                <InputLabel>{name}</InputLabel>
                <Select
            sx={{
                height:"64px"
            }}    
                    value={selectedValue}
                    onChange={handleChange}
                    label={name}
                    displayEmpty
                >
                    {options.map((option) => (
                        <MenuItem key={option._id} value={option._id}>
                            {option.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};
const CompanyLogoAndNameCard: React.FC<CompanyLogoAndNameCardProps> = (data: CompanyLogoAndNameCardProps) => {

    return (
        <Box
            display="flex"
            gap={2}
            flexWrap={"wrap"}
        >
            <Grid container spacing={2}>
                {/* Company Image Grid */}
                <Grid className='bg:black' item xs={12} md={3} display="flex" alignItems="center">
                    <CompanyImage />
                </Grid>

                {/* Company Name and Sector Fields Grid */}
                <Grid item xs={12} display={"flex"} flexDirection={"column"} gap={2} md={9}>
                    <TextField
                        className="w-full"
                        placeholder="Company Title"
                        variant="filled"
                    />
                    <Grid container  spacing={2}>
                        <Grid item xs={12} md={4}>
                            <CustomSelect name='Sector' options={selectData} />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <CustomSelect name='Industry' options={selectData} />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <CustomMultiSelect name='Deposits' options={selectData} />
                        </Grid>

                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default CompanyLogoAndNameCard;
