"use client";
import React, { useState, useContext, useEffect } from "react";
import { GenderContext } from "@/app/context/GenderContext";
import {
  Alert,
  Button,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  Tooltip,
  Box,
  Stack,
  Divider,
  Grid,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { format, isValid } from "date-fns";
import {
  IconPlus,
  IconSquareRoundedPlus,
  IconTrash,
} from "@tabler/icons-react";
import CustomFormLabel from "@/app/components/forms/theme-elements/CustomFormLabel";
import CustomTextField from "@/app/components/forms/theme-elements/CustomTextField";

const CreateGender = () => {
  const { addGender, genders } = useContext(GenderContext);
  const [showAlert, setShowAlert] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    id: 0,
    name: ""
  });

  useEffect(() => {
    if (genders.length > 0) {
      const lastId = genders[genders.length - 1].id;
      setFormData((prevData: any) => ({
        ...prevData,
        id: lastId + 1,
      }));
    } else {
      setFormData((prevData: any) => ({
        ...prevData,
        id: 1,
      }));
    }
  }, [genders]);

 
  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const newFormData = { ...prevData, [name]: value };
      return {
        ...newFormData
      };
    });
  };

 



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addGender(formData);
      setFormData({
        id: 0,
        name: ""
      });
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
      router.push("/apps/gender/list");
    } catch (error) {
      console.error("Error adding gender:", error);
    }
  };



  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box>
          <Stack
            direction="row"
            spacing={{ xs: 1, sm: 2, md: 4 }}
            justifyContent="space-between"
            mb={3}
          >
            <Typography variant="h5"># {formData.id}</Typography>
            <Box display="flex" gap={1}>
              <Button
                variant="outlined"
                color="error"
                onClick={() => {
                  router.push("/apps/gender/list");
                }}
              >
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Create Gender
              </Button>
            </Box>
          </Stack>
          <Divider></Divider>
          <Stack
            direction="row"
            spacing={{ xs: 1, sm: 2, md: 4 }}
            justifyContent="space-between"
            alignItems="center"
            mb={3}
          >
         
           
          </Stack>
          <Divider></Divider>

          <Grid container spacing={3} mb={4}>
            
          
            <Grid item xs={12} sm={6}>
              <CustomFormLabel
                htmlFor="Name"
                sx={{
                  mt: 0,
                }}
              >
                Name
              </CustomFormLabel>
              <CustomTextField
                name="Name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
          </Grid>
          {showAlert && (
            <Alert
              severity="success"
              sx={{ position: "fixed", top: 16, right: 16 }}
            >
              Gender added successfully.
            </Alert>
          )}
        </Box>
      </form>
    </>
  );
};

export default CreateGender;
