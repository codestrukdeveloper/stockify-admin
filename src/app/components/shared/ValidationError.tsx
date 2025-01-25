import React from "react";
import { Box } from "@mui/material";
import ErrorMessage from "@/app/components/shared/ErrorMessage"; // Adjust the import path as needed

interface ValidationErrorsProps {
  errors: Record<string, string>;
}

const ValidationErrors: React.FC<ValidationErrorsProps> = ({ errors }) => {
  return (
    <Box sx={{ mt: 2, color: "error.main" }}>
      {Object.entries(errors).map(([key, message]) => (
        <Box key={key} sx={{ mb: 1 }}>
          {/* Pass the error object with a message property */}
          <ErrorMessage error={{ message }} />
        </Box>
      ))}
    </Box>
  );
};

export default ValidationErrors;