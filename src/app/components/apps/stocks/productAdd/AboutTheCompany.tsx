'use client';

import React, { useEffect, useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  useTheme,
  FormHelperText,
} from '@mui/material';

interface AboutTheCompanyProps {
  aboutus?: string;
  videoLink?: string;
  onAboutChange: (newDescription: string) => void;
  onVideoLinkChange: (newLink: string) => void;
  validationErrors?: Record<string, string>; // Prop to pass validation errors
  id: string;

}

const AboutTheCompany: React.FC<AboutTheCompanyProps> = ({
  aboutus,
  videoLink,
  onAboutChange,
  onVideoLinkChange,
  validationErrors,
  id
}) => {
  const theme = useTheme();
  const [localDescription, setLocalDescription] = useState(aboutus);
  const [localVideoLink, setLocalVideoLink] = useState(videoLink);

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newDescription = event.target.value;
    setLocalDescription(newDescription);
    onAboutChange(newDescription);
  };

  useEffect(()=>{
    if(aboutus){
      setLocalDescription(aboutus);
    }
    if(videoLink){
      setLocalVideoLink(videoLink)
    }

  },[aboutus,videoLink])

  const handleVideoLinkChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newLink = event.target.value;
    setLocalVideoLink(newLink);
    onVideoLinkChange(newLink);
  };

  const extractYouTubeEmbedLink = (link: string) => {
    const videoId = link.split('v=')[1]?.split('&')[0];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
  };

  return (
    <div id={id}>

      <Box sx={{ padding: 3, backgroundColor: 'transparent', borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>
          About the Company
        </Typography>
        <Grid container spacing={3} mt={2}>
          {/* Editable Description */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Company Description"
              multiline
              minRows={10}
              id={`company.aboutus`}
              variant="outlined"
              value={localDescription}
              onChange={handleDescriptionChange}
              sx={{ marginBottom: 2 }}
              error={!!validationErrors?.aboutus} // Display error for description
              helperText={validationErrors?.aboutus} // Error message for description
            />
          </Grid>

          {/* Editable YouTube Link */}
          <Grid item xs={12} md={6}>
            <Box>
              {localVideoLink && extractYouTubeEmbedLink(localVideoLink) ? (
                <Box
                  sx={{
                    paddingBottom: '0%',
                    height: '300px',
                    overflow: 'hidden',
                  }}
                >
                  <iframe
                    title="Company Video"
                    src={extractYouTubeEmbedLink(localVideoLink)}
                    style={{ width: '100%', height: '250px' }}
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>

                </Box>
              ) : (
                <Box
                  sx={{
                    backgroundColor: theme.palette.primary.light,
                    color: theme.palette.primary.main,
                    textAlign: 'center',
                    border: '1px dashed',
                    height: '250px',
                    width: '100%',
                    borderColor: theme.palette.primary.main,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant="body2" className="m-auto">
                    Add a YouTube video link
                  </Typography>
                </Box>
              )}

              <TextField
                fullWidth
                id={`company.videoLink`}
                label="YouTube Video Link"
                variant="outlined"
                value={localVideoLink}
                onChange={handleVideoLinkChange}
                sx={{ marginTop: 2 }}
                error={!!validationErrors?.videoLink} // Display error for video link
                helperText={validationErrors?.videoLink} // Error message for video link
              />
            </Box>
          </Grid>
        </Grid>
        {validationErrors?.["company.videoLink"] && (
          <Box
            sx={{
              color: "error.main",
              fontSize: "0.875rem",
              marginTop: 0.5,
            }}
          >
            {validationErrors["company.videoLink"]}
          </Box>
        )}
      </Box>
    </div>
  );

};

export default AboutTheCompany;