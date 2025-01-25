'use client';
import React, { useState } from 'react';
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
    InputLabel
} from '@mui/material';
import {
    CloudUpload as CloudUploadIcon,
    Add as AddIcon
} from '@mui/icons-material';
import dynamic from 'next/dynamic';


// Dynamically import rich text editor
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import { ICompany } from '@/app/(DashboardLayout)/types/apps/ICompany';

const CreateBlogClient: React.FC = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [categories, setCategories] = useState<string[]>([]);
    const [tags, setTags] = useState<string[]>([]);
    const [status, setStatus] = useState<'draft' | 'published'>('draft');
    const [relatedStocks, setRelatedStocks] = useState<ICompany[]>([]);
    const [featuredImage, setFeaturedImage] = useState<File | null>(null);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setFeaturedImage(event.target.files[0]);
        }
    };
    const handleAddCategory = (category: string) => {
        if (category && !categories.includes(category)) {
          setCategories([...categories, category]);
        }
      };
    
    
      const handleAddTag = (tag: string) => {
        if (tag && !tags.includes(tag)) {
          setTags([...tags, tag]);
        }
      };
    
    
    const handleAddStock = (stock: ICompany) => {
        if (!relatedStocks.find((s) => s.name === stock.name)) {
            setRelatedStocks([...relatedStocks, stock]);
        }
    };

    const handleRemoveStock = (stockName: string) => {
        setRelatedStocks(relatedStocks.filter((stock) => stock.name !== stockName));
    };

    const handleSubmit = () => {
        const blogData = {
            title,
            content,
            excerpt,
            categories,
            tags,
            status,
            relatedStocks: relatedStocks.map((s) => s.name), // Save only stock names
            featuredImage
        };
        console.log(blogData);
        // Add API call to save blog post
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
                    />

                    <ReactQuill
                        value={content}
                        onChange={setContent}
                        style={{ height: '300px', marginBottom: '50px' }}
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

                    <TextField
                        fullWidth
                        label="Blog Excerpt"
                        multiline
                        rows={4}
                        value={excerpt}
                        onChange={(e) => setExcerpt(e.target.value)}
                        margin="normal"
                    />
                </Grid>

                <Grid item xs={12} md={4}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <FormControl fullWidth>
                            <InputLabel>Status</InputLabel>
                            <Select
                                value={status}
                                label="Status"
                                onChange={(e) => setStatus(e.target.value as 'draft' | 'published')}
                            >
                                <MenuItem value="draft">Draft</MenuItem>
                                <MenuItem value="published">Published</MenuItem>
                            </Select>
                        </FormControl>

                        <Button
                            component="label"
                            variant="contained"
                            startIcon={<CloudUploadIcon />}
                            fullWidth
                        >
                            Upload Featured Image
                            <input
                                type="file"
                                hidden
                                accept="image/*"
                                onChange={handleImageUpload}
                            />
                        </Button>

                        {featuredImage && (
                            <Typography variant="body2">
                                {featuredImage.name}
                            </Typography>
                        )}

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <TextField
                                label="Add Category"
                                variant="outlined"
                                fullWidth
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleAddCategory((e.target as HTMLInputElement).value);
                                        (e.target as HTMLInputElement).value = '';
                                    }
                                }}
                            />
                            <IconButton
                                onClick={() => handleAddCategory((document.getElementById('categoryInput') as HTMLInputElement).value)}
                            >
                                <AddIcon />
                            </IconButton>
                        </Box>

                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {categories.map((category) => (
                                <Chip
                                    key={category}
                                    label={category}
                                    onDelete={() => setCategories(categories.filter(c => c !== category))}
                                />
                            ))}
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <TextField
                                label="Add Tags"
                                variant="outlined"
                                fullWidth
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleAddTag((e.target as HTMLInputElement).value);
                                        (e.target as HTMLInputElement).value = '';
                                    }
                                }}
                            />
                            <IconButton
                                onClick={() => handleAddCategory((document.getElementById('categoryInput') as HTMLInputElement).value)}
                            >
                                <AddIcon />
                            </IconButton>
                        </Box>

                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {tags.map((tag) => (
                                <Chip
                                    key={tag}
                                    label={tag}
                                    onDelete={() => setTags(tags.filter(t => t !== tag))}
                                />
                            ))}
                        </Box>

                     
                      
                        {/* <SearchCompanies onSelectStock={handleAddStock} /> */}

                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {relatedStocks.map((stock) => (
                                <Chip
                                    key={stock.name}
                                    label={stock.name}
                                    onDelete={() => handleRemoveStock(stock.name)}
                                />
                            ))}
                        </Box>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={handleSubmit}
                        >
                            Save Blog Post
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default CreateBlogClient;