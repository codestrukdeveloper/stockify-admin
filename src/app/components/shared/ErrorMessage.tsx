'use client';

import React from 'react';
import { Alert, Box, Typography } from '@mui/material';
import { IError } from '@/app/(DashboardLayout)/types/apps/error';

interface ErrorMessageProps {
  error: IError;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {

  console.log("ERROR LOGIN",error)
  if (!error) return null;

  return (
    <Box mt={2}>
      <Alert severity="error" sx={{ mb: 2 }}>
        <Typography fontWeight={600}>{error.message}</Typography>
      </Alert>
      {error.errors && Object.keys(error.errors).length > 0 && (
        <Box>
          {Object.entries(error.errors).map(([field, message]) => (
            <Alert key={field} severity="warning" sx={{ mb: 1 }}>
              <strong>{field}: </strong> {message}
            </Alert>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ErrorMessage;
