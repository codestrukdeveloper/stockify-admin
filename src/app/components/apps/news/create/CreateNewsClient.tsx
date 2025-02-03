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
import { CustomSelectType } from './CustomSelectType';
import { NewsSchema } from '@/utils/schema/newsSchema';
import { createNewsAction } from '@/app/(DashboardLayout)/apps/news/action';
import { isServerError } from '@/app/(DashboardLayout)/action';
import { INews } from '@/app/(DashboardLayout)/types/apps/INews';
import { uploadFile } from '@/utils/api/uploadAction';

const CreateNewsClient: React.FC = () => {
    const [title, setTitle] = useState<string>('');
    const [link, setLink] = useState<string>('');
    const [type, setType] = useState<'NEWS' | 'VIDEO'>('NEWS');
    const [relatedStocks, setRelatedStocks] = useState<string[]>([]);
    const [featuredImage, setFeaturedImage] = useState<File | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
 
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files?.[0]) {
            setFeaturedImage(event.target.files[0]);
        }
    };

    const handleAddType = (value: string) => {
        if (value === 'NEWS' || value === 'VIDEO') {
            setType(value);
            if (value === 'VIDEO') {
                setFeaturedImage(null);
            }
        }
    };
    
    const handleRelatedStocksChange = (value: string) => {
        setRelatedStocks([value]);
    };

    const handleSubmit = async () => {
        const newsData = {
            title,
            type,
            link,
            companyId: relatedStocks[0],
            image: type === 'NEWS' ? featuredImage?.name || '' : ''
        };
        console.log("newsData", newsData)
        const result = NewsSchema.safeParse(newsData);
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
            let uploadedImageUrl = '';
            if (type === 'NEWS' && featuredImage) {
                const uploadResponse = await uploadFile([featuredImage], 'stocks');
                if (isServerError(uploadResponse)) {
                    toast.error(uploadResponse.error.message || 'Image upload failed');
                    return;
                }
                uploadedImageUrl = uploadResponse[0];
            }

            newsData.image = uploadedImageUrl;
            const response = await createNewsAction(newsData as unknown as INews);

            if (isServerError(response)) {
                setSnackbarMessage(response.error.message || 'An error occurred');
                setSnackbarSeverity('error');
            } else {
                setErrors({});
                resetForm();
                setSnackbarMessage('News created successfully!');
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
        setType('NEWS');
        setRelatedStocks([]);
        setFeaturedImage(null);
    };

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" gutterBottom>Create News</Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                     <CustomSelectType id="type.id" name="Type" value={type} onChange={handleAddType} />
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="News Title"
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
                        label="News Link"
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
                {type === 'NEWS' && (
                    <Grid item xs={12} md={6}>
                        {featuredImage && (
                            <Box position="relative" width="100%" height={150}>
                                <Image src={URL.createObjectURL(featuredImage)} alt="Featured Image" fill style={{ objectFit: 'cover' }} />
                            </Box>
                        )}
                        <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} fullWidth>
                            Upload Featured Image
                            <input type="file" hidden accept="image/*" onChange={handleImageUpload} required={type === 'NEWS'} />
                        </Button>
                    </Grid>
                )}
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
export default CreateNewsClient;