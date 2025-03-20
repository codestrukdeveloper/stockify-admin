"use client";
import React, { useState, useContext, useEffect } from "react";
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
import CustomTextField from "@/app/components/forms/theme-elements/CustomTextField";
import { createIndustry } from "@/app/(DashboardLayout)/apps/industry/action";
import toast from "react-hot-toast";
import { isServerError } from "@/app/(DashboardLayout)/action";
import { ServerErrorRender } from "@/app/components/shared/ServerErrorRender";
import { IError } from "@/app/(DashboardLayout)/types/apps/error";
import CustomFormLabel from "@/app/components/forms/theme-elements/CustomFormLabel";

const CreateIndustry = () => {
  const [showAlert, setShowAlert] = useState(false);
  const router = useRouter();
  const [error, setError] = useState<IError | null>();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    id: 0,
    name: ""
  });




  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    console.log("name", name, value)
    setFormData((prevData) => {
      const newFormData = { ...prevData, [name]: value };
      return {
        ...newFormData
      };
    });
    setError(null);
  };





  const handleSubmit = async (e: React.FormEvent) => {
    setSaving(true);
    e.preventDefault();
    try {
      const data = await createIndustry(formData);
      console.log("data", data);
      console.log("res", 'error' in data);
      if (isServerError(data)) {
        console.log("res.......", 'error' in data);

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
      router.push("/apps/industry/list");
    } catch (error) {

      console.error("Error adding industry:", error);
    }
    finally {
      setSaving(false);
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
                  router.push("/apps/industry/list");
                }}
              >
                Cancel
              </Button>
              <Button disabled={saving} type="submit" variant="contained" color="primary">
                Create Industry
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
              Industry added successfully.
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

export default CreateIndustry;
