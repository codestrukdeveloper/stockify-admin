export interface IBalanceSheet {
    _id?: string;
    period?: string;
    cashEqlt?: string;
    nonCurrentAsset?: string;
    currentAsset?: string;
    totalAsset?: string;
    eqShareCap?: string;
    reserves?: string;
    totalEq?: string;
    nonCurrentLiability?: string;
    currentLiability?: string;
    totalLiability?: string;
    totalEqLiability?: string;
    companyId?: string;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string | null; // For soft deletes
  }
  
  import React, { useState } from "react";
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
  } from "@mui/material";
  import AddCircleIcon from "@mui/icons-material/AddCircle";
  import EditIcon from "@mui/icons-material/Edit";
  import SaveIcon from "@mui/icons-material/Save";
  import DeleteIcon from "@mui/icons-material/Delete";
  
  interface EditableBalanceSheetProps {
    data: IBalanceSheet[];
    onChange: (updatedBalanceSheet: IBalanceSheet[]) => void;
  }
  
  const EditableBalanceSheet: React.FC<EditableBalanceSheetProps> = ({
    data,
    onChange,
  }) => {
    const [balanceSheets, setBalanceSheets] = useState<IBalanceSheet[]>(
      data.length > 0
        ? data
        : [
            {
              period: new Date().getFullYear().toString(),
              cashEqlt: "0",
              nonCurrentAsset: "0",
              currentAsset: "0",
              totalAsset: "0",
              eqShareCap: "0",
              reserves: "0",
              totalEq: "0",
              nonCurrentLiability: "0",
              currentLiability: "0",
              totalLiability: "0",
              totalEqLiability: "0",
            },
          ]
    );
    const [isEditable, setIsEditable] = useState(false);
    const [editMode, setEditMode] = useState<{ [key: number]: boolean }>({});
  
    const BALANCE_SHEET_LABELS: { [key in keyof IBalanceSheet]?: string } = {
      cashEqlt: "Cash & Cash Equivalents",
      nonCurrentAsset: "Non-Current Assets",
      currentAsset: "Current Assets",
      totalAsset: "Total Assets",
      eqShareCap: "Equity Share Capital",
      reserves: "Reserves",
      totalEq: "Total Equity",
      nonCurrentLiability: "Non-Current Liabilities",
      currentLiability: "Current Liabilities",
      totalLiability: "Total Liabilities",
      totalEqLiability: "Total Equity & Liabilities",
    };
  
    const handleAddYear = () => {
      const newBalanceSheets = [...balanceSheets];
      const newPeriod = (
        parseInt(
          newBalanceSheets[newBalanceSheets.length - 1].period ||
            new Date().getFullYear().toString()
        ) + 1
      ).toString();
  
      const newYearBalanceSheet: IBalanceSheet = {
        period: newPeriod,
        cashEqlt: "0",
        nonCurrentAsset: "0",
        currentAsset: "0",
        totalAsset: "0",
        eqShareCap: "0",
        reserves: "0",
        totalEq: "0",
        nonCurrentLiability: "0",
        currentLiability: "0",
        totalLiability: "0",
        totalEqLiability: "0",
      };
  
      newBalanceSheets.push(newYearBalanceSheet);
      setBalanceSheets(newBalanceSheets);
      onChange(newBalanceSheets);
    };
  
    const handleDeleteYear = (index: number) => {
      if (balanceSheets.length > 1) {
        const newBalanceSheets = balanceSheets.filter((_, i) => i !== index);
        setBalanceSheets(newBalanceSheets);
        onChange(newBalanceSheets);
      }
    };
  
    const handleEditIndicator = (
      periodIndex: number,
      key: keyof IBalanceSheet,
      value: string
    ) => {
      const newBalanceSheets = [...balanceSheets];
      newBalanceSheets[periodIndex] = {
        ...newBalanceSheets[periodIndex],
        [key]: value,
      };
      setBalanceSheets(newBalanceSheets);
      onChange(newBalanceSheets);
    };
  
    const handleEditPeriod = (index: number, newPeriod: string) => {
      const newBalanceSheets = [...balanceSheets];
      newBalanceSheets[index] = {
        ...newBalanceSheets[index],
        period: newPeriod,
      };
      setBalanceSheets(newBalanceSheets);
      onChange(newBalanceSheets);
  
      setEditMode((prev) => ({
        ...prev,
        [index]: false,
      }));
    };
  
    return (
      <Box mt={3}>
        <Typography
          textAlign="center"
          textTransform="uppercase"
          variant="h1"
          fontWeight="bold"
        >
          Balance Sheet{" "}
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
                  Indicator
                </TableCell>
                {balanceSheets.map((balanceSheet, index) => (
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
                        value={balanceSheet.period}
                        variant="standard"
                        type="number"
                        InputProps={{
                          style: { color: "white", textAlign: "center" },
                          inputProps: { min: 2000 },
                        }}
                        onChange={(e) => {
                          const newBalanceSheets = [...balanceSheets];
                          newBalanceSheets[index] = {
                            ...newBalanceSheets[index],
                            period: e.target.value,
                          };
                          setBalanceSheets(newBalanceSheets);
                        }}
                        onBlur={() =>
                          handleEditPeriod(index, balanceSheet.period || "")
                        }
                        autoFocus
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
                        {balanceSheet.period}
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
              {Object.keys(BALANCE_SHEET_LABELS).map((key) => (
                <TableRow key={key}>
                  <TableCell align="left" sx={{ fontWeight: "bold" }}>
                    {BALANCE_SHEET_LABELS[key as keyof IBalanceSheet]}
                  </TableCell>
                  {balanceSheets.map((balanceSheet, periodIndex) => (
                    <TableCell key={periodIndex} align="center">
                      {isEditable ? (
                        <TextField
                          value={balanceSheet[key as keyof IBalanceSheet] || "0"}
                          variant="standard"
                          type="number"
                          onChange={(e) =>
                            handleEditIndicator(
                              periodIndex,
                              key as keyof IBalanceSheet,
                              e.target.value
                            )
                          }
                          InputProps={{
                            style: { textAlign: "center" },
                            inputProps: { min: 0 },
                          }}
                          fullWidth
                        />
                      ) : (
                        balanceSheet[key as keyof IBalanceSheet] || "0"
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  };
  
  export default EditableBalanceSheet;
  