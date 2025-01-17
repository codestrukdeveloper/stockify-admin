"use client";
import React, { useContext, useState, useEffect } from "react";
import { DhrpsContext } from "@/app/context/DhrpsContext/index";
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
} from "@mui/material";
import { format, isValid } from "date-fns";
import CustomFormLabel from "@/app/components/forms/theme-elements/CustomFormLabel";
import CustomSelect from "@/app/components/forms/theme-elements/CustomSelect";
import CustomTextField from "@/app/components/forms/theme-elements/CustomTextField";
import { IconSquareRoundedPlus, IconTrash } from "@tabler/icons-react";

const EditDhrpsPage = () => {
  const { dhrps : dhrpsData, updateDhrps } = useContext(DhrpsContext);
  const [showAlert, setShowAlert] = useState(false);
  const [selectedDhrps, setSelectedDhrps] = useState<any>(null);
  const [editing, setEditing] = useState(false);
  const [editedDhrps, setEditedDhrps]: any = useState(null);

  const pathName = usePathname();
  const getTitle = pathName.split("/").pop();

  useEffect(() => {
    if (dhrpsData && dhrpsData.length > 0) {
      if (getTitle) {
        const dhrps = dhrpsData.find(
          (inv: { name: string }) => inv.name === getTitle
        );
        if (dhrps) {
          setSelectedDhrps(dhrps);
          setEditedDhrps({ ...dhrps });
          setEditing(true);
        } else {
          setSelectedDhrps(dhrpsData[0]);
          setEditedDhrps({ ...dhrpsData[0] });
          setEditing(true);
        }
      } else {
        setSelectedDhrps(dhrpsData[0]);
        setEditedDhrps({ ...dhrpsData[0] });
        setEditing(true);
      }
    }
  }, [getTitle, dhrpsData]);
  

  const router = useRouter();

  const handleSave = async () => {
    try {
      await updateDhrps(editedDhrps);
      setSelectedDhrps({ ...editedDhrps });
      setEditing(false); // Exit editing mode
      setShowAlert(true);

      // Navigate to the list page
      router.push("/apps/dhrps/list");
    } catch (error) {
      console.error("Error updating dhrps:", error);
    }

    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };

  const handleCancel = () => {
    setEditing(false);
  };

  if (!selectedDhrps) {
    return <div>Please select an dhrps.</div>;
  }

  const orderDate = selectedDhrps.orderDate;
  const parsedDate = isValid(new Date(orderDate))
    ? new Date(orderDate)
    : new Date();
  const formattedOrderDate = format(parsedDate, "EEEE, MMMM dd, yyyy");

  return (
    <Box>
      <Stack
        direction="row"
        spacing={{ xs: 1, sm: 2, md: 4 }}
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h5"># {editedDhrps.id}</Typography>
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
          <CustomTextField
            value={editedDhrps.name}
            onChange={(e: any) =>
              setEditedDhrps({ ...editedDhrps, name: e.target.value })
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
