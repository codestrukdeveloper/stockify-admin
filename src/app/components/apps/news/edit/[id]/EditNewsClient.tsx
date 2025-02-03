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
import { CustomSelectType } from './CustomSelectType';
import { updateNewsSchema } from '@/utils/schema/newsSchema';
import { updateNews } from '@/app/(DashboardLayout)/apps/news/action';
import { isServerError } from '@/app/(DashboardLayout)/action';
import { INews } from '@/app/(DashboardLayout)/types/apps/INews';
import { uploadFile } from '@/utils/api/uploadAction';
import { isValidImage } from '@/utils/utils';

interface EditProps {
    data: INews;
}

const EditNewsClient: React.FC<EditProps> = ({ data }) => {
    console.log('entered', data);
    // State Management
    const [title, setTitle] = useState(data.title || '');
    const [link, setLink] = useState(data.link || '');
    const [type, setType] = useState<'NEWS' | 'VIDEO'>(data?.type === 'NEWS' || data?.type === 'VIDEO' ? data.type : 'NEWS');
    const [relatedStocks, setRelatedStocks] = useState<string[]>(data?.companyId ? [data.companyId] : []);

    const [featuredImageUrl, setFeaturedImageUrl] = useState(data?.type === 'NEWS' ? isValidImage(data.image || '') : '');
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
            _id: data._id,
            title,
            type,
            link,
            companyId: relatedStocks[0],
            image: featuredImage?.name || featuredImageUrl,
        };

        const result = updateNewsSchema.safeParse(newsData);
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
            let uploadedImageUrl = featuredImageUrl;
            if (type === 'NEWS' && featuredImage) {
                const uploadResponse = await uploadFile([featuredImage], 'stocks');
                if (isServerError(uploadResponse)) {
                    toast.error(uploadResponse.error.message || 'Image upload failed');
                    return;
                }
                uploadedImageUrl = uploadResponse[0];
            }

            newsData.image = uploadedImageUrl;
            const response = await updateNews(data._id!, newsData as unknown as INews);

            if (isServerError(response)) {
                toast.error(response.error.message || 'An error occurred');
            } else {
                setErrors({});
                toast.success('News updated successfully!');
            }
        } catch (error) {
            toast.error('An unexpected error occurred');
        }
    };

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" gutterBottom>Edit News</Typography>

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
                        <Paper 
                            elevation={3} 
                            sx={{ 
                                width: '100%', 
                                height: 200, 
                                display: 'flex', 
                                justifyContent: 'center', 
                                alignItems: 'center', 
                                overflow: 'hidden', 
                                borderRadius: 2,
                                marginBottom: 2,
                                position: 'relative'
                            }}
                        >
                            {(featuredImage || featuredImageUrl) ? (
                                <Box 
                                    sx={{ 
                                        width: '100%', 
                                        height: '100%', 
                                        position: 'relative' 
                                    }}
                                >
                                    <Image
                                        src={featuredImage ? URL.createObjectURL(featuredImage) : featuredImageUrl}
                                        alt="Featured Image"
                                        fill
                                        style={{ 
                                            objectFit: 'contain', 
                                            objectPosition: 'center' 
                                        }}
                                    />
                                </Box>
                            ) : (
                                <Typography variant="body2" color="textSecondary">
                                    No image selected
                                </Typography>
                            )}
                        </Paper>

                        <Button 
                            component="label" 
                            variant="contained" 
                            startIcon={<CloudUploadIcon />} 
                            fullWidth 
                            sx={{ 
                                marginTop: 1,
                                padding: 1.5 
                            }}
                        >
                            Upload Image
                            <input 
                                type="file" 
                                hidden 
                                accept="image/*" 
                                onChange={handleImageUpload} 
                            />
                        </Button>
                    </Grid>
                )}

                <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>Update News</Button>
                </Grid>
            </Grid>

            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
                <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity}>{snackbarMessage}</Alert>
            </Snackbar>
        </Container>
    );
};

export default EditNewsClient;