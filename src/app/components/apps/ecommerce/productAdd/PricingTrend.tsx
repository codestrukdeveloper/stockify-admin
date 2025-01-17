"use client";

import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
    Box,
    Typography,
    ToggleButton,
    ToggleButtonGroup,
    Button,
} from "@mui/material";
import * as XLSX from "xlsx";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from "chart.js";
import ResponsiveTable, { DataTableProps } from "./ResponsiveTable";

// Register chart.js modules
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

// Default props for chart
const defaultChartData = {
    labels: ["Nov 23", "Dec 23", "Jan 24", "Feb 24", "Mar 24"],
    datasets: [
        {
            label: "Price",
            data: [9000, 9500, 8000, 6000, 2000],
            borderColor: "#4caf50",
            backgroundColor: "#4caf50",
            pointRadius: 5,
            pointBackgroundColor: "#4caf50",
            fill: false,
            tension: 0.4,
        },
    ],
};

const defaultTableData: DataTableProps = {
    name: "Key Indicators",
    year: ["2024"],
    data: {
        "1d": ["9000"],
        "1W": ["9500"],
        "1M": ["8000"],
        "3M": ["6000"],
        "6M": ["2000"],
        "1Y": ["0"],
        "3Y": ["0"],
        "5Y": ["0"],
        "MAX": ["0"],
    },
};

const chartOptions = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        tooltip: {
            callbacks: {
                label: (context: any) => `₹${context.raw}`,
            },
        },
    },
    scales: {
        y: {
            beginAtZero: true,
        },
    },
};

interface PricingTrendProps {
    data?: { labels: string[]; datasets: any[] };
}

const PricingTrend: React.FC<PricingTrendProps> = ({ data }) => {
    const [isEditing, setIsEditing] = useState(false); // Toggle between chart and table
    const [view, setView] = useState<string>("1D");
    const [chartData, setChartData] = useState(data || defaultChartData);
    const [tableData, setTableData] = useState(defaultTableData);

    // Toggle between chart view and edit view
    const toggleEditMode = () => setIsEditing(!isEditing);

    // Handle time range selection
    const handleViewChange = (_event: React.MouseEvent<HTMLElement>, newView: string) => {
        if (newView) setView(newView);
    };

    // Handle file upload and parse data
    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                const data = e.target?.result;
                if (!data) return;

                const workbook = XLSX.read(data, { type: "binary" });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];

                // Convert sheet to JSON
                const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as any[][];

                // Parse JSON to extract labels and data
                const labels = jsonData[0] as string[]; // First row as labels
                const values = jsonData[1] as number[]; // Second row as data

                // Update chart and table data
                setChartData({
                    labels,
                    datasets: [
                        {
                            label: "Price",
                            data: values,
                            borderColor: "#4caf50",
                            backgroundColor: "#4caf50",
                            pointRadius: 5,
                            pointBackgroundColor: "#4caf50",
                            fill: false,
                            tension: 0.4,
                        },
                    ],
                });

                const updatedTableData: DataTableProps = {
                    name: "Key Indicators",
                    year: ["2024"],
                    data: {
                        "1d": [values[0]?.toString() || "0"],
                        "1W": [values[1]?.toString() || "0"],
                        "1M": [values[2]?.toString() || "0"],
                        "3M": [values[3]?.toString() || "0"],
                        "6M": [values[4]?.toString() || "0"],
                        "1Y": ["0"],
                        "3Y": ["0"],
                        "5Y": ["0"],
                        "MAX": ["0"],
                    },
                };

                setTableData(updatedTableData);
            };

            reader.readAsBinaryString(file);
        }
    };

    return (
        <Box mt={3}>
            <Typography
                textAlign={"center"}
                textTransform={"uppercase"}
                variant="h1"
                fontWeight={"bold"}
            >
                PRICING{" "}
                <Typography
                    component="span"
                    sx={{
                        color: "#2AA500",
                        fontWeight: "inherit",
                        fontSize: "inherit",
                        lineHeight: "inherit",
                    }}
                >
                    TREND
                </Typography>
            </Typography>

            {isEditing ? (
                // Editable table view
                <Box mt={3}>


                    <ResponsiveTable initialData={tableData} />
                    <Button
                        variant="contained"
                        sx={{ mt: 2 }}
                        onClick={toggleEditMode}
                    >
                        Save and View Chart
                    </Button>
                </Box>
            ) : (
                // Chart view
                <Box sx={{ p: 4, borderRadius: "8px" }}>
                    <Box
                        sx={{ mt: 3 }}
                        display={"flex"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                    >
                        <Typography
                            textAlign={"center"}
                            textTransform={"uppercase"}
                            variant="h1"
                            fontWeight={"bold"}
                        >
                            PRICING{" "}
                            <Typography
                                component="span"
                                sx={{
                                    color: "#2AA500",
                                    fontWeight: "inherit",
                                    fontSize: "inherit",
                                    lineHeight: "inherit",
                                }}
                            >
                                TREND
                            </Typography>
                        </Typography>

                        <Box
                            display={"flex"}
                            alignItems={"center"}
                            gap={2}
                        >

                            <Button
                                variant="contained"
                                onClick={toggleEditMode}
                            >
                                Edit Data
                            </Button>
                            <Button variant="contained" component="label">
                                Upload .xlsx File
                                <input type="file" hidden accept=".xlsx" onChange={handleFileUpload} />
                            </Button>
                        </Box>

                    </Box>
                    <ToggleButtonGroup
                        value={view}
                        exclusive
                        onChange={handleViewChange}
                        sx={{ mb: 2 }}
                    >
                        <ToggleButton value="1D">1D</ToggleButton>
                        <ToggleButton value="1W">1W</ToggleButton>
                        <ToggleButton value="1M">1M</ToggleButton>
                        <ToggleButton value="3M">3M</ToggleButton>
                        <ToggleButton value="6M">6M</ToggleButton>
                        <ToggleButton value="1Y">1Y</ToggleButton>
                        <ToggleButton value="3Y">3Y</ToggleButton>
                        <ToggleButton value="5Y">5Y</ToggleButton>
                        <ToggleButton value="MAX">MAX</ToggleButton>
                    </ToggleButtonGroup>

                    <Line data={chartData} options={chartOptions} />

                    <Box
                        sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
                    >
                        <Typography variant="body1">₹1464.36</Typography>
                        <Typography variant="body1">401</Typography>
                        <Typography variant="body1">38%</Typography>
                    </Box>

                </Box>
            )}
        </Box>
    );
};

export default PricingTrend;
