"use client"
import React, { useState, ChangeEvent } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material'
import * as XLSX from 'xlsx'

interface FileUploadProps {
    onFileUpload: (data: any[]) => void
    interfaceMap?: { [key: string]: (row: any[], headers: string[]) => any }
    expectedColumns?: string[]
    title?: string
}

const MainFileUpload: React.FC<FileUploadProps> = ({ 
    onFileUpload, 
    interfaceMap = {},
    expectedColumns = [], 
    title = 'Upload Excel File' 
}) => {
    const [fileName, setFileName] = useState<string | null>(null)

    const mapDataToInterface = (jsonData: any[][], interfaceMap: { [key: string]: (row: any[], headers: string[]) => any }) => {
        const headers = jsonData[0] as string[];
        const dataRows = jsonData.slice(1);

        // If no interface map provided, return raw data
        if (Object.keys(interfaceMap).length === 0) {
            return dataRows;
        }

        // Try to map data to each defined interface
        return dataRows.map(row => {
            const mappedRow: { [key: string]: any } = {};

            Object.entries(interfaceMap).forEach(([key, mapFunction]) => {
                try {
                    mappedRow[key] = mapFunction(row, headers);
                } catch (error) {
                    console.warn(`Could not map data for interface: ${key}`, error);
                }
            });

            return mappedRow;
        });
    };

    const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setFileName(file.name);

        const reader = new FileReader();
        reader.onload = (e) => {
            const workbook = XLSX.read(e.target?.result, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) ;

            // Optional column validation
            if (expectedColumns.length > 0) {
                const headers = jsonData[0] as string[];
                const missingColumns = expectedColumns.filter(
                    col => !headers.includes(col)
                );

                if (missingColumns.length > 0) {
                    alert(`Missing columns: ${missingColumns.join(', ')}`);
                    return;
                }
            }

            const mappedData = mapDataToInterface(jsonData, interfaceMap);
            onFileUpload(mappedData);
        };
        reader.readAsBinaryString(file);
    };

    return (
        <Box 
            display="flex" 
            flexDirection="column" 
            alignItems="center" 
            justifyContent="center" 
            p={2} 
            border={1} 
            borderColor="grey.300" 
            borderRadius={2}
        >
            <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
                sx={{ mb: 2 }}
            >
                {title}
                <input
                    type="file"
                    accept=".xlsx, .xls"
                    hidden
                    onChange={handleFileUpload}
                />
            </Button>
            
            {fileName && (
                <Typography variant="body2" color="textSecondary">
                    Uploaded: {fileName}
                </Typography>
            )}
        </Box>
    )
}

export default MainFileUpload