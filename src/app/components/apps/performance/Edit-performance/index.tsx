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
import { IError } from "@/app/(DashboardLayout)/types/apps/error";
import { IPerformance } from "@/app/(DashboardLayout)/types/apps/peformance";
import { updatePerformanceById } from "@/app/(DashboardLayout)/apps/performance/action";

const EditPerformancePage = ({ performanceData: initialData }: { performanceData: IPerformance }) => {

  const [performanceData, setDepositData] = useState<IPerformance>(initialData);
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState<IError>();

  const [editing, setEditing] = useState(false);

  const pathName = usePathname();
  const getTitle = pathName.split("/").pop();
  const router = useRouter();
  console.log("performanceData", performanceData);
  const handleSave = async () => {
    try {
      const isUpdated = await updatePerformanceById(performanceData._id!, performanceData);


      if (isServerError(isUpdated)) {

        setError(isUpdated.error);
        return
      }


      setEditing(false); // Exit editing mode
      setShowAlert(true);

      // Navigate to the list page
      toast.success("updated");
      router.push("/apps/performance/list");
    } catch (error) {
      console.error("Error updating deposit:", error);
    }
  };

  const handleCancel = () => {
    setEditing(false);
  };

  if (!performanceData) {
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
        <Typography variant="h5"># {performanceData._id}</Typography>
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
              Edit Industry
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
            value={performanceData.name}
            onChange={(e: any) =>
              setDepositData({ ...performanceData, name: e.target.value })
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
          Industry data updated successfully.
        </Alert>
      )}

      {
        error &&
        <ServerErrorRender error={error} />
      }
    </Box>
  );
};

export default EditPerformancePage;
