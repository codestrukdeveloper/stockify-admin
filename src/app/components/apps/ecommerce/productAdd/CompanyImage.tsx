"use client";

import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { Typography, useTheme } from "@mui/material";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

interface CompanyImageProps {
  image: File | undefined | null;
  onChangeImage: (file: File) => void;
  validationErrors: Record<string, string>;

}

const CompanyImage: React.FC<CompanyImageProps> = ({ image, onChangeImage, validationErrors }) => {
  const theme = useTheme();

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [".png", ".jpg", ".jpeg"] }, // Accept only images
    multiple: false, // Allow only a single file
    onDrop: (files) => {
      if (files.length > 0) {
        onChangeImage(files[0]);
      }
    },
  });

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      onChangeImage(acceptedFiles[0]);
    }
  }, [acceptedFiles, onChangeImage]);

  return (
    <Box
      fontSize="12px"
      width={"100%"}
      sx={{
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.main,
        textAlign: "center",
        padding: image ? "0px" : "30px",
        border: `1px dashed ${validationErrors["company.logo"] ? theme.palette.error.main : theme.palette.primary.main}`,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      {...getRootProps({ className: "dropzone" })}
    >
      <input {...getInputProps()} />
      {image ? (
        <Image
          src={URL.createObjectURL(image)} // Create a URL for the image
          alt="Uploaded Logo"
          width={211}
          height={130}
          style={{ objectFit: "cover" }}
          className="w-full"
          id="company.logo"
        />
      ) : (
        <Typography variant="body2" className="m-auto">
          Drag 'n' drop company logo here, or click to select one
        </Typography>
      )}
      {validationErrors["company.logo"] && (
        <Typography variant="body2" color="error" sx={{ mt: 1 }}>
          Company logo is required
        </Typography>
      )}
    </Box>
  );
};

export default CompanyImage;