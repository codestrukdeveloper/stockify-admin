"use client";
import React, { useState, useContext, useEffect } from "react";
import {
  Alert,
  Button,

  Typography,

  Box,
  Stack,
  Divider,
  Grid,
} from "@mui/material";
import { useRouter } from "next/navigation";
import CustomFormLabel from "@/app/components/forms/theme-elements/CustomFormLabel";
import CustomTextField from "@/app/components/forms/theme-elements/CustomTextField";
import toast from "react-hot-toast";
import { isServerError } from "@/app/(DashboardLayout)/action";
import { IError } from "@/app/(DashboardLayout)/types/apps/error";
import { ServerErrorRender } from "@/app/components/shared/ServerErrorRender";
import { createCategory } from "@/app/(DashboardLayout)/apps/category/action";

const CreateCategory = () => {
  const [showAlert, setShowAlert] = useState(false);
  const router = useRouter();
  const [error, setError] = useState<IError | null>();

  const [formData, setFormData] = useState({
    id: 0,
    name: ""
  });


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
      const data = await createCategory(formData);
      if (isServerError(data)) {
        setError(data.error);
        return
      }
      setFormData({
        id: 0,
        name: ""
      });
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
      toast.success("created successfully")
      router.push("/apps/category/list");
    } catch (error) {
      console.error("Error adding category:", error);
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
                  router.push("/apps/category/list");
                }}
              >
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Create Category
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
                htmlFor="name"
                sx={{
                  mt: 0,
                }}
              >
                Name
              </CustomFormLabel>
              <CustomTextField
                name="name"
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
              Category added successfully.
            </Alert>
          )}
        </Box>
        {
          error &&
          <ServerErrorRender error={error} toastMessage />
        }
      </form>
    </>
  );
};

export default CreateCategory;
