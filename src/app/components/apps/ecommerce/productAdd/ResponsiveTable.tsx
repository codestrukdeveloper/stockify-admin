"use client";

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
  Button,
  TextField,
  IconButton,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import { Cancel } from "@mui/icons-material";
import FileUpload from "./FileUpload";
import { FILE_FOR } from "@/app/(DashboardLayout)/types/apps/company";

export interface DataTableProps {
  year: string[];
  data: { [key: string]: string[] };
  name: string
}

interface ResponsiveTableProps {
  initialData: DataTableProps;
  handleFileUpload: (data: any) => void;
  fileFor:FILE_FOR
}

const ResponsiveTable: React.FC<ResponsiveTableProps> = ({ initialData,fileFor,handleFileUpload }) => {
  const [tableData, setTableData] = useState<DataTableProps>(initialData);
  const [isEditable, setIsEditable] = useState(false);

  const handleAddYear = () => {
    const nextYear = (parseInt(tableData.year[tableData.year.length - 1]) + 1).toString();
    const updatedYears = [...tableData.year, nextYear];
    const updatedData = { ...tableData.data };
    Object.keys(updatedData).forEach((key) => {
      updatedData[key] = [...updatedData[key], "0"];
    });
    setTableData({ year: updatedYears, data: updatedData });
  };

  const handleDeleteYear = (index: number) => {
    const updatedYears = tableData.year.filter((_, i) => i !== index);
    const updatedData = { ...tableData.data };
    Object.keys(updatedData).forEach((key) => {
      updatedData[key] = updatedData[key].filter((_, i) => i !== index);
    });
    setTableData({ year: updatedYears, data: updatedData });
  };

  const handleEditCell = (rowKey: string, colIndex: number, newValue: string) => {
    const updatedData = { ...tableData.data };
    updatedData[rowKey][colIndex] = newValue || "0";
    setTableData({ ...tableData, data: updatedData });
  };


  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>

        <FileUpload
          onFileUpload={handleFileUpload}
          title="Upload Key Indicators Excel"
        />

        <Box display="flex" gap={5} justifyContent="space-between" alignItems="center" mb={3}>
          <Button variant="contained" color={isEditable ? "success" : "primary"} startIcon={isEditable ? <SaveIcon /> : <EditIcon />} onClick={() => setIsEditable(!isEditable)}>
            {isEditable ? "Save" : "Edit"}
          </Button>
          {
            isEditable &&
            <Button variant="contained" color={"error"} startIcon={<Cancel />} onClick={() => setIsEditable(!isEditable)}>
              Cancel
            </Button>
          }
          <Button variant="contained" color="primary" startIcon={<AddCircleIcon />} onClick={handleAddYear}>
            Add Year
          </Button>
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ position: "relative" }}>
              <TableCell align="left" sx={{ textTransform: "uppercase", backgroundColor: "black", color: "white", fontWeight: "bold" }}>
                {initialData.name}
              </TableCell>
              {tableData.year.map((year, idx) => (
                <TableCell key={idx} align="center" sx={{ backgroundColor: "black", color: "white", fontWeight: "bold", position: "relative" }}>
                  {year}
                  <IconButton size="small" color="error" onClick={() => handleDeleteYear(idx)} style={{ position: "absolute", top: 12, right: 5 }}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(tableData.data).map((key, rowIndex) => (
              <TableRow key={rowIndex}>
                <TableCell align="left" sx={{ fontWeight: "bold", textTransform: "uppercase" }}>{key}</TableCell>
                {tableData.data[key].map((value, colIndex) => (
                  <TableCell key={colIndex} align="center">
                    {isEditable ? (
                      <TextField
                        value={value}
                        variant="standard"
                        onChange={(e) => handleEditCell(key, colIndex, e.target.value)}
                        InputProps={{ style: { textAlign: "center" } }}
                      />
                    ) : (
                      value
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

export default ResponsiveTable;
