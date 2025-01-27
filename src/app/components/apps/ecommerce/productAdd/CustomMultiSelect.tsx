import { Common } from '@/app/(DashboardLayout)/types/apps/common';
import { IDeposit } from '@/app/(DashboardLayout)/types/apps/deposit';
import { Box, Select, MenuItem, InputLabel, FormControl, Chip, Checkbox, ListItemText, SelectChangeEvent, FormHelperText } from '@mui/material';
import React, { useState } from 'react';

interface CustomMultiSelectProps {
    name: string;
    onChange: (value: string[]) => void; // Pass array of selected values
    options: IDeposit[];
    error?: boolean;
    helperText?: string;
    id: string;

  }
  
const CustomMultiSelect: React.FC<CustomMultiSelectProps> = ({
    name,
    onChange,
    options,
    error,
    helperText,
    id
}) => {
    const [selectedValues, setSelectedValues] = useState<string[]>([]);

    const handleChange = (event: SelectChangeEvent<string[]>) => {
        const value = event.target.value as string[];
        setSelectedValues(value);
        onChange(value); // Pass array of selected values
    };

    return (
        <div id={id}>

        <FormControl fullWidth variant="filled" error={error}>
            <InputLabel>{name}</InputLabel>
            <Select
                multiple
                value={selectedValues}
                onChange={handleChange}
                id={`company.${name}`}

                sx={{
                    height: "64px"
                }}
                renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                            <Chip key={value} label={options.find((option:IDeposit) => option._id === value)?.name} />
                        ))}
                    </Box>
                )}
            >
                {Array.isArray(options) ? options?.map((option:IDeposit) => (
                    <MenuItem key={option._id} value={option._id}>
                        <Checkbox checked={selectedValues.indexOf(option._id!) > -1} />
                        <ListItemText primary={option.name} />
                    </MenuItem>
                )):null}
            </Select>
            {error && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
        </div>

    );
};

export default CustomMultiSelect;