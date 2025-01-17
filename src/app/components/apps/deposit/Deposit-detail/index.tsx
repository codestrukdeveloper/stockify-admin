"use client";
import React, { useContext, useEffect, useState } from "react";
import { DepositContext } from "@/app/context/DepositContext/index";
import { usePathname } from "next/navigation";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Badge,
  Box,
  Stack,
  Chip,
  Divider,
  Grid,
} from "@mui/material";
import { format, isValid, parseISO } from "date-fns";
import Link from "next/link";
import Logo from "@/app/(DashboardLayout)/layout/shared/logo/Logo";

const DepositDetail = () => {
  const { deposits } = useContext(DepositContext);
  const [selectedDeposit, setSelectedDeposit]: any = useState(null);

  useEffect(() => {
    // Set the first deposit as the default selected deposit initially
    if (deposits.length > 0) {
      setSelectedDeposit(deposits[0]);
    }
  }, [deposits]);

  // Get the last part of the URL path as the billFrom parameter
  const pathName = usePathname();
  const getTitle = pathName.split("/").pop();

  // Find the deposit that matches the billFrom extracted from the URL
  useEffect(() => {
    if (getTitle) {
      const deposit = deposits.find(
        (p: { name: string }) => p.name === getTitle
      );
      if (deposit) {
        setSelectedDeposit(deposit);
      }
    }
  }, [getTitle, deposits]);

  if (!selectedDeposit) {
    return <div>Loading...</div>;
  }

  
  return (
    <>
    

      <Grid container spacing={3} mt={2} mb={4}>
        <Grid item xs={12} sm={6}>
          <Paper variant="outlined">
            <Box p={3} display="flex" flexDirection="column" gap="4px">
              <Typography variant="h6" mb={2}>
                From :
              </Typography>
              <Typography variant="body1">
                {selectedDeposit.name}
              </Typography>
             
            </Box>
          </Paper>
        </Grid>
       
      </Grid>

      <Box
        display="flex"
        alignItems="center"
        gap={1}
        mt={3}
        justifyContent="end"
      >
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          href={`/apps/deposit/edit/${selectedDeposit.name}`}
        >
          Edit Deposit
        </Button>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          href="/apps/deposit/list"
        >
          Back to Deposit List
        </Button>
      </Box>
    </>
  );
};

export default DepositDetail;
