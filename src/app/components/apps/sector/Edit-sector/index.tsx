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
import { ISector } from "@/app/(DashboardLayout)/types/apps/sector";
import { updateSectorById } from "@/app/(DashboardLayout)/apps/sector/action";
import { IError } from "@/app/(DashboardLayout)/types/apps/error";

const EditSectorPage = ({ SectorData: initialData }: { SectorData: ISector }) => {
  const [error, setError] = useState<IError | null>();
  const [saving, setSaving] = useState(false);


  const [SectorData, setSectorData] = useState<ISector>(initialData);
  const [showAlert, setShowAlert] = useState(false);
  const [editing, setEditing] = useState(false);

  const pathName = usePathname();
  const getTitle = pathName.split("/").pop();
  const router = useRouter();
  console.log("SectorData", SectorData);
  const handleSave = async () => {
    setSaving(true);

    try {
      const isUpdated = await updateSectorById(SectorData._id!, SectorData);


      if (isServerError(isUpdated)) {

        setError(isUpdated.error);
        return
      }


      setEditing(false); // Exit editing mode
      setShowAlert(true);

      // Navigate to the list page
      toast.success("updated");
      router.push("/apps/sector/list");
    } catch (error) {
      console.error("Error updating Sector:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditing(false);
  };

  if (!SectorData) {
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
        <Typography variant="h5"># {SectorData._id}</Typography>
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
              Edit Sector
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
            value={SectorData.name}
            onChange={(e: any) =>
              setSectorData({ ...SectorData, name: e.target.value })
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
          Sector data updated successfully.
        </Alert>
      )}

{
          error &&
          <ServerErrorRender error={error} toastMessage />
        }
    </Box>
  );
};

export default EditSectorPage;
