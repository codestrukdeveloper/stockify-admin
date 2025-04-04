"use client";

import { TextField, Box, Typography } from "@mui/material";
import React from "react";

interface SEOMetaFieldsProps {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  seoHeader: string;
  seoContent: string;
  onMetaTitleChange: (value: string) => void;
  onMetaDescriptionChange: (value: string) => void;
  onKeywordsChange: (value: string[]) => void;
  onSeoHeaderChange: (value: string) => void;
  onSeoContentChange: (value: string) => void;
  validationErrors: Record<string, string>;
  id: string;
}

const SEOMetaFields: React.FC<SEOMetaFieldsProps> = ({
  metaTitle,
  metaDescription,
  keywords,
  seoHeader,
  seoContent,
  onMetaTitleChange,
  onMetaDescriptionChange,
  onKeywordsChange,
  onSeoHeaderChange,
  onSeoContentChange,
  validationErrors,
  id
}) => {

  console.log("SEO_HEader",seoHeader);
  console.log("seoContentseoContent",seoContent);

  return (
    <Box id={id} sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        SEO Meta Fields
      </Typography>
      <br />

      {/* Meta Title */}
      <TextField
        fullWidth
        label="Meta Title"
        value={metaTitle}
        onChange={(e) => onMetaTitleChange(e.target.value)}
        error={!!validationErrors["company.metaTitle"]}
        helperText={validationErrors["company.metaTitle"]}
        sx={{ mb: 2 }}
      />

      {/* Meta Description */}
      <TextField
        fullWidth
        label="Meta Description"
        value={metaDescription}
        onChange={(e) => onMetaDescriptionChange(e.target.value)}
        error={!!validationErrors["company.metaDescription"]}
        helperText={validationErrors["company.metaDescription"]}
        sx={{ mb: 2 }}
        multiline
        rows={3}
      />

      {/* Keywords */}
      <TextField
        fullWidth
        label="Keywords (comma-separated)"
        value={keywords.join(", ")}
        onChange={(e) => onKeywordsChange(e.target.value.split(", "))}
        error={!!validationErrors["company.keywords"]}
        helperText={validationErrors["company.keywords"]}
        sx={{ mb: 2 }}
        multiline
        rows={2}
      />

      {/* SEO Header */}
      <TextField
        fullWidth
        label="SEO Header"
        value={seoHeader}
        onChange={(e) => onSeoHeaderChange(e.target.value)}
        error={!!validationErrors["company.seoHeader"]}
        helperText={validationErrors["company.seoHeader"]}
        sx={{ mb: 2 }}
      />

      {/* SEO Content */}
      <TextField
        fullWidth
        label="SEO Content"
        value={seoContent}
        onChange={(e) => onSeoContentChange(e.target.value)}
        error={!!validationErrors["company.seoContent"]}
        helperText={validationErrors["company.seoContent"]}
        sx={{ mb: 2 }}
        multiline
        rows={3}
      />
    </Box>
  );
};

export default SEOMetaFields;
