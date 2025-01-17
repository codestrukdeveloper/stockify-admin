"use client";
import React, { useContext, useState, useEffect } from "react";
import { DepositContext } from "@/app/context/DepositContext/index";
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

const EditDepositPage = () => {
  const { deposits, updateDeposit } = useContext(DepositContext);
  const [showAlert, setShowAlert] = useState(false);
  const [selectedDeposit, setSelectedDeposit] = useState<any>(null);
  const [editing, setEditing] = useState(false);
  const [editedDeposit, setEditedDeposit]: any = useState(null);

  const pathName = usePathname();
  const getTitle = pathName.split("/").pop();

  useEffect(() => {
    if (deposits.length > 0) {
      // If there's a specific item to edit, use it
      if (getTitle) {
        const deposit = deposits.find(
          (inv: { name: string }) => inv.name === getTitle
        );
        if (deposit) {
          setSelectedDeposit(deposit);
          setEditedDeposit({ ...deposit });
          setEditing(true);
        } else {
          // If specific item not found, fallback to default
          setSelectedDeposit(deposits[0]);
          setEditedDeposit({ ...deposits[0] });
          setEditing(true);
        }
      } else {
        // No specific item, default to the first deposit
        setSelectedDeposit(deposits[0]);
        setEditedDeposit({ ...deposits[0] });
        setEditing(true);
      }
    }
  }, [getTitle, deposits]);

  const router = useRouter();

  const handleSave = async () => {
    try {
      await updateDeposit(editedDeposit);
      setSelectedDeposit({ ...editedDeposit });
      setEditing(false); // Exit editing mode
      setShowAlert(true);

      // Navigate to the list page
      router.push("/apps/deposit/list");
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

  if (!selectedDeposit) {
    return <div>Please select an deposit.</div>;
  }

  const orderDate = selectedDeposit.orderDate;
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
        <Typography variant="h5"># {editedDeposit.id}</Typography>
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
          <CustomTextField
            value={editedDeposit.name}
            onChange={(e: any) =>
              setEditedDeposit({ ...editedDeposit, name: e.target.value })
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

export default EditDepositPage;
