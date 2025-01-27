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
import { IDhrp } from "@/app/(DashboardLayout)/types/apps/IDhrp";
import { updateDhrpById } from "@/app/(DashboardLayout)/apps/dhrps/action";

const EditDhrpsPage = ({ dhrpsData: initialData }: { dhrpsData: IDhrp }) => {

  const [dhrpsData, setDepositData] = useState<IDhrp>(initialData);
  const [showAlert, setShowAlert] = useState(false);
  const [editing, setEditing] = useState(false);

  const pathName = usePathname();
  const getTitle = pathName.split("/").pop();
  const router = useRouter();
  console.log("dhrpsData", dhrpsData);
  const handleSave = async () => {
    try {
      const isUpdated = await updateDhrpById(dhrpsData._id!, dhrpsData);


      if (isServerError(isUpdated)) {

        return <ServerErrorRender error={isUpdated.error} />

      }


      setEditing(false); // Exit editing mode
      setShowAlert(true);

      // Navigate to the list page
      toast.success("updated");
      router.push("/apps/dhrps/list");
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

  if (!dhrpsData) {
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
        <Typography variant="h5"># {dhrpsData._id}</Typography>
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
              Edit Dhrps
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
            value={dhrpsData.name}
            onChange={(e: any) =>
              setDepositData({ ...dhrpsData, name: e.target.value })
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
          Dhrps data updated successfully.
        </Alert>
      )}
    </Box>
  );
};

export default EditDhrpsPage;
