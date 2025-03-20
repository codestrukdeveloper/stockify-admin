import React, { useEffect, useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, IconButton, FormHelperText, MenuItem, Select, FormControl, InputLabel, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
import ErrorMessage from '@/app/components/shared/ErrorMessage';
import { IPriceTrend } from '@/app/(DashboardLayout)/types/apps/IPricingTrend.interface';

interface PriceTrendsProps {
  data: IPriceTrend[];
  onChange: (updatedpriceTrends: IPriceTrend[]) => void;
  validationErrors?: Record<string, string>;
  id: string;
  handleFetchPriceTrends: any;
};

const convertToDate = (input: string): Date => {
  // Format: "Aug-01-2025" (Month-DD-YYYY)
  const [monthAbbr, day, year] = input.split('-');

  const months: Readonly<Record<string, number>> = {
    Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
    Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
  };

  if (!(monthAbbr in months)) {
    throw new Error("Invalid month abbreviation");
  }

  return new Date(parseInt(year), months[monthAbbr], parseInt(day));
};

const formatDateToMonthDateYear = (date: Date): string => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = months[date.getMonth()];
  const day = date.getDate().toString().padStart(2, '0'); // Pad single digit dates with a leading zero
  const year = date.getFullYear().toString(); // Use full 4-digit year
  return `${month}-${day}-${year}`;
};

const PriceTrends: React.FC<PriceTrendsProps> = ({ data, id, handleFetchPriceTrends, onChange, validationErrors }) => {

  const [loading, setLoading] = useState(false);

  const [priceTrends, setPriceTrends] = useState<IPriceTrend[]>(
    data.length > 0
      ? data.map((data)=>{
        return{
          ...data,
          price:data.price,
          period:data.period,
          label:data.label,
        }
      })
      : []
  );
  const [originalData, setOriginalData] = useState<IPriceTrend[]>([...priceTrends]);
  const [isEditable, setIsEditable] = useState(false);
  const [newEntry, setNewEntry] = useState<IPriceTrend>({
    period: formatDateToMonthDateYear(new Date()),
    price: "0",
    label: "Jan-1-2025",
    date: new Date(),
  });
  const [addDialogOpen, setAddDialogOpen] = useState(false);


  useEffect(() => {
    setPriceTrends(data);
    setOriginalData([...data]);
  }, [data]);

  // Available months for dropdown
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Years for dropdown (current year and 10 years forward/backward)
  const currentYear = new Date().getFullYear();
  const startYear = 2000;
  const years = Array.from({ length: currentYear - startYear + 1 }, (_, i) => (startYear + i).toString());
  
  // Days for dropdown (01-31) - with leading zeros
  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, '0'));
  console.log("priceTrends",priceTrends);

  const handleAddEntry = () => {
    const entryToAdd = {
      ...newEntry,
      date: newEntry.date || convertToDate(newEntry.period)
    };

    const newPriceTrends = [...priceTrends, entryToAdd];
    setPriceTrends(newPriceTrends);
    onChange(newPriceTrends);

    // Reset new entry form
    setNewEntry({
      period: formatDateToMonthDateYear(new Date()),
      price: "0",
      label: formatDateToMonthDateYear(new Date()),
      date: new Date(),
    });

    // Close the dialog
    setAddDialogOpen(false);
  };

  const handleDeleteEntry = (index: number) => {
    if (priceTrends.length > 0) {
      const newPriceTrends = priceTrends.filter((_, i) => i !== index);
      setPriceTrends(newPriceTrends);
      onChange(newPriceTrends);
    }
  };

  const handleEditField = (index: number, field: keyof IPriceTrend, value: string) => {
    const newPriceTrends = [...priceTrends];

    newPriceTrends[index] = {
      ...newPriceTrends[index],
      [field]: value
    };

    // If changing the label (month-date-year), update the date field as well
    if (field === 'label') {
      try {
        const date = convertToDate(value);
        newPriceTrends[index].date = date;
        newPriceTrends[index].period = value; // Set period to the same format as label
      } catch (error) {
        console.error("Invalid date format:", error);
      }
    }

    setPriceTrends(newPriceTrends);
    onChange(newPriceTrends);
  };

  const handleToggleEditMode = () => {
    if (isEditable) {
      // Save logic - already handled via onChange
      setOriginalData([...priceTrends]);
    } else {
      // Enter edit mode - store the original data to allow cancellation
      setOriginalData([...priceTrends]);
    }
    setIsEditable(!isEditable);
  };

  const handleCancelEdit = () => {
    // Restore the original data
    setPriceTrends([...originalData]);
    onChange([...originalData]);
    setIsEditable(false);
  };

  const handleNewEntryChange = (field: keyof IPriceTrend, value: string) => {
    setNewEntry(prev => {
      const updated = { ...prev, [field]: value };

      // If changing the label (month-date-year), update the date and period fields
      if (field === 'label') {
        try {
          const date = convertToDate(value);
          updated.date = date;
          updated.period = value; // Set period to the same format as label
        } catch (error) {
          console.error("Invalid date format:", error);
        }
      }

      return updated;
    });
  };

  const openAddDialog = () => {
    const today = new Date();
    const formattedDate = formatDateToMonthDateYear(today);
    
    setNewEntry({
      period: formattedDate,
      price: "0",
      label: formattedDate,
      date: today,
    });
    setAddDialogOpen(true);
  };

  // Parse label parts for editing (month, date, year)
  const getLabelParts = (label: string) => {
    const parts = label.split('-');
    return {
      month: parts[0] || 'Jan',
      day: parts[1] || '01', // Default to "01" with leading zero
      year: parts[2] || new Date().getFullYear().toString()
    };
  };

  const handleFetch = async () => {
    setLoading(true);
    try {
      await handleFetchPriceTrends();
    } catch (error) {
      // Error handling
    } finally {
      setLoading(false);
    }
  }

  return (
    <div id={id}>
      <Box mt={3}>
        <Typography textAlign="center" textTransform="uppercase" variant="h1" fontWeight="bold">
          Price{" "}
          <Typography
            component="span"
            sx={{
              color: "#2AA500",
              fontWeight: "inherit",
              fontSize: "inherit",
              lineHeight: "inherit",
            }}
          >
            Trends
          </Typography>
        </Typography>

        <Box display="flex" justifyContent="flex-end" mt={2} mb={2}>
          {isEditable ? (
            <>
              <Button
                variant="contained"
                color="success"
                startIcon={<SaveIcon />}
                onClick={handleToggleEditMode}
                sx={{ mr: 2 }}
              >
                Save
              </Button>
              <Button
                variant="outlined"
                color="error"
                startIcon={<CancelIcon />}
                onClick={handleCancelEdit}
              >
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="contained"
                color="primary"
                startIcon={<EditIcon />}
                onClick={handleToggleEditMode}
                sx={{ mr: 2 }}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="success"
                startIcon={<AddCircleIcon />}
                onClick={openAddDialog}
                sx={{ mr: 2 }}
              >
                Add Price Trend
              </Button>

              <Button
                variant="contained"
                color="primary"
                onClick={handleFetch}
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Get Price Trend'}
              </Button>
            </>
          )}
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className='bg-black text-white font-bold'>Month-Date-Year</TableCell>
                <TableCell>Price</TableCell>
                {isEditable && <TableCell>Actions</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {priceTrends.map((trend, index) => {
                const { month, day, year } = getLabelParts(trend.period);
                return (
                  <TableRow key={index}>
                    <TableCell>
                      {isEditable ? (
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <FormControl size="small" sx={{ minWidth: 80 }}>
                            <Select
                              value={month}
                              onChange={(e) => handleEditField(index, 'label', `${e.target.value}-${day}-${year}`)}
                            >
                              {months.map((m) => (
                                <MenuItem key={m} value={m}>
                                  {m}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                          <FormControl size="small" sx={{ minWidth: 70 }}>
                            <Select
                              value={day}
                              onChange={(e) => handleEditField(index, 'label', `${month}-${e.target.value}-${year}`)}
                            >
                              {days.map((d) => (
                                <MenuItem key={d} value={d}>
                                  {d}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                          <FormControl size="small" sx={{ minWidth: 90 }}>
                            <Select
                              value={year}
                              onChange={(e) => handleEditField(index, 'label', `${month}-${day}-${e.target.value}`)}
                            >
                              {years.map((y) => (
                                <MenuItem key={y} value={y}>
                                  {y}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Box>
                      ) : (
                        trend.period
                      )}
                    </TableCell>
                    <TableCell>
                      {isEditable ? (
                        <TextField
                          type="number"
                          size="small"
                          value={trend.price}
                          onChange={(e) => handleEditField(index, 'price', e.target.value)}
                        />
                      ) : (
                        trend.price
                      )}
                    </TableCell>
                    {isEditable && (
                      <TableCell>
                        <IconButton
                          color="error"
                          onClick={() => handleDeleteEntry(index)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        {validationErrors?.["priceTrend"] && (
          <Box
            sx={{
              color: "error.main",
              fontSize: "0.875rem",
              marginTop: 0.5,
            }}
          >
            <ErrorMessage error={{ message: validationErrors["priceTrend"] }} />
          </Box>
        )}
      </Box>

      {/* Add Entry Dialog */}
      <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)}>
        <DialogTitle>Add New Price Trend</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <Typography minWidth="120px">Month-Date-Year:</Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <FormControl size="small" sx={{ minWidth: 80 }}>
                  <Select
                    value={getLabelParts(newEntry.period).month}
                    onChange={(e) => handleNewEntryChange('label', `${e.target.value}-${getLabelParts(newEntry.period).day}-${getLabelParts(newEntry.period).year}`)}
                  >
                    {months.map((month) => (
                      <MenuItem key={month} value={month}>
                        {month}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl size="small" sx={{ minWidth: 70 }}>
                  <Select
                    value={getLabelParts(newEntry.period).day}
                    onChange={(e) => handleNewEntryChange('label', `${getLabelParts(newEntry.period).month}-${e.target.value}-${getLabelParts(newEntry.period).year}`)}
                  >
                    {days.map((day) => (
                      <MenuItem key={day} value={day}>
                        {day}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl size="small" sx={{ minWidth: 90 }}>
                  <Select
                    value={getLabelParts(newEntry.period).year}
                    onChange={(e) => handleNewEntryChange('label', `${getLabelParts(newEntry.period).month}-${getLabelParts(newEntry.period).day}-${e.target.value}`)}
                  >
                    {years.map((year) => (
                      <MenuItem key={year} value={year}>
                        {year}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <Typography minWidth="120px">Price:</Typography>
              <TextField
                type="number"
                size="small"
                fullWidth
                value={newEntry.price}
                onChange={(e) => handleNewEntryChange('price', e.target.value)}
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddDialogOpen(false)} color="error">
            Cancel
          </Button>
          <Button onClick={handleAddEntry} color="success" variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PriceTrends;