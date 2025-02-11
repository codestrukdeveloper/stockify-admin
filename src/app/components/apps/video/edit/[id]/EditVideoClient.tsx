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
    Alert,
    Paper
} from '@mui/material';
import {
    CloudUpload as CloudUploadIcon
} from '@mui/icons-material';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { CustomSelect } from './CustomSelect';
import { updateVideoSchema } from '@/utils/schema/videoSchema';
import { updateVideo } from '@/app/(DashboardLayout)/apps/video/action';
import { isServerError } from '@/app/(DashboardLayout)/action';
import { IVideo } from '@/app/(DashboardLayout)/types/apps/IVideo';

interface EditProps {
    data: IVideo;
}

const EditVideoClient: React.FC<EditProps> = ({ data }) => {
    console.log('entered', data);
    // State Management
    const [title, setTitle] = useState(data.title || '');
    const [link, setLink] = useState(data.link || '');
    const [relatedStocks, setRelatedStocks] = useState<string[]>(data?.companyId ? [data.companyId] : []);

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

   
    const handleRelatedStocksChange = (value: string) => {
        setRelatedStocks([value]);
    };

    const handleSubmit = async () => {
        const videoData = {
            _id: data._id,
            title,
            link,
            companyId: relatedStocks[0],
        };

        const result = updateVideoSchema.safeParse(videoData);
        if (!result.success) {
            const newErrors: Record<string, string> = {};
            result.error.errors.forEach((error) => {
                newErrors[error.path[0]] = error.message;
            });

            setErrors(newErrors);
            toast.error('Please fix the validation errors');
            return;
        }

        try {
            
            const response = await updateVideo(data._id!, videoData as unknown as IVideo);

            if (isServerError(response)) {
                toast.error(response.error.message || 'An error occurred');
            } else {
                setErrors({});
                toast.success('Video updated successfully!');
            }
        } catch (error) {
            toast.error('An unexpected error occurred');
        }
    };

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" gutterBottom>Edit Video</Typography>

            <Grid container spacing={3}>
               
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="Video Title"
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
                    <Button variant="contained" color="primary" onClick={handleSubmit}>Update Video</Button>
                </Grid>
            </Grid>

            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
                <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity}>{snackbarMessage}</Alert>
            </Snackbar>
        </Container>
    );
};

export default EditVideoClient;