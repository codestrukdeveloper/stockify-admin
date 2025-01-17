"use client";

import React from "react";
import Box from "@mui/material/Box";
import { Typography, useTheme } from "@mui/material";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

const CompanyImage = () => {
  const theme = useTheme();

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [".png", ".jpg", ".jpeg"] }, // Accept only images
    multiple: false, // Allow only a single file
  });

  return (
    // <Box width="211px" height={"130px"} color={"ButtonShadow"}
    // sx={{
    //   background:"black"
    // }}
    
    // >
      <Box
        fontSize="12px"

        width={"100%"}
       
        sx={{
          backgroundColor: theme.palette.primary.light,
          color: theme.palette.primary.main,
          textAlign: "center",
          padding:acceptedFiles.length>0 ?"0px":"30px",
          border: "1px dashed",
          borderColor: theme.palette.primary.main,
          cursor: "pointer",
          display:"flex",
          alignItems:"center",
          justifyContent:"center"
        }}
        {...getRootProps({ className: "dropzone" })}
      >
        <input {...getInputProps()} />
        {acceptedFiles.length > 0 ? (
          <Image
            src={URL.createObjectURL(acceptedFiles[0])} // Create a URL for the image
            alt="Uploaded Logo"
            width={211}
            height={130}
            style={{ objectFit: "cover" }}
            className="w-full"
          />
        ) : (
          <Typography variant="body2" className="m-auto">
            Drag 'n' drop company logo here, or click to select one
          </Typography>
        )}
      </Box>
      /*
         <Typography variant="body2" textAlign="center" mt={1}>
        Set the company image. Only *.png, *.jpg, and *.jpeg image
        files are accepted.
      </Typography> */
    // </Box>
  );
};

export default CompanyImage;
