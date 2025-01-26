'use client';
import React, { useRef, useState } from 'react';
import {
    Container,
    Typography,
    TextField,
    Button,
    Grid,
    Select,
    MenuItem,
    Chip,
    Box,
    FormControl,
    IconButton,
    InputLabel,
    Snackbar,
    Alert
} from '@mui/material';
import {
    CloudUpload as CloudUploadIcon,
    Add as AddIcon
} from '@mui/icons-material';
import dynamic from 'next/dynamic';
import { CustomSelect } from './CustomSelect';
import { CustomSelectAuthor } from './CustomSelectAuthor';
import { BlogSchema, updateBlogSchema } from '@/utils/schema/blogSchema';
import { createBlogAction, updateBlog, uploadImages } from '@/app/(DashboardLayout)/apps/blog/action';
import { isServerError } from '@/app/(DashboardLayout)/action';
import { IBlog } from '@/app/(DashboardLayout)/types/apps/IBlog';
import toast from 'react-hot-toast';
import { uploadFile } from '@/utils/api/uploadAction';
import ReactQuill from 'react-quill';
import Image from 'next/image';

interface EditProps {
    data: IBlog;
}

const EditBlogClient: React.FC<EditProps> = ({ data }) => {
    console.log("Client", data);

    // Initialize state with correct data types
    const [title, setTitle] = useState(data.title || '');
    const [slug, setSlug] = useState(data.slug || '');
    const [content, setContent] = useState(data.content || '');
    const [excerpt, setExcerpt] = useState(data.excerpt || '');
    const [categories, setCategories] = useState<string[]>(data.categories || []);
    const [categoryInput, setCategoryInput] = useState('');
    const [tags, setTags] = useState<string[]>(data.tags || []);
    const [tagInput, setTagInput] = useState('');
    const [status, setStatus] = useState<'draft' | 'published'>(data.status || 'draft');
    const [relatedStocks, setRelatedStocks] = useState<string[]>(data.relatedStocks || []);
    const [author, setAuthor] = useState('');
    const [featuredImageUrl, setFeaturedImageUrl] = useState(data.featuredImage || '');
    const [featuredImage, setFeaturedImage] = useState<File | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
    const [seoTitle, setSeoTitle] = useState(data.seoTitle || '');
    const [seoDescription, setSeoDescription] = useState(data.seoDescription || '');
    const [seoKeywords, setSeoKeywords] = useState<string[]>(data.seoKeywords || []);
    const [seoKeywordInput, setSeoKeywordInput] = useState('');

    const formRefs: Record<string, React.RefObject<HTMLElement>> = {
        title: useRef<HTMLInputElement>(null),
        slug: useRef<HTMLInputElement>(null),
        content: useRef<HTMLDivElement>(null),
        excerpt: useRef<HTMLInputElement>(null),
        featuredImage: useRef<HTMLInputElement>(null),
        seoTitle: useRef<HTMLInputElement>(null),
        seoDescription: useRef<HTMLInputElement>(null),
        seoKeywords: useRef<HTMLInputElement>(null),
        categories: useRef<HTMLInputElement>(null),
        tags: useRef<HTMLInputElement>(null),
        relatedStocks: useRef<HTMLInputElement>(null),
        author: useRef<HTMLInputElement>(null)
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setFeaturedImage(event.target.files[0]);
        }
    };

    const handleAddCategory = () => {
        const category = categoryInput.trim();
        if (category && !categories.includes(category)) {
            setCategories([...categories, category]);
            setCategoryInput('');
        }
    };

    const handleAddTag = () => {
        const tag = tagInput.trim();
        if (tag && !tags.includes(tag)) {
            setTags([...tags, tag]);
            setTagInput('');
        }
    };

    const handleAddSeoKeyword = () => {
        const keyword = seoKeywordInput.trim();
        if (keyword && !seoKeywords.includes(keyword)) {
            setSeoKeywords([...seoKeywords, keyword]);
            setSeoKeywordInput('');
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const handleSubmit = async () => {
        const blogData = {
            _id: data._id,
            title,
            slug,
            content,
            excerpt,
            categories: categories,
            tags,
            status,
            relatedStocks,
            author,
            featuredImage: featuredImage?.name,
            seoTitle,
            seoDescription,
            seoKeywords,
        };

        const result = updateBlogSchema.safeParse(blogData);
        console.log("results", result);
        if (!result.success) {
            const newErrors: Record<string, string> = {};
            result.error.errors.forEach((error) => {
                newErrors[error.path[0]] = error.message;
            });

            if (categories.length === 0) newErrors.categories = 'At least one category is required';
            if (tags.length === 0) newErrors.tags = 'At least one tag is required';

            setErrors(newErrors);

            const firstErrorKey = Object.keys(newErrors)[0] as keyof typeof formRefs;
            if (formRefs[firstErrorKey]?.current) {
                formRefs[firstErrorKey].current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }

            setSnackbarMessage('Please fix the validation errors');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        } else {
            try {
                // Upload the featured image if it exists
                let uploadedImageUrl = featuredImageUrl;
                if (featuredImage) {
                    console.log("featuredImage", featuredImage);
                    const uploadResponse = await uploadFile([featuredImage], 'stocks');
                    if (isServerError(uploadResponse)) {
                        console.log("isServerError", uploadResponse);
                        toast.error(uploadResponse.error.message || "Image upload failed");
                        return;
                    }
                    console.log("uploadre", uploadResponse);
                    uploadedImageUrl = uploadResponse[0];
                }

                blogData.featuredImage = uploadedImageUrl;

                // Call the API to update the blog
                const response = await updateBlog(data._id!, blogData as unknown as IBlog);

                if (isServerError(response)) {
                    setSnackbarMessage(response.error.message || 'An error occurred');
                    setSnackbarSeverity('error');
                    setOpenSnackbar(true);
                } else {
                    setErrors({});
                    setSnackbarMessage('Blog updated successfully!');
                    setSnackbarSeverity('success');
                    setOpenSnackbar(true);
                }
            } catch (error) {
                console.error('Error updating blog:', error);
                setSnackbarMessage('An unexpected error occurred');
                setSnackbarSeverity('error');
                setOpenSnackbar(true);
            }
        }
    };

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" gutterBottom>
                Edit Blog Post
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <TextField
                        fullWidth
                        label="Blog Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        margin="normal"
                        error={!!errors.title}
                        helperText={errors.title}
                        inputRef={formRefs.title}
                        required
                    />
                    <ReactQuill
                        value={content}
                        onChange={setContent}
                        style={{ height: '400px', marginBottom: '50px', width: '100%' }}
                        modules={{
                            toolbar: [
                                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                                ['bold', 'italic', 'underline', 'strike'],
                                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                                ['link', 'image', 'video'],
                                ['clean']
                            ]
                        }}
                    />
                    {errors.content && <Typography color="error">{errors.content}</Typography>}
                    <TextField
                        fullWidth
                        label="Blog Excerpt"
                        multiline
                        rows={4}
                        value={excerpt}
                        onChange={(e) => setExcerpt(e.target.value)}
                        margin="normal"
                        error={!!errors.excerpt}
                        helperText={errors.excerpt}
                        inputRef={formRefs.excerpt}
                        required
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }} mb={2}>
                        <TextField
                            fullWidth
                            label="Blog Slug"
                            value={slug}
                            onChange={(e) => setSlug(e.target.value)}
                            margin="normal"
                            error={!!errors.slug}
                            helperText={errors.slug}
                            inputRef={formRefs.slug}
                            required
                        />
                    </Box>
                    <TextField fullWidth label="SEO Title" value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} margin="normal" error={!!errors.seoTitle} helperText={errors.seoTitle} required />
                    <TextField fullWidth label="SEO Description" multiline rows={4} value={seoDescription} onChange={(e) => setSeoDescription(e.target.value)} margin="normal" error={!!errors.seoDescription} helperText={errors.seoDescription} required />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }} mb={2}>
                        <TextField label="Add SEO Keyword" variant="outlined" fullWidth value={seoKeywordInput} onChange={(e) => setSeoKeywordInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') handleAddSeoKeyword(); }} error={!!errors.seoKeywords} helperText={errors.seoKeywords} />
                        <IconButton onClick={handleAddSeoKeyword}><AddIcon /></IconButton>
                    </Box>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }} mb={2}>
                        {seoKeywords.map((keyword) => (
                            <Chip key={keyword} label={keyword} onDelete={() => setSeoKeywords(seoKeywords.filter(k => k !== keyword))} />
                        ))}
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <FormControl fullWidth>
                            <InputLabel>Status</InputLabel>
                            <Select value={status} label="Status" onChange={(e) => setStatus(e.target.value as 'draft' | 'published')}>
                                <MenuItem value="draft">Draft</MenuItem>
                                <MenuItem value="published">Published</MenuItem>
                            </Select>
                        </FormControl>
{/* 
                        {
                            data.featuredImage && data.featuredImage.startsWith("https") &&
                            <Box>
                                <Image

                                    src={data.featuredImage || ""}
                                    alt={data.slug}



                                />
                            </Box>
                        } */}

                        <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} fullWidth>
                            Upload Featured Image
                            <input type="file" hidden accept="image/*" onChange={handleImageUpload} required />
                        </Button>

                        {featuredImage && (
                            <Typography variant="body2">{featuredImage.name}</Typography>
                        )}

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <TextField label="Add Category" variant="outlined" fullWidth value={categoryInput} onChange={(e) => setCategoryInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') handleAddCategory(); }} error={!!errors.categories} helperText={errors.categories} />
                            <IconButton onClick={handleAddCategory}><AddIcon /></IconButton>
                        </Box>

                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {categories.map((category) => (
                                <Chip key={category} label={category} onDelete={() => setCategories(categories.filter(c => c !== category))} />
                            ))}
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <TextField label="Add Tags" variant="outlined" fullWidth value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') handleAddTag(); }} error={!!errors.tags} helperText={errors.tags} />
                            <IconButton onClick={handleAddTag}><AddIcon /></IconButton>
                        </Box>

                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {tags.map((tag) => (
                                <Chip key={tag} label={tag} onDelete={() => setTags(tags.filter(t => t !== tag))} />
                            ))}
                        </Box>

                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            <FormControl fullWidth>
                                <CustomSelect id="company.id" name="Company" value={relatedStocks?.[0]} onChange={(value: any) => setRelatedStocks([value])} error={!!errors.relatedStocks} helperText={errors.relatedStocks} />
                            </FormControl>
                        </Box>

                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            <FormControl fullWidth>
                                <CustomSelectAuthor id="author.id" name="Author" value={author} onChange={(value: any) => setAuthor(value)} error={!!errors.author} helperText={errors.author} />
                            </FormControl>
                        </Box>
                        <Button variant="contained" color="primary" onClick={handleSubmit}>Update Blog</Button>
                    </Box>
                </Grid>
            </Grid>

            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>{snackbarMessage}</Alert>
            </Snackbar>
        </Container>
    );
};

export default EditBlogClient;