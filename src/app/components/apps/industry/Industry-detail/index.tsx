"use client";
import React, { useContext, useEffect, useState } from "react";
import { IndustryContext } from "@/app/context/IndustryContext/index";
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

const IndustryDetail = () => {
  const { industries } = useContext(IndustryContext);
  const [selectedIndustry, setSelectedIndustry]: any = useState(null);

  useEffect(() => {
    // Set the first industry as the default selected industry initially
    if (industries.length > 0) {
      setSelectedIndustry(industries[0]);
    }
  }, [industries]);

  // Get the last part of the URL path as the billFrom parameter
  const pathName = usePathname();
  const getTitle = pathName.split("/").pop();

  // Find the industry that matches the billFrom extracted from the URL
  useEffect(() => {
    if (getTitle) {
      const industry = industries.find(
        (p: { name: string }) => p.name === getTitle
      );
      if (industry) {
        setSelectedIndustry(industry);
      }
    }
  }, [getTitle, industries]);

  if (!selectedIndustry) {
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
                {selectedIndustry.name}
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
          href={`/apps/industry/edit/${selectedIndustry.name}`}
        >
          Edit Industry
        </Button>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          href="/apps/industry/list"
        >
          Back to Industry List
        </Button>
      </Box>
    </>
  );
};

export default IndustryDetail;
