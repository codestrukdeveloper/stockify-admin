"use client";
import React, { useContext, useEffect, useState } from "react";
import { CategoryContext } from "@/app/context/CategoryContext/index";
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

const CategoryDetail = () => {
  const { categories } = useContext(CategoryContext);
  const [selectedCategory, setSelectedCategory]: any = useState(null);

  useEffect(() => {
    // Set the first category as the default selected category initially
    if (categories.length > 0) {
      setSelectedCategory(categories[0]);
    }
  }, [categories]);

  // Get the last part of the URL path as the billFrom parameter
  const pathName = usePathname();
  const getTitle = pathName.split("/").pop();

  // Find the category that matches the billFrom extracted from the URL
  useEffect(() => {
    if (getTitle) {
      const category = categories.find(
        (p: { name: string }) => p.name === getTitle
      );
      if (category) {
        setSelectedCategory(category);
      }
    }
  }, [getTitle, categories]);

  if (!selectedCategory) {
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
                {selectedCategory.name}
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
          href={`/apps/category/edit/${selectedCategory.name}`}
        >
          Edit Category
        </Button>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          href="/apps/category/list"
        >
          Back to Category List
        </Button>
      </Box>
    </>
  );
};

export default CategoryDetail;
