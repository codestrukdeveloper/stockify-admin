'use client';
import { useState } from "react";
import { Box, FormControl, InputLabel, TextField, Autocomplete, FormHelperText } from "@mui/material";

export interface SelectProps {
    name: string;
    onChange: (value: string) => void;
    value?: string;
    error?: boolean;
    helperText?: string;
    id: string;
}

const staticOptions = [
    { _id: "NEWS", name: "NEWS" },
    { _id: "VIDEO", name: "VIDEO" }
];

export const CustomSelectType: React.FC<SelectProps> = ({
    name,
    value = '',
    onChange,
    error = false,
    helperText = '',
    id
}) => {
    const selectedOption = staticOptions.find(option => option._id === value) || null;

    const handleChange = (event: React.SyntheticEvent, newValue: { _id: string, name: string } | null) => {
        onChange(newValue?._id || '');
    };

    return (
        <div id={id}>
            <Box>
                <FormControl fullWidth variant="filled" error={error}>
                    <InputLabel shrink>{name}</InputLabel>
                    <Autocomplete
                        id={`company.${name}`}
                        options={staticOptions}
                        getOptionLabel={(option) => option.name}
                        value={selectedOption}
                        onChange={handleChange}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="filled"
                                placeholder={`Select ${name}`}
                                error={error}
                            />
                        )}
                        sx={{
                            "& .MuiFilledInput-root": {
                                paddingTop: "33px",
                            },
                        }}
                    />
                    {error && <FormHelperText>{helperText}</FormHelperText>}
                </FormControl>
            </Box>
        </div>
    );
};
