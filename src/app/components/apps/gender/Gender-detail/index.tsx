"use client";
import React, { useContext, useEffect, useState } from "react";
import { GenderContext } from "@/app/context/GenderContext/index";
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

const GenderDetail = () => {
  const { genders } = useContext(GenderContext);
  const [selectedGender, setSelectedGender]: any = useState(null);

  useEffect(() => {
    // Set the first gender as the default selected gender initially
    if (genders.length > 0) {
      setSelectedGender(genders[0]);
    }
  }, [genders]);

  // Get the last part of the URL path as the billFrom parameter
  const pathName = usePathname();
  const getTitle = pathName.split("/").pop();

  // Find the gender that matches the billFrom extracted from the URL
  useEffect(() => {
    if (getTitle) {
      const gender = genders.find(
        (p: { name: string }) => p.name === getTitle
      );
      if (gender) {
        setSelectedGender(gender);
      }
    }
  }, [getTitle, genders]);

  if (!selectedGender) {
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
                {selectedGender.name}
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
          href={`/apps/gender/edit/${selectedGender.name}`}
        >
          Edit Gender
        </Button>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          href="/apps/gender/list"
        >
          Back to Gender List
        </Button>
      </Box>
    </>
  );
};

export default GenderDetail;
