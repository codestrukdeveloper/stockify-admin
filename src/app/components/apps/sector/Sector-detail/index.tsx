"use client";
import React, { useContext, useEffect, useState } from "react";
import { SectorContext } from "@/app/context/SectorContext/index";
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

const SectorDetail = () => {
  const { sectors } = useContext(SectorContext);
  const [selectedSector, setSelectedSector]: any = useState(null);

  useEffect(() => {
    // Set the first sector as the default selected sector initially
    if (sectors.length > 0) {
      setSelectedSector(sectors[0]);
    }
  }, [sectors]);

  // Get the last part of the URL path as the billFrom parameter
  const pathName = usePathname();
  const getTitle = pathName.split("/").pop();

  // Find the sector that matches the billFrom extracted from the URL
  useEffect(() => {
    if (getTitle) {
      const sector = sectors.find(
        (p: { name: string }) => p.name === getTitle
      );
      if (sector) {
        setSelectedSector(sector);
      }
    }
  }, [getTitle, sectors]);

  if (!selectedSector) {
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
                {selectedSector.name}
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
          href={`/apps/sector/edit/${selectedSector.name}`}
        >
          Edit Sector
        </Button>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          href="/apps/sector/list"
        >
          Back to Sector List
        </Button>
      </Box>
    </>
  );
};

export default SectorDetail;
