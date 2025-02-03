import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  IconButton,
  FormHelperText,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import { ICashflowSum } from "@/app/(DashboardLayout)/types/apps/ICashflowSum";
import ErrorMessage from "@/app/components/shared/ErrorMessage";

interface EditableCashflowSummaryProps {
  data: ICashflowSum[];
  onChange: (updatedCashflow: ICashflowSum[]) => void;
  validationErrors?: Record<string, string>; // Prop to pass validation errors
  id: string
}

const EditableCashflowSummary: React.FC<EditableCashflowSummaryProps> = ({
  data,
  onChange,
  validationErrors,
  id
}) => {
  const [cashflows, setCashflows] = useState<ICashflowSum[]>(
    data.length > 0
      ? data
      : [
        {
          period: new Date().getFullYear().toString(),
          operatingAct: "0",
          investingAct: "0",
          financialAct: "0",
          netCashFlow: "0",
        },
      ]
  );

  const [isEditable, setIsEditable] = useState(false);
  const [editMode, setEditMode] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    setCashflows(data);
  }, [data]);

  const CASHFLOW_LABELS: { [key in keyof ICashflowSum]?: string } = {
    operatingAct: "Operating Activities",
    investingAct: "Investing Activities",
    financialAct: "Financial Activities",
    netCashFlow: "Net Cash Flow",
  };

  const handleAddYear = () => {
    const newCashflows = [...cashflows];
    const newPeriod = (
      parseInt(
        newCashflows[newCashflows.length - 1].period ||
        new Date().getFullYear().toString()
      ) + 1
    ).toString();

    const newYearCashflow: ICashflowSum = {
      period: newPeriod,
      operatingAct: "0",
      investingAct: "0",
      financialAct: "0",
      netCashFlow: "0",
    };

    newCashflows.push(newYearCashflow);
    setCashflows(newCashflows);
    onChange(newCashflows);
  };

  const handleDeleteYear = (index: number) => {
    if (cashflows.length > 1) {
      const newCashflows = cashflows.filter((_, i) => i !== index);
      setCashflows(newCashflows);
      onChange(newCashflows);
    }
  };

  const handleEditField = (
    periodIndex: number,
    key: keyof ICashflowSum,
    value: string
  ) => {
    const newCashflows = [...cashflows];
    newCashflows[periodIndex] = {
      ...newCashflows[periodIndex],
      [key]: value,
    };
    setCashflows(newCashflows);
    onChange(newCashflows);
  };

  const handleEditPeriod = (index: number, newPeriod: string) => {
    const newCashflows = [...cashflows];
    newCashflows[index] = {
      ...newCashflows[index],
      period: newPeriod,
    };
    setCashflows(newCashflows);
    onChange(newCashflows);

    // Toggle edit mode for this period
    setEditMode((prev) => ({
      ...prev,
      [index]: false,
    }));
  };

  return (
    <div id={id}>

      <Box mt={3}>
        <Typography
          textAlign="center"
          textTransform="uppercase"
          variant="h1"
          fontWeight="bold"
        >
          Cash Flow{" "}
          <Typography
            component="span"
            sx={{
              color: "#2AA500",
              fontWeight: "inherit",
              fontSize: "inherit",
              lineHeight: "inherit",
            }}
          >
            Summary
          </Typography>
        </Typography>

        <Box display="flex" justifyContent="flex-end" mb={2}>
          <Button
            variant="contained"
            color={isEditable ? "success" : "primary"}
            startIcon={isEditable ? <SaveIcon /> : <EditIcon />}
            onClick={() => setIsEditable(!isEditable)}
          >
            {isEditable ? "Save" : "Edit"}
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddCircleIcon />}
            onClick={handleAddYear}
            sx={{ ml: 2 }}
          >
            Add Year
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  align="left"
                  sx={{
                    fontWeight: "bold",
                    backgroundColor: "black",
                    color: "white",
                  }}
                >
                  CASH FLOW SUMMARY
                </TableCell>

                {cashflows.map((cashflow, index) => (
                  <TableCell
                    key={index}
                    align="center"
                    sx={{
                      backgroundColor: "black",
                      color: "white",
                      position: "relative",
                    }}
                  >
                    {isEditable && editMode[index] ? (
                      <TextField
                        value={cashflow.period}
                        variant="standard"
                        type="text"
                        InputProps={{
                          style: {
                            color: "white",
                            textAlign: "center",
                          },
                          inputProps: { min: 2000 },
                        }}
                        onChange={(e) => {
                          const newCashflows = [...cashflows];
                          newCashflows[index] = {
                            ...newCashflows[index],
                            period: e.target.value,
                          };
                          setCashflows(newCashflows);
                        }}
                        onBlur={() => handleEditPeriod(index, cashflow.period || "")}
                        autoFocus
                        error={!!validationErrors?.[`cashflow[${index}].period`]} // Display error for period
                        helperText={validationErrors?.[`cashflow[${index}].period`]} // Error message for period
                      />
                    ) : (
                      <span
                        onClick={
                          isEditable
                            ? () =>
                              setEditMode((prev) => ({
                                ...prev,
                                [index]: true,
                              }))
                            : undefined
                        }
                        style={{ cursor: isEditable ? "pointer" : "default" }}
                      >
                        {cashflow.period}
                      </span>
                    )}

                    {isEditable && (
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDeleteYear(index)}
                        sx={{ position: "absolute", top: 5, right: 5 }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(CASHFLOW_LABELS).map((key) => (
                <TableRow key={key}>
                  <TableCell align="left" sx={{ fontWeight: "bold" }}>
                    {CASHFLOW_LABELS[key as keyof ICashflowSum]}
                  </TableCell>
                  {cashflows.map((cashflow, periodIndex) => (
                    <TableCell key={periodIndex} align="center">
                      {isEditable ? (
                        <TextField
                          value={cashflow[key as keyof ICashflowSum] || "0"}
                          variant="standard"
                          type="text"
                          onChange={(e) =>
                            handleEditField(
                              periodIndex,
                              key as keyof ICashflowSum,
                              e.target.value
                            )
                          }
                          InputProps={{
                            style: { textAlign: "center" },
                            inputProps: { min: 0 },
                          }}
                          fullWidth
                          error={!!validationErrors?.[`cashflow[${periodIndex}].${key}`]} // Display error for the field
                          helperText={validationErrors?.[`cashflow[${periodIndex}].${key}`]} // Error message for the field
                        />
                      ) : (
                        cashflow[key as keyof ICashflowSum] || "0"
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {validationErrors?.["cashFlow"] && (
          <Box
            sx={{
              color: "error.main",
              fontSize: "0.875rem",
              marginTop: 0.5,
            }}
          >
           <ErrorMessage error={{message:validationErrors["cashFlow"]}} />
          </Box>
        )}
      </Box>
    </div>
  );
};

export default EditableCashflowSummary;