"use client";
import React, { useContext, useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Button,
  MenuItem,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
  IconButton,
  Tooltip,
  Box,
  Stack,
  Divider,
  Grid,
  TextField,
} from "@mui/material";
import CustomFormLabel from "@/app/components/forms/theme-elements/CustomFormLabel";
import ErrorMessage from "@/app/components/shared/ErrorMessage";
import { isServerError } from "@/app/(DashboardLayout)/action";
import { ServerErrorRender } from "@/app/components/shared/ServerErrorRender";
import toast from "react-hot-toast";
import { ICategory } from "@/app/(DashboardLayout)/types/apps/category";
import { updateCategoryById } from "@/app/(DashboardLayout)/apps/category/action";

const EditCategoryData = ({ categoryData: initialData }: { categoryData: ICategory }) => {

  const [categoryData, setDepositData] = useState<ICategory>(initialData);
  const [showAlert, setShowAlert] = useState(false);
  const [editing, setEditing] = useState(false);

  const pathName = usePathname();
  const getTitle = pathName.split("/").pop();
  const router = useRouter();
  console.log("categoryData", categoryData);
  const handleSave = async () => {
    try {
      const isUpdated = await updateCategoryById(categoryData._id!, categoryData);


      if (isServerError(isUpdated)) {

        return <ServerErrorRender error={isUpdated.error} />

      }


      setEditing(false); 
      setShowAlert(true);

      // Navigate to the list page
      toast.success("updated");
      router.push("/apps/category/list");
    } catch (error) {
      console.error("Error updating deposit:", error);
    }

    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };

  const handleCancel = () => {
    setEditing(false);
  };

  if (!categoryData) {
    return <ErrorMessage error={{ message: "Data Not Found" }} />;
  }



  return (
    <Box>
      <Stack
        direction="row"
        spacing={{ xs: 1, sm: 2, md: 4 }}
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h5"># {categoryData._id}</Typography>
        <Box display="flex" gap={1}>
          {editing ? (
            <>
              <Button variant="contained" color="primary" onClick={handleSave}>
                Save
              </Button>
              <Button variant="outlined" color="error" onClick={handleCancel}>
                Cancel
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              color="info"
              onClick={() => setEditing(true)}
            >
              Edit Deposit
            </Button>
          )}
        </Box>
      </Stack>
      <Divider></Divider>

      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6}>
          <CustomFormLabel>Name</CustomFormLabel>

          <TextField

            disabled={!editing}
            value={categoryData.name}
            onChange={(e: any) =>
              setDepositData({ ...categoryData, name: e.target.value })
            }
            fullWidth
          />
        </Grid>

      </Grid>


      {showAlert && (
        <Alert
          severity="success"
          sx={{ position: "fixed", top: 16, right: 16 }}
        >
          Deposit data updated successfully.
        </Alert>
      )}
    </Box>
  );
};

export default EditCategoryData;
