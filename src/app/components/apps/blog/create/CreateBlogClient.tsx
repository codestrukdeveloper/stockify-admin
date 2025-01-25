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
import { BlogSchema } from '@/utils/schema/blogSchema';
import { createBlogAction, uploadImages } from '@/app/(DashboardLayout)/apps/blog/action';

// Dynamically import rich text editor
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import { isServerError } from '@/app/(DashboardLayout)/action';
import { IBlog } from '@/app/(DashboardLayout)/types/apps/IBlog';

const CreateBlogClient: React.FC = () => {
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [content, setContent] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [categories, setCategories] = useState<string[]>([]);
    const [categoryInput, setCategoryInput] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState('');
    const [status, setStatus] = useState<'draft' | 'published'>('draft');
    const [relatedStocks, setRelatedStocks] = useState<string[]>([]);
    const [author, setAuthor] = useState('');
    const [featuredImage, setFeaturedImage] = useState<File | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
    const [seoTitle, setSeoTitle] = useState('');
    const [seoDescription, setSeoDescription] = useState('');
    const [seoKeywords, setSeoKeywords] = useState<string[]>([]);
    const [seoKeywordInput, setSeoKeywordInput] = useState('');

    const formRefs: Record<string, React.RefObject<HTMLElement>> = {
        title: useRef<HTMLInputElement>(null),
        slug: useRef<HTMLInputElement>(null),
        content: useRef<HTMLDivElement>(null),
        excerpt: useRef<HTMLInputElement>(null),
        featuredImage: useRef<HTMLInputElement>(null)
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

    const handleAddStock = (stock: string) => {
        setRelatedStocks([stock]);
    };

    const handleAddAuthor = (author: string) => {
        setAuthor(author);
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
        // Prepare blog data for validation
        const blogData = {
            title,
            slug,
            content,
            excerpt,
            categories: categories.map((category) => ({
                name: category,
                slug: category.toLowerCase().replace(/\s+/g, '-'), // Generate slug from category name
                description: `Description for ${category}` // Add a default description
            })),
            tags,
            status,
            relatedStocks,
            author,
            featuredImage: featuredImage?.name || '',
            seoTitle,
            seoDescription,
            seoKeywords,

            publishedAt: new Date().toISOString() // Convert Date to ISO string
        };

        // Validate using Zod schema
        const result = BlogSchema.safeParse(blogData);
        console.log(result);
        if (!result.success) {
            // Handle validation errors
            const newErrors: Record<string, string> = {};

            result.error.errors.forEach((error) => {
                newErrors[error.path[0]] = error.message;
            });

            // Additional validation for categories and tags
            if (categories.length === 0) newErrors.categories = 'At least one category is required';
            if (tags.length === 0) newErrors.tags = 'At least one tag is required';

            setErrors(newErrors);

            // Scroll to the first error field
            const firstErrorKey = Object.keys(newErrors)[0] as keyof typeof formRefs;
            if (formRefs[firstErrorKey]?.current) {
                formRefs[firstErrorKey].current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }

            // Show error snackbar
            setSnackbarMessage('Please fix the validation errors');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        } else {
            try {
                let uploadedImageUrl = '';

                // Upload featured image if it exists
                if (featuredImage) {
                    const uploadResponse = await uploadImages('stocks', [featuredImage]);

                    if (!isServerError(uploadResponse)) {
                       return uploadedImageUrl = uploadResponse.data[0];
                    }
                }

                // Prepare the final blog data with the uploaded image URL
                const finalBlogData = {
                    ...result.data,
                    featuredImage: uploadedImageUrl || result.data.featuredImage // Fallback to the original value if no image was uploaded
                };
                // Call the API to create the blog
                const response = await createBlogAction(finalBlogData as unknown as IBlog);

                if (isServerError(response)) {
                    // Handle API errors
                    setSnackbarMessage(response.error.message || 'An error occurred');
                    setSnackbarSeverity('error');
                    setOpenSnackbar(true);
                } else {
                    // Reset errors and show success snackbar
                    setErrors({});
                    resetForm();

                    // Show success snackbar
                    setSnackbarMessage('Blog created successfully!');
                    setSnackbarSeverity('success');
                    setOpenSnackbar(true);
                }
            } catch (error) {
                // Handle unexpected errors
                console.error('Error creating blog:', error);
                setSnackbarMessage('An unexpected error occurred');
                setSnackbarSeverity('error');
                setOpenSnackbar(true);
            }
        }
    };

    const resetForm = () => {
        setTitle('');
        setSlug('');
        setContent('');
        setExcerpt('');
        setCategories([]);
        setTags([]);
        setSeoTitle('');
        setSeoDescription('');
        setSeoKeywords([]);
        setStatus('draft');
        setRelatedStocks([]);
        setAuthor('');
        setFeaturedImage(null);
    };

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" gutterBottom>
                Create Blog Post
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
                        style={{ height: '400px', marginBottom: '50px', width: '100%' }} // Adjusted height and width
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
                    {/* SEO Keywords Field */}
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

                        {/* Featured Image Upload */}
                        <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} fullWidth>
                            Upload Featured Image
                            <input type="file" hidden accept="image/*" onChange={handleImageUpload} required />
                        </Button>

                        {featuredImage && (
                            <Typography variant="body2">{featuredImage.name}</Typography>
                        )}

                        {/* Category Input */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <TextField label="Add Category" variant="outlined" fullWidth value={categoryInput} onChange={(e) => setCategoryInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') handleAddCategory(); }} error={!!errors.categories} helperText={errors.categories} />
                            <IconButton onClick={handleAddCategory}><AddIcon /></IconButton>
                        </Box>

                        {/* Categories Display */}
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {categories.map((category) => (
                                <Chip key={category} label={category} onDelete={() => setCategories(categories.filter(c => c !== category))} />
                            ))}
                        </Box>

                        {/* Tags Input */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <TextField label="Add Tags" variant="outlined" fullWidth value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') handleAddTag(); }} error={!!errors.tags} helperText={errors.tags} />
                            <IconButton onClick={handleAddTag}><AddIcon /></IconButton>
                        </Box>

                        {/* Tags Display */}
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {tags.map((tag) => (
                                <Chip key={tag} label={tag} onDelete={() => setTags(tags.filter(t => t !== tag))} />
                            ))}
                        </Box>

                        {/* Related Stocks */}
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            <FormControl fullWidth>
                                <CustomSelect id="company.id" name="Company" value={relatedStocks?.[0]} onChange={(value: any) => handleAddStock(value)} error={!!errors.relatedStocks} helperText={errors.relatedStocks} />
                            </FormControl>
                        </Box>


                        {/* author */}
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            <FormControl fullWidth>
                                <CustomSelectAuthor id="author.id" name="Author" value={author} onChange={(value: any) => handleAddAuthor(value)} error={!!errors.author} helperText={errors.author} />
                            </FormControl>
                        </Box>
                        {/* Submit Button */}
                        <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>

                    </Box>
                </Grid>
            </Grid>

            {/* Snackbar for notifications */}
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => handleCloseSnackbar()}>
                <Alert onClose={() => handleCloseSnackbar()} severity={snackbarSeverity}>{snackbarMessage}</Alert>
            </Snackbar>

        </Container>
    );
};

export default CreateBlogClient;
