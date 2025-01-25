import { Common } from "@/app/(DashboardLayout)/types/apps/common";
import { Box, FormControl, InputLabel, TextField, Autocomplete, FormHelperText } from "@mui/material";

export interface SelectProps {
    options: Common[];
    name: "categoryId" | "depositsId" | "sectorId" | "dhrpId" | "industryId" | "performanceId"|"relatbleStocks";
    onChange: (value: string) => void;
    value?: string;
    error?: boolean; // Prop to indicate if there's an error
    helperText?: string;
    id: string
    // Prop to display the error message
}

export const CustomSelect: React.FC<SelectProps> = ({
    name,
    options,
    value = '',
    onChange,
    error = false,
    helperText = '',
    id
}) => {
    // Find the selected option based on the value
    const selectedOption = options.find((option) => option._id === value) || null;

    const handleChange = (event: React.SyntheticEvent, newValue: Common | null) => {
        onChange(newValue?._id || ''); // Pass the selected value's ID to the parent
    };

    return (
        <div id={id}>

            <Box>
                <FormControl fullWidth variant="filled" error={error}>
                    <InputLabel shrink>{name}</InputLabel>
                    <Autocomplete
                        id={`company.${name}`}
                        options={options}
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