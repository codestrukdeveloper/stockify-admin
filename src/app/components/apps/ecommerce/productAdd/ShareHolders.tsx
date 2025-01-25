"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Paper,
  Stack,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { IShareholder } from "@/app/(DashboardLayout)/types/apps/IShareholder";

interface ShareHolderProps {
  shareholders: IShareholder[] | [];
  onAdd: (shareholder: IShareholder) => void;
  onRemove: (index: number) => void;
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF", "#AAAAAA"];

const CustomGraph: React.FC<{ data: { name: string; value: number }[] }> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          label={({ name, value }) => `${name} (${value.toFixed(1)}%)`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

const ShareHolder: React.FC<ShareHolderProps> = ({ shareholders, onAdd, onRemove }) => {
  const [name, setName] = useState<string>("");
  const [asOf, setAsOfYear] = useState<string>("");
  const [percent, setPercent] = useState<number>(0);

  const handleAddShareholder = () => {
    if (name && asOf && percent > 0 && percent <= 100) {
      onAdd({ name, asOf: new Date(asOf).getFullYear().toString(), percent: percent.toString() });
      setName("");
      setAsOfYear("");
      setPercent(0);
    } else {
      alert("Please fill in all fields correctly. Percentage must be between 1 and 100.");
    }
  };

  // Calculate total percentage of known shareholders
  const totalKnownPercentage = shareholders.reduce(
    (sum, shareholder) => sum + parseFloat(shareholder.percent),
    0
  );

  // Prepare data for the pie chart
  const normalizedData = [
    ...shareholders.map((shareholder) => ({
      name: shareholder.name,
      value: (parseFloat(shareholder.percent) / 100) * 100,
    })),
  ];

  // Add "Unknown" if total percentage < 100
  if (totalKnownPercentage < 100) {
    normalizedData.push({
      name: "Other",
      value: 100 - totalKnownPercentage,
    });
  }

  return (
    <Box marginTop={3} gap={5}>
      <Typography variant="h4" gutterBottom>
        Shareholders
      </Typography>
      <Typography variant="h6" gutterBottom>
        Add Shareholder
      </Typography>
      <Grid container marginTop={3} spacing={2}>
        <Grid item xs={12} md={3}>
          <TextField
            fullWidth
            label="Shareholder Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            fullWidth
            label="As Of Year"
            type="date"
            value={asOf}
            onChange={(e) => setAsOfYear(e.target.value)}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            fullWidth
            label="Percentage"
            type="number"
            value={percent}
            onChange={(e) => setPercent(parseFloat(e.target.value))}
            variant="outlined"
            inputProps={{ min: 1, max: 100 }}
          />
        </Grid>
        <Grid
          item
          xs={3}
          md={3}
          container
          justifyContent="flex-end"
          alignItems="center"
        >
          <Button variant="contained" color="primary" onClick={handleAddShareholder}>
            Add Shareholder
          </Button>
        </Grid>
      </Grid>

      <Grid container marginTop={3} spacing={3}>
        <Grid item xs={12} md={6}>
          <Box mt={4}>
            <Typography variant="h6">Current Shareholders</Typography>
            {shareholders.length === 0 ? (
              <Typography>No shareholders added yet.</Typography>
            ) : (
              <Stack spacing={1}>
                {shareholders.map((shareholder, index) => (
                  <Paper
                    key={index}
                    sx={{
                      p: 2,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderRadius: 2,
                      boxShadow: 1,
                    }}
                  >
                    <Typography>
                      {shareholder.name} ({shareholder.percent}%) - As of {shareholder.asOf}
                    </Typography>
                    <IconButton color="error" onClick={() => onRemove(index)}>
                      <CloseIcon />
                    </IconButton>
                  </Paper>
                ))}
              </Stack>
            )}
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Shareholder Percentage Distribution
            </Typography>
            <CustomGraph data={normalizedData} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ShareHolder;
