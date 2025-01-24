"use client"
import { Box, Grid, TextField, InputLabel, Select, FormControl, SelectChangeEvent, MenuItem } from '@mui/material';
import { StaticImageData } from 'next/image';
import React, { useState } from 'react';
import CompanyImage from './CompanyImage';
import { Common } from '@/app/(DashboardLayout)/types/apps/common';
import CustomMultiSelect from './Select';
import { ICompany } from '@/app/(DashboardLayout)/types/apps/company';
import { ISector } from '@/app/(DashboardLayout)/types/apps/sector';
import { IDeposit } from '@/app/(DashboardLayout)/types/apps/deposit';
import { IIndustry } from '@/app/(DashboardLayout)/types/apps/industry';
import { IPerformance } from '@/app/(DashboardLayout)/types/apps/peformance';
import { ICategory } from '@/app/(DashboardLayout)/types/apps/category';

interface CompanyLogoAndNameCardProps {
    company?: Partial<ICompany>
    onChange: (key: keyof ICompany, value: string) => void;
    sectors: ISector[],
    logo:File|undefined|null,
    handleLogo:(file:File)=>void;
    deposits: IDeposit[],
    industries: IIndustry[],
    performances: IPerformance[],
    categories: ICategory[]
};

interface SelectProps {
    options: Common[];
    name: "categoryId" | "depositsId" | "sectorId" | "industryId" | "performanceId",
    onChange: (value: string) => void; 
    value?: string,
}

const CustomSelect: React.FC<SelectProps> = ({ name, options, value = '', onChange }) => {
    const handleChange = (event: SelectChangeEvent) => {
        const selectedValue = event.target.value;
        onChange(selectedValue);
    };

    return (
        <Box>
            <FormControl fullWidth variant="filled">
                <InputLabel>{name}</InputLabel>
                <Select
                    sx={{
                        height: "64px"
                    }}
                    value={value}
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

const CompanyLogoAndNameCard: React.FC<CompanyLogoAndNameCardProps> = ({
    company,
    onChange,
    sectors,
    industries,
    performances,
    deposits,
    handleLogo,
    logo,
    categories
}) => {
    return (
        <Box
            display="flex"
            gap={2}
            flexWrap={"wrap"}
        >
            <Grid container spacing={2}>
                <Grid className='bg:black' item xs={12} md={3} display="flex" alignItems="center">
                    <CompanyImage image={logo} onChangeImage={handleLogo} />
                </Grid>

                <Grid item xs={12} display={"flex"} flexDirection={"column"} gap={2} md={9}>
                    <TextField
                        className="w-full"
                        placeholder="Company Title"
                        variant="filled"
                        name='name'
                        value={company?.name || ''}
                        onChange={(e) => onChange("name", e.target.value)}
                    />
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
                            <CustomSelect
                                name="sectorId"
                                options={sectors}
                                value={company?.sectorId || ''}
                                onChange={(value) => onChange('sectorId', value)}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <CustomSelect 
                                name='industryId'  
                                value={company?.industryId || ''}
                                onChange={(value) => onChange('industryId', value)} 
                                options={industries} 
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <CustomSelect 
                                name="categoryId"
                                value={company?.categoryId || ''}
                                onChange={(value) => onChange('categoryId', value)} 
                                options={categories} 
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} mt={1}>
                        <Grid item xs={12}>
                            <CustomMultiSelect 
                                name="depositsId" 
                                onChange={(value) => onChange('depositsId', value)} 
                                options={deposits} 
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default CompanyLogoAndNameCard;