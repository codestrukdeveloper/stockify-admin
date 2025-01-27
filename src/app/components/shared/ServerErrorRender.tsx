"use client"
import { IError } from "@/app/(DashboardLayout)/types/apps/error";
import { Box } from "@mui/material";
import React, { useEffect } from "react";
import ErrorMessage from "./ErrorMessage";
import toast from "react-hot-toast";

interface ServerErrorRenderProps {
  error: IError;
  toastMessage?: boolean;
}

export const ServerErrorRender: React.FC<ServerErrorRenderProps> = ({
  error,
  toastMessage = false,
}) => {
  console.log("ServerErrorRender",error);
  useEffect(() => {
    if (toastMessage && error?.message) {
      const errorMessage = error.errors?.join(", ") || error.message; // Combine errors if they exist
      toast.error(errorMessage);
    }
  }, [error, toastMessage]);


  return (
    <Box>
      <ErrorMessage error={error} />
    </Box>
  );
};