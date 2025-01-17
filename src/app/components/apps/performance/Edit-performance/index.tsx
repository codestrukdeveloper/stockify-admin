"use client";
import React, { useContext, useState, useEffect } from "react";
import { PerformanceContext } from "@/app/context/PerformanceContext/index";
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

const EditPerformancePage = () => {
  const { performances, updatePerformance } = useContext(PerformanceContext);
  const [showAlert, setShowAlert] = useState(false);
  const [selectedPerformance, setSelectedPerformance] = useState<any>(null);
  const [editing, setEditing] = useState(false);
  const [editedPerformance, setEditedPerformance]: any = useState(null);

  const pathName = usePathname();
  const getTitle = pathName.split("/").pop();

  useEffect(() => {
    if (performances.length > 0) {
      // If there's a specific item to edit, use it
      if (getTitle) {
        const performance = performances.find(
          (inv: { name: string }) => inv.name === getTitle
        );
        if (performance) {
          setSelectedPerformance(performance);
          setEditedPerformance({ ...performance });
          setEditing(true);
        } else {
          // If specific item not found, fallback to default
          setSelectedPerformance(performances[0]);
          setEditedPerformance({ ...performances[0] });
          setEditing(true);
        }
      } else {
        // No specific item, default to the first performance
        setSelectedPerformance(performances[0]);
        setEditedPerformance({ ...performances[0] });
        setEditing(true);
      }
    }
  }, [getTitle, performances]);

  const router = useRouter();

  const handleSave = async () => {
    try {
      await updatePerformance(editedPerformance);
      setSelectedPerformance({ ...editedPerformance });
      setEditing(false); // Exit editing mode
      setShowAlert(true);

      // Navigate to the list page
      router.push("/apps/performance/list");
    } catch (error) {
      console.error("Error updating performance:", error);
    }

    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };

  const handleCancel = () => {
    setEditing(false);
  };

  if (!selectedPerformance) {
    return <div>Please select an performance.</div>;
  }

  const orderDate = selectedPerformance.orderDate;
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
        <Typography variant="h5"># {editedPerformance.id}</Typography>
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
              Edit Performance
            </Button>
          )}
        </Box>
      </Stack>
      <Divider></Divider>

      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6}>
          <CustomFormLabel>Name</CustomFormLabel>
          <CustomTextField
            value={editedPerformance.name}
            onChange={(e: any) =>
              setEditedPerformance({ ...editedPerformance, name: e.target.value })
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
          Performance data updated successfully.
        </Alert>
      )}
    </Box>
  );
};

export default EditPerformancePage;
