'use client';
import React, { useRef, useState } from 'react';
import {
    Container,
    Typography,
    TextField,
    Button,
    Grid,
    Box,
    FormControl,
    Snackbar,
    Alert
} from '@mui/material';
import {
    CloudUpload as CloudUploadIcon
} from '@mui/icons-material';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { CustomSelect } from './CustomSelect';
import { VideoSchema } from '@/utils/schema/videoSchema';
import { createVideoAction } from '@/app/(DashboardLayout)/apps/video/action';
import { isServerError } from '@/app/(DashboardLayout)/action';
import { IVideo } from '@/app/(DashboardLayout)/types/apps/IVideo';

const CreateVideoClient: React.FC = () => {
    const [title, setTitle] = useState<string>('');
    const [link, setLink] = useState<string>('');
    const [relatedStocks, setRelatedStocks] = useState<string[]>([]);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
 
    const handleRelatedStocksChange = (value: string) => {
        setRelatedStocks([value]);
    };

    const handleSubmit = async () => {
        const videoData = {
            title,
            link,
            companyId: relatedStocks[0],
        };
        console.log("videoData", videoData)
        const result = VideoSchema.safeParse(videoData);
        if (!result.success) {
            const fieldErrors: Record<string, string> = {};
            Object.entries(result.error.flatten().fieldErrors).forEach(([key, value]) => {
                fieldErrors[key] = Array.isArray(value) ? value[0] : value;
            });
            setErrors(fieldErrors);
            setSnackbarMessage('Please fix the validation errors');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
            return;
        }

        try {
           
            const response = await createVideoAction(videoData as unknown as IVideo);

            if (isServerError(response)) {
                setSnackbarMessage(response.error.message || 'An error occurred');
                setSnackbarSeverity('error');
            } else {
                setErrors({});
                resetForm();
                setSnackbarMessage('Video created successfully!');
                setSnackbarSeverity('success');
            }
            setOpenSnackbar(true);
        } catch (error) {
            setSnackbarMessage('An unexpected error occurred');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        }
    };

    const resetForm = () => {
        setTitle('');
        setLink('');
        setRelatedStocks([]);
    };

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" gutterBottom>Create Video</Typography>

            <Grid container spacing={3}>
              
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        margin="normal"
                        error={!!errors.title}
                        helperText={errors.title}
                        required
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="Video Link"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        margin="normal"
                        error={!!errors.link}
                        helperText={errors.link}
                        required
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                    <CustomSelect id="company.id" name="Company" value={relatedStocks?.[0]} onChange={handleRelatedStocksChange} />
                    </FormControl>
                </Grid>
              
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
                </Grid>
            </Grid>

            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
                <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity}>{snackbarMessage}</Alert>
            </Snackbar>
        </Container>
    );
};
export default CreateVideoClient;