import React, { useEffect, useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, IconButton, FormHelperText } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import { IKeyIndicators } from '@/app/(DashboardLayout)/types/apps/IKeyIndicators';

interface EditableKeyIndicatorsProps {
  data: IKeyIndicators[];
  onChange: (updatedIndicators: IKeyIndicators[]) => void;
  validationErrors?: Record<string, string>;
}

const EditableKeyIndicators: React.FC<EditableKeyIndicatorsProps> = ({ data, onChange, validationErrors }) => {
  const [indicators, setIndicators] = useState<IKeyIndicators[]>(data);
  const [isEditable, setIsEditable] = useState(false);
  const [editMode, setEditMode] = useState<{ [key: number]: boolean }>({});

  const INDICATOR_LABELS: { [key in keyof IKeyIndicators]?: string } = {
    currentSharePrice: "Current Share Price",
    faceValuePerShare: "Face Value/Share",
    bookValuePerShare: "Book Value/Share",
    priceToEarning: "Price to Earning (PE)",
    priceToSales: "Price/Sales",
    priceToBook: "Price/Book",
    outstandingSharesMillion: "Outstanding Shares (Million)",
    marketCapMillionRs: "Market Cap (Rs. Million)",
    debtToEquity: "Debt/Equity",
    dividendPercentOnCMP: "Dividend % (On CMP)",
    dividendPerShare: "Dividend/Share",
    returnOnEquity: "Return on Equity",
    returnOnTotalAssets: "Return on Total Assets",
    rowc: "ROWC"
  };

  useEffect(() => {
    setIndicators(data);
  }, [data]);


  const handleAddYear = () => {
    const newIndicators = [...indicators];
    const newPeriod = (parseInt(newIndicators[newIndicators.length - 1].period) + 1).toString();
    
    const newYearIndicators: IKeyIndicators = {
      period: newPeriod,
      currentSharePrice: "0",
      faceValuePerShare: "0",
      bookValuePerShare: "0",
      priceToEarning: "0",
      priceToSales: "0",
      priceToBook: "0",
      outstandingSharesMillion: "0",
      marketCapMillionRs: "0",
      debtToEquity: "0",
      dividendPercentOnCMP: "0",
      dividendPerShare: "0",
      returnOnEquity: "0",
      returnOnTotalAssets: "0",
      rowc: "0",
    };

    newIndicators.push(newYearIndicators);
    setIndicators(newIndicators);
    onChange(newIndicators);
  };

  const handleDeleteYear = (index: number) => {
    if (indicators.length > 1) {
      const newIndicators = indicators.filter((_, i) => i !== index);
      setIndicators(newIndicators);
      onChange(newIndicators);
    }
  };

  const handleEditIndicator = (periodIndex: number, key: keyof IKeyIndicators, value: string) => {
    const newIndicators = [...indicators];
    newIndicators[periodIndex] = {
      ...newIndicators[periodIndex],
      [key]: value
    };
    setIndicators(newIndicators);
    onChange(newIndicators);
  };

  const handleEditPeriod = (index: number, newPeriod: string) => {
    const newIndicators = [...indicators];
    newIndicators[index] = {
      ...newIndicators[index],
      period: newPeriod
    };
    setIndicators(newIndicators);
    onChange(newIndicators);

    // Toggle edit mode for this period
    setEditMode(prev => ({
      ...prev,
      [index]: false
    }));
  };

  return (
    <Box mt={3}>
      <Typography textAlign="center" textTransform="uppercase" variant="h1" fontWeight="bold">
        Key{" "}
        <Typography
          component="span"
          sx={{
            color: "#2AA500",
            fontWeight: "inherit",
            fontSize: "inherit",
            lineHeight: "inherit",
          }}
        >
          Indicators
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
              {indicators.map((indicator, index) => (
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
                      value={indicator.period}
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
                        const newIndicators = [...indicators];
                        newIndicators[index] = {
                          ...newIndicators[index],
                          period: e.target.value
                        };
                        setIndicators(newIndicators);
                      }}
                      onBlur={() => handleEditPeriod(index, indicator.period)}
                      autoFocus
                      error={!!validationErrors?.[`keyIndicators[${index}].period`]} // Display error for period
                      helperText={validationErrors?.[`keyIndicators[${index}].period`]} // Error message for period
                    />
                  ) : (
                    <span 
                      onClick={isEditable ? () => setEditMode(prev => ({...prev, [index]: true})) : undefined}
                      style={{ cursor: isEditable ? 'pointer' : 'default' }}
                    >
                      {indicator.period}
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
            {Object.keys(INDICATOR_LABELS).map((key) => (
              <TableRow key={key}>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>
                  {INDICATOR_LABELS[key as keyof IKeyIndicators]}
                </TableCell>
                {indicators.map((indicator, periodIndex) => (
                  <TableCell key={periodIndex} align="center">
                    {isEditable ? (
                      <TextField
                        value={indicator[key as keyof IKeyIndicators] || "0"}
                        variant="standard"
                        type="number"
                        onChange={(e) => handleEditIndicator(
                          periodIndex, 
                          key as keyof IKeyIndicators, 
                          e.target.value
                        )}
                        InputProps={{ 
                          style: { textAlign: "center" },
                          inputProps: { min: 0 }
                        }}
                        fullWidth
                        error={!!validationErrors?.[`keyIndicators[${periodIndex}].${key}`]} // Display error for the field
                        helperText={validationErrors?.[`keyIndicators[${periodIndex}].${key}`]} // Error message for the field
                      />
                    ) : (
                      indicator[key as keyof IKeyIndicators] || "0"
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

export default EditableKeyIndicators;