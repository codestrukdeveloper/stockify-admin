'use client';
import { useEffect, useState } from "react";
import { ICompany } from "@/app/(DashboardLayout)/types/apps/ICompany";
import { Box, FormControl, InputLabel, TextField, Autocomplete, FormHelperText } from "@mui/material";
import { searchCompanies } from "@/app/(DashboardLayout)/apps/company/action";
import { isServerError } from "@/app/(DashboardLayout)/action";

export interface SelectProps {
    name: string;
    onChange: (value: string) => void;
    value?: string;
    error?: boolean; // Prop to indicate if there's an error
    helperText?: string;
    id: string
    // Prop to display the error message
}

export const CustomSelect: React.FC<SelectProps> = ({
    name,

    value = '',
    onChange,
    error = false,
    helperText = '',
    id
}) => {
    const [relatedStocks, setRelatedStocks] = useState<ICompany[]>([]);
    const [search, setSearch] = useState<string>('');
    // Find the selected option based on the value
    const selectedOption = Array.isArray(relatedStocks) ? relatedStocks?.find((option) => option._id === value) || null : null;

    useEffect(() => {
        const fetchRelatedStocks = async () => {

            const response = await searchCompanies(1, 100, search);
            if (isServerError(response)) {
                return response?.error;
            }
            setRelatedStocks(response.data);

        }
        fetchRelatedStocks();
    }, [search]);
    const handleChange = (event: React.SyntheticEvent, newValue: ICompany | null) => {
        onChange(newValue?._id || ''); // Pass the selected value's ID to the parent
    };

    return (
        <div id={id}>

            <Box>
                <FormControl fullWidth variant="filled" error={error}>
                    <InputLabel shrink>{name}</InputLabel>
                    <Autocomplete
                        id={`company.${name}`}
                        options={relatedStocks}
                        getOptionLabel={(option) => option.name} // Display the name of the option
                        value={selectedOption} // Set the selected value
                        onChange={handleChange}

                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="filled"
                                placeholder={`Select ${name}`}
                                error={error}
                            // helperText={helperText}
                            />
                        )}
                        sx={{
                            "& .MuiFilledInput-root": {
                                paddingTop: "33px", // Adjust padding for better alignment
                            },
                        }}
                    />
                    {/* Display error message if error is true */}
                    {error && <FormHelperText>{helperText}</FormHelperText>}
                </FormControl>
            </Box>
        </div>
    );
};