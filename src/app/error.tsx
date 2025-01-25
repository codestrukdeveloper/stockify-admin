"use client"; // Mark this component as a Client Component

import React from "react";
import { Box, Typography, Button, Paper } from "@mui/material";

const GlobalErrorPage = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  // Log the error for debugging (only in development)
  if (process.env.NODE_ENV === "development") {
    console.error("Global Error:", error);
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f8f9fa",
        padding: "20px",
      }}
    >
      <Typography variant="h3" sx={{ marginBottom: "1rem", color: "#343a40" }}>
        Something went wrong!
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: "2rem", color: "#6c757d" }}>
        We apologize for the inconvenience. Please try again or contact support if
        the issue persists.
      </Typography>

      {/* Display error details (only in development) */}
      {process.env.NODE_ENV === "development" && (
        <Paper
          elevation={3}
          sx={{
            padding: "20px",
            marginBottom: "2rem",
            maxWidth: "600px",
            width: "100%",
            backgroundColor: "#fff",
          }}
        >
          <Typography variant="h5" sx={{ marginBottom: "1rem" }}>
            Error Details
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: "0.5rem" }}>
            <strong>Message:</strong> {error.message}
          </Typography>
          {error.digest && (
            <Typography variant="body1" sx={{ marginBottom: "0.5rem" }}>
              <strong>Digest:</strong> {error.digest}
            </Typography>
          )}
          <Typography variant="body1" sx={{ marginBottom: "0.5rem" }}>
            <strong>Stack:</strong> {error.stack}
          </Typography>
        </Paper>
      )}

      {/* Retry button */}
      <Button
        variant="contained"
        color="primary"
        onClick={reset}
        sx={{
          padding: "10px 20px",
          fontSize: "1rem",
          textTransform: "none",
          transition: "background-color 0.3s ease",
          "&:hover": {
            backgroundColor: "#0056b3",
          },
        }}
      >
        Try Again
      </Button>
    </Box>
  );
};

export default GlobalErrorPage;