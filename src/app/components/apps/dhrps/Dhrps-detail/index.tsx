"use client";
import React, { useContext, useEffect, useState } from "react";
import { DhrpsContext } from "@/app/context/DhrpsContext/index";
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

const DhrpsDetail = () => {
  const { dhrps : dhrpsData } = useContext(DhrpsContext);
  const [selectedDhrps, setSelectedDhrps]: any = useState(null);

  useEffect(() => {
    // Ensure dhrpsData is defined before accessing its length
    if (dhrpsData?.length > 0) {
      setSelectedDhrps(dhrpsData[0]);
    }
  }, [dhrpsData]);
  

  // Get the last part of the URL path as the billFrom parameter
  const pathName = usePathname();
  const getTitle = pathName.split("/").pop();

  // Find the dhrps that matches the billFrom extracted from the URL
  useEffect(() => {
    if (getTitle && dhrpsData) {
      const dhrps = dhrpsData.find(
        (p: { name: string }) => p.name === getTitle
      );
      if (dhrps) {
        setSelectedDhrps(dhrps);
      }
    }
  }, [getTitle, dhrpsData]);

  if (!selectedDhrps) {
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
                {selectedDhrps.name}
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
          href={`/apps/dhrps/edit/${selectedDhrps.name}`}
        >
          Edit Dhrps
        </Button>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          href="/apps/dhrps/list"
        >
          Back to Dhrps List
        </Button>
      </Box>
    </>
  );
};

export default DhrpsDetail;
