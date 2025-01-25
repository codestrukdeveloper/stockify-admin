import { Common } from "@/app/(DashboardLayout)/types/apps/common";
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, FormHelperText } from "@mui/material";

export interface SelectProps {
    options: Common[];
    name: "categoryId" | "depositsId" | "sectorId"|"dhrpId" | "industryId" | "performanceId";
    onChange: (value: string) => void;
    value?: string;
    error?: boolean; // Prop to indicate if there's an error
    helperText?: string; // Prop to display the error message
}

export const CustomSelect: React.FC<SelectProps> = ({ 
    name, 
    options, 
    value = '', 
    onChange, 
    error = false, 
    helperText = '' 
}) => {
    const handleChange = (event: SelectChangeEvent) => {
        const selectedValue = event.target.value;
        onChange(selectedValue);
    };

    return (
        <Box>
            <FormControl fullWidth variant="filled" error={error}>
                <InputLabel>{name}</InputLabel>
                <Select
                    sx={{
                        height: "64px"
                    }}
                    id={`company.${name}`}
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
                {/* Display error message if error is true */}
                {error && <FormHelperText>{helperText}</FormHelperText>}
            </FormControl>
        </Box>
    );
};