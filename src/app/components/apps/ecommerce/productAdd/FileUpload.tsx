"use client"
import React, { useState, ChangeEvent } from 'react'
import { Box, Button, Typography } from '@mui/material'
import * as XLSX from 'xlsx'
import UploadFileIcon from "@mui/icons-material/UploadFile";

interface FileUploadProps {
    onFileUpload: (data: any[]) => void
    expectedColumns?: string[]
    title?: string
}

const FileUpload: React.FC<FileUploadProps> = ({
    onFileUpload,
    expectedColumns = [],
    title = 'Upload Excel File'
}) => {
    const [fileName, setFileName] = useState<string | null>(null)

    const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setFileName(file.name);

        const reader = new FileReader();
        reader.onload = (e) => {
            const workbook = XLSX.read(e.target?.result, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];

            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

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

            onFileUpload(jsonData);
        };
        reader.readAsBinaryString(file);
    };

    return (
        <Box
        >
            <Button variant="outlined" startIcon={<UploadFileIcon />} component="label" sx={{ marginRight: 2 }}>
                Upload File
                <input type="file" hidden accept=".xlsx, .xls" onChange={handleFileUpload} />
            </Button>
        </Box>
    )
}

export default FileUpload