"use client";

import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Grid,
    TextField,
    Typography,
    IconButton,
    Paper,
    Stack,
    FormHelperText,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { IFinancialResults } from "@/app/(DashboardLayout)/types/apps/ICompany";


interface IFinancialResultsWithFile {
    title: string;
    period: string;
    document: File;
}

interface FinancialResultUploaderProps {
    onUpload: (data: IFinancialResultsWithFile) => void;
    onRemove: (index: number) => void;
    handleRemoveFinancialResults:(index:number)=>void,
    financialResults: IFinancialResultsWithFile[];
    uploaded?: IFinancialResults[];
    id: string;
    validationErrors?: Record<string, string>; // Add validationErrors prop

}

const FinancialResultUploader: React.FC<FinancialResultUploaderProps> = ({
    onUpload,
    onRemove,
    financialResults,
    handleRemoveFinancialResults,
    uploaded,
    validationErrors,
    id
}) => {
    const [financialResultsLocal, setFinancialResultsLocal] = useState<IFinancialResultsWithFile[]>([]);
    const [title, setTitle] = useState<string>("");
    const [period, setPeriod] = useState<string>(new Date().getFullYear().toString());
    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        if (Array.isArray(financialResults)) {
            setFinancialResultsLocal(financialResults);
        }
    }, [financialResults]);

    console.log("uploadedfinancialResults", uploaded);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setFile(event.target.files[0]);
        }
    };

    const handleSubmit = () => {
        if (title && period && file) {
            const newEntry: IFinancialResultsWithFile = {
                title,
                period,
                document: file,
            };

            // Update local state
            setFinancialResultsLocal((prev) => {
                if (!Array.isArray(prev)) {
                    return [newEntry];
                }
                return [...prev, newEntry];
            });

            // Pass the new entry to the parent component
            onUpload(newEntry);

            // Reset input fields
            setTitle("");
            setPeriod(new Date().getFullYear().toString());
            setFile(null);
        } else {
            alert("Please fill in all fields and select a file.");
        }
    };

    return (
        <div id={id}>
            <Box sx={{ padding: 2, border: "1px solid #ccc", borderRadius: "8px" }}>
                <Typography variant="h6" gutterBottom>
                    Upload Financial Results
                </Typography>

                <Grid container justifyContent={"space-between"} pt={2} spacing={3}>
                    <Grid item sm={4} xs={12} md={4}>
                        <TextField
                            fullWidth
                            label="Year"
                            type="number"
                            value={period}
                            onChange={(e) => setPeriod(e.target.value)}
                            variant="outlined"
                            inputProps={{ min: 2000, max: new Date().getFullYear() }}
                        />
                    </Grid>

                    <Grid item sm={5} xs={12} md={4}>
                        <TextField
                            fullWidth
                            label="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            variant="outlined"
                        />
                    </Grid>

                    <Grid item xs={12} justifyContent={"center"} alignItems={"center"} sm={3} md={3}>
                        <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileChange}
                            style={{ display: "none" }}
                            id="file-upload"
                        />
                        <label htmlFor="file-upload">
                            <Button variant="contained" sx={{ width: "100%" }} component="span">
                                Choose Document
                            </Button>
                        </label>
                    </Grid>

                    <Grid item xs={12}>
                        {file && <Typography sx={{ mt: 1 }}>Selected file: {file.name}</Typography>}
                        <Button variant="contained" sx={{ width: "100%" }} color="primary" onClick={handleSubmit}>
                            Add
                        </Button>
                    </Grid>
                </Grid>

                {financialResultsLocal.length > 0 && (
                    <Box sx={{ mt: 4 }}>
                        <Typography variant="h6" gutterBottom>
                            Added Financial Results
                        </Typography>
                        <Stack spacing={2}>
                            {financialResultsLocal.map((result, index) => (
                                <Paper
                                    key={index}
                                    sx={{
                                        p: 2,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        backgroundColor: "#fff",
                                        borderRadius: "8px",
                                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                                    }}
                                >
                                    <Box>
                                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                                            {result.title}
                                        </Typography>
                                        <Typography variant="body2">
                                            Year: {result.period} | File: {result.document.name}
                                        </Typography>
                                    </Box>
                                    <IconButton
                                        color="error"
                                        onClick={() => onRemove(index)}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                </Paper>
                            ))}
                        </Stack>
                    </Box>
                )}


                {uploaded&& uploaded?.length > 0 && (
                    <Box sx={{ mt: 4 }}>
                        <Typography variant="h6" gutterBottom>
                            Added Financial Results
                        </Typography>
                        <Stack spacing={2}>
                            {uploaded.map((result, index) => (
                                <Paper
                                    key={index}
                                    sx={{
                                        p: 2,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        backgroundColor: "#fff",
                                        borderRadius: "8px",
                                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                                    }}
                                >
                                    <Box>
                                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                                            {result.title}
                                        </Typography>
                                        <Typography variant="body2">
                                            Year: {result.period} | File: {result.title}
                                        </Typography>
                                    </Box>
                                    <IconButton
                                        color="error"
                                        onClick={() => handleRemoveFinancialResults(index)}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                </Paper>
                            ))}
                        </Stack>
                    </Box>
                )}

                {validationErrors?.["company.financialResults"] && (
                    <FormHelperText error sx={{ mt: 2 }}>
                        {validationErrors["company.financialResults"]}
                    </FormHelperText>
                )}
            </Box>
        </div>

    );
};

export default FinancialResultUploader;
