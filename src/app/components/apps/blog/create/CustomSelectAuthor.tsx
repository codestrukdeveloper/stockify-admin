'use client';
import { useEffect, useState } from "react";
import { Box, FormControl, InputLabel, TextField, Autocomplete, FormHelperText } from "@mui/material";
import { IAuthor } from "@/app/(DashboardLayout)/types/apps/IAuthor";
import { fetchAuthors } from "@/app/(DashboardLayout)/apps/author/action";
import { isServerError } from "@/app/(DashboardLayout)/action";
import { IError } from "@/app/(DashboardLayout)/types/apps/error";
import { ServerErrorRender } from "@/app/components/shared/ServerErrorRender";

export interface SelectProps {
    name: string;
    onChange: (value: string) => void;
    value?: string;
    error?: boolean; // Prop to indicate if there's an error
    helperText?: string;
    id: string
    // Prop to display the error message
}

export const CustomSelectAuthor: React.FC<SelectProps> = ({
    name,

    value = '',
    onChange,
    error = false,
    helperText = '',
    id
}) => {
    const [authors, setAuthors] = useState<IAuthor[]>([]);
    const [search, setSearch] = useState<string>('');
    const [errors, setError] = useState<IError>();

    // Find the selected option based on the value
    const selectedOption = Array.isArray(authors) ? authors?.find((option) => option._id === value) || null : null;
    useEffect(() => {
        const fetchAuthor = async () => {
            try {
                const response = await fetchAuthors(1, 100);
                if (isServerError(response)) {
                    setError(response.error);
                    setAuthors([]); // Set authors to an empty array in case of error
                    return;
                }
                if (Array.isArray(response.data)) {
                    setAuthors(response.data);
                } else {
                    console.error("Expected an array of authors, but received:", response.data);
                    setAuthors([]); // Set authors to an empty array if the response is not an array
                }
            } catch (error) {
                console.error("Error fetching authors:", error);
                setAuthors([]); // Set authors to an empty array in case of unexpected errors
            }
        };
        fetchAuthor();
    }, [search]);
    const handleChange = (event: React.SyntheticEvent, newValue: IAuthor | null) => {
        onChange(newValue?._id || ''); // Pass the selected value's ID to the parent
    };

    return (
        <div id={id}>

            <Box>
                <FormControl fullWidth variant="filled" error={error}>
                    <InputLabel shrink>{name}</InputLabel>
                    <Autocomplete
                        id={`company.${name}`}
                        options={authors}
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
                    {errors && <ServerErrorRender error={errors}/>}
                    
                </FormControl>
            </Box>
        </div>
    );
};