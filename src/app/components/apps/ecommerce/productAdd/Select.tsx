import { Common } from '@/app/(DashboardLayout)/types/apps/common';
import { Box, Select, MenuItem, InputLabel, FormControl, Chip, Checkbox, ListItemText, SelectChangeEvent } from '@mui/material';
import React, { useState } from 'react';

interface SelectProps {
    options: Common[];
    name: string;
    onChange: (selected: string[]) => void; // handle multiple selections
}

const CustomMultiSelect: React.FC<SelectProps> = ({ options, name, onChange }) => {
    const [selectedValues, setSelectedValues] = useState<string[]>([]); // Track selected values
    const [open, setOpen] = useState(false); // Manage open state of the select

    // Handle changes to the selected options
    const handleChange = (event: SelectChangeEvent<string[]>) => {
        const value = event.target.value as string[];
        setSelectedValues(value);
        onChange(value); // Call the parent onChange with selected values
    };

    // Toggle the open/close state
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box >
            <FormControl fullWidth variant="filled">
                <InputLabel>{name}</InputLabel>
                <Select
                    sx={{
                        height: "64px"
                    }}
                    multiple
                    value={selectedValues}
                    onChange={handleChange}
                    open={open}
                    onOpen={handleOpen}
                    onClose={handleClose}

                    label={name}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip
                                    sx={{
                                        backgroundColor: 'transparent', // Remove background
                                        padding: '0px',
                                        height: "fit",
                                        margin: "0",
                                    }}
                                    key={value} label={options.find((option) => option._id === value)?.name} />
                            ))}
                        </Box>
                    )}
                >
                    {options.map((option) => (
                        <MenuItem key={option._id} value={option._id}>
                            <Checkbox checked={selectedValues.indexOf(option._id!) > -1} />
                            <ListItemText primary={option.name} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};

export default CustomMultiSelect;
