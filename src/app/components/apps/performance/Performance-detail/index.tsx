"use client";
import React, { useContext, useEffect, useState } from "react";
import { PerformanceContext } from "@/app/context/PerformanceContext/index";
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

const PerformanceDetail = () => {
  const { performances } = useContext(PerformanceContext);
  const [selectedPerformance, setSelectedPerformance]: any = useState(null);

  useEffect(() => {
    // Set the first performance as the default selected performance initially
    if (performances.length > 0) {
      setSelectedPerformance(performances[0]);
    }
  }, [performances]);

  // Get the last part of the URL path as the billFrom parameter
  const pathName = usePathname();
  const getTitle = pathName.split("/").pop();

  // Find the performance that matches the billFrom extracted from the URL
  useEffect(() => {
    if (getTitle) {
      const performance = performances.find(
        (p: { name: string }) => p.name === getTitle
      );
      if (performance) {
        setSelectedPerformance(performance);
      }
    }
  }, [getTitle, performances]);

  if (!selectedPerformance) {
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
                {selectedPerformance.name}
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
          href={`/apps/performance/edit/${selectedPerformance.name}`}
        >
          Edit Performance
        </Button>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          href="/apps/performance/list"
        >
          Back to Performance List
        </Button>
      </Box>
    </>
  );
};

export default PerformanceDetail;
