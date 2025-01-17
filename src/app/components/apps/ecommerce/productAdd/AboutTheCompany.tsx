'use client';

import { Box, TextField, Button, Typography, Grid, useTheme } from '@mui/material';
import React, { useState } from 'react';

interface AboutTheCompanyProps {
    description: string;
    youtubeLink: string;
    onDescriptionChange: (newDescription: string) => void;
    onYoutubeLinkChange: (newLink: string) => void;
}

const AboutTheCompany: React.FC<AboutTheCompanyProps> = ({ description, youtubeLink, onDescriptionChange, onYoutubeLinkChange }) => {
    const theme = useTheme();
    const [localDescription, setLocalDescription] = useState(description);
    const [localYoutubeLink, setLocalYoutubeLink] = useState(youtubeLink);

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLocalDescription(event.target.value);
        onDescriptionChange(event.target.value);
    };

    const handleYoutubeLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLocalYoutubeLink(event.target.value);
        onYoutubeLinkChange(event.target.value);
    };

    return (
        <Box sx={{ padding: 3, backgroundColor: "transparent", borderRadius: 2 }}>
            <Typography variant="h4" gutterBottom>About the Company</Typography>
            <Grid container spacing={2} mt={3}>
                {/* Editable Description */}
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="Company Description"
                        multiline
                        minRows={10}
                        variant="outlined"
                        value={localDescription}
                        onChange={handleDescriptionChange}
                        sx={{ marginBottom: 2 }}
                    />
                </Grid>

                {/* Editable YouTube Link */}
                <Grid item xs={12} md={6}>
                    <Box>
                        {localYoutubeLink ? (
                            <Box sx={{paddingBottom: '0%', height:"300px", overflow: 'hidden' }}>
                                <iframe
                                    title="Company Video"
                                    src={`https://www.youtube.com/embed/${localYoutubeLink.split('v=')[1]}`}
                                    style={{  width: '100%', height: '250px' }}
                                    frameBorder="0"
                                    allowFullScreen
                                ></iframe>
                            </Box>
                        ) : (
                            <Box
                                sx={{
                                    backgroundColor: theme.palette.primary.light,
                                    color: theme.palette.primary.main,
                                    textAlign: "center",
                                    border: "1px dashed",
                                    // padding: "30px",
                                    height: "250px",
                                    width: "100%",
                                    borderColor: theme.palette.primary.main,
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",

                                }}
                            >
                                <Typography  variant="body2" marginBottom={2} className="m-auto">
                                    Add a YouTube video link
                                </Typography>
                            </Box>
                        )}

                        <TextField
                            fullWidth
                            label="YouTube Video Link"
                            variant="outlined"
                            value={localYoutubeLink}
                            onChange={handleYoutubeLinkChange}
                            sx={{ marginBottom: 2,marginTop:1 }}
                        />
                    </Box>
                </Grid>
            </Grid>

        </Box>
    );
};

export default AboutTheCompany;
