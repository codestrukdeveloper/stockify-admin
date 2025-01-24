import React, { useState } from 'react';
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
  IconButton 
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import { IProfitLosses } from '@/app/(DashboardLayout)/types/apps/IProfitLoss';

interface EditableProfitLossSummaryProps {
  data: IProfitLosses[];
  onChange: (updatedProfitLoss: IProfitLosses[]) => void;
}

const EditableProfitLossSummary: React.FC<EditableProfitLossSummaryProps> = ({ data, onChange }) => {
  const [profitLosses, setProfitLosses] = useState<IProfitLosses[]>(data.length > 0 ? data : [
    {
      period: new Date().getFullYear().toString(),
      revenue: "0",
      expense: "0",
      ebdita: "0",
      otherCost: "0",
      pbt: "0",
      taxExpense: "0",
      pat: "0",
      otherIncExpense: "0",
      incomeNet: "0",
      outstandingShare: "0",
      epsPerShare: "0",
      revGrowth: "0",
      ebitaMargin: "0",
      patMargin: "0",
      epsGrowth: "0",
    }
  ]);
  const [isEditable, setIsEditable] = useState(false);
  const [editMode, setEditMode] = useState<{ [key: number]: boolean }>({});

  const PROFIT_LOSS_LABELS: { [key in keyof IProfitLosses]?: string } = {
    revenue: "REVENUE",
    expense: "EXPENSE",
    ebdita: "EBDITA",
    otherCost: "OTHER COST",
    pbt: "PBT",
    taxExpense: "TAX EXPENSE",
    pat: "PAT",
    otherIncExpense: "OTHER INCOME/EXP.",
    incomeNet: "INCOME (NET OF TAXES)",
    outstandingShare: "OUTSTANDING SHARE",
    epsPerShare: "EPS (Rs/share)",
    revGrowth: "REVENUE GROWTH %",
    ebitaMargin: "EBIDTA MARGIN %",
    patMargin: "NET MARGIN %",
    epsGrowth: "EPS GROWTH %"
  };

  const handleAddYear = () => {
    const newProfitLosses = [...profitLosses];
    const newPeriod = (parseInt(newProfitLosses[newProfitLosses.length - 1].period || new Date().getFullYear().toString()) + 1).toString();
    
    const newYearProfitLoss: IProfitLosses = {
      period: newPeriod,
      revenue: "0",
      expense: "0",
      ebdita: "0",
      otherCost: "0",
      pbt: "0",
      taxExpense: "0",
      pat: "0",
      otherIncExpense: "0",
      incomeNet: "0",
      outstandingShare: "0",
      epsPerShare: "0",
      revGrowth: "0",
      ebitaMargin: "0",
      patMargin: "0",
      epsGrowth: "0",
    };

    newProfitLosses.push(newYearProfitLoss);
    setProfitLosses(newProfitLosses);
    onChange(newProfitLosses);
  };

  const handleDeleteYear = (index: number) => {
    if (profitLosses.length > 1) {
      const newProfitLosses = profitLosses.filter((_, i) => i !== index);
      setProfitLosses(newProfitLosses);
      onChange(newProfitLosses);
    }
  };

  const handleEditIndicator = (periodIndex: number, key: keyof IProfitLosses, value: string) => {
    const newProfitLosses = [...profitLosses];
    newProfitLosses[periodIndex] = {
      ...newProfitLosses[periodIndex],
      [key]: value
    };
    setProfitLosses(newProfitLosses);
    onChange(newProfitLosses);
  };

  const handleEditPeriod = (index: number, newPeriod: string) => {
    const newProfitLosses = [...profitLosses];
    newProfitLosses[index] = {
      ...newProfitLosses[index],
      period: newPeriod
    };
    setProfitLosses(newProfitLosses);
    onChange(newProfitLosses);

    // Toggle edit mode for this period
    setEditMode(prev => ({
      ...prev,
      [index]: false
    }));
  };

  return (
    <Box mt={3}>
      <Typography textAlign="center" textTransform="uppercase" variant="h1" fontWeight="bold">
        Profit & Loss{" "}
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
              <TableCell align="left" sx={{ fontWeight: "bold", backgroundColor: "black", color: "white" }}>
                Indicator
              </TableCell>
              {profitLosses.map((profitLoss, index) => (
                <TableCell 
                  key={index} 
                  align="center" 
                  sx={{ 
                    backgroundColor: "black", 
                    color: "white", 
                    position: "relative" 
                  }}
                >
                  {isEditable && editMode[index] ? (
                    <TextField
                      value={profitLoss.period}
                      variant="standard"
                      type="number"
                      InputProps={{ 
                        style: { 
                          color: 'white', 
                          textAlign: "center" 
                        },
                        inputProps: { min: 2000 }
                      }}
                      onChange={(e) => {
                        // Update period without losing edit mode
                        const newProfitLosses = [...profitLosses];
                        newProfitLosses[index] = {
                          ...newProfitLosses[index],
                          period: e.target.value
                        };
                        setProfitLosses(newProfitLosses);
                      }}
                      onBlur={() => handleEditPeriod(index, profitLoss.period || "")}
                      autoFocus
                    />
                  ) : (
                    <span 
                      onClick={isEditable ? () => setEditMode(prev => ({...prev, [index]: true})) : undefined}
                      style={{ cursor: isEditable ? 'pointer' : 'default' }}
                    >
                      {profitLoss.period}
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
            {Object.keys(PROFIT_LOSS_LABELS).map((key) => (
              <TableRow key={key}>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>
                  {PROFIT_LOSS_LABELS[key as keyof IProfitLosses]}
                </TableCell>
                {profitLosses.map((profitLoss, periodIndex) => (
                  <TableCell key={periodIndex} align="center">
                    {isEditable ? (
                      <TextField
                        value={profitLoss[key as keyof IProfitLosses] || "0"}
                        variant="standard"
                        type="number"
                        onChange={(e) => handleEditIndicator(
                          periodIndex, 
                          key as keyof IProfitLosses, 
                          e.target.value
                        )}
                        InputProps={{ 
                          style: { textAlign: "center" },
                          inputProps: { min: 0 }
                        }}
                        fullWidth
                      />
                    ) : (
                      profitLoss[key as keyof IProfitLosses] || "0"
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

export default EditableProfitLossSummary;