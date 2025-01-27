"use client";
import React, { useState, useContext, useEffect } from "react";
import {
  Alert,
  Button,
  Typography,
  Box,
  Stack,
  Divider,
  Grid,
  Avatar,
} from "@mui/material";
import { useRouter } from "next/navigation";

import CustomFormLabel from "@/app/components/forms/theme-elements/CustomFormLabel";
import CustomTextField from "@/app/components/forms/theme-elements/CustomTextField";
import toast from "react-hot-toast";
import { isServerError } from "@/app/(DashboardLayout)/action";
import { ServerErrorRender } from "@/app/components/shared/ServerErrorRender";
import { IError } from "@/app/(DashboardLayout)/types/apps/error";
import { createAuthor } from "@/app/(DashboardLayout)/apps/author/action";
import { uploadImages } from "@/app/(DashboardLayout)/apps/blog/action";
import { uploadFile } from "@/utils/api/uploadAction";
import { IAuthor } from "@/app/(DashboardLayout)/types/apps/IAuthor";

const Createauthor = () => {
  const [showAlert, setShowAlert] = useState(false);
  const router = useRouter();
  const [error, setError] = useState<IError | null>();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    image: null,
    bio: "",
  });
  const [imagePreview, setImagePreview] = useState<string|null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "image" && files && files[0]) {
      const file = files[0];
      setFormData((prevData:any) => ({
        ...prevData,
        [name]: file,
      }));
      setImagePreview(URL.createObjectURL(file));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
    setError(null);
  };

  const handleSubmit = async (e:React.FormEvent) => {
    setSaving(true);
    e.preventDefault();
    try {
      if (!formData.image) {
        toast.error("Profile Pic is needed");
        return;
      }

      const uploadedImages = await uploadFile([formData.image], "author");
      console.log("uploadedImages",uploadedImages)
      if (isServerError(uploadedImages)) {
        setError(uploadedImages.error);
        return;
      }

      const createThis = {
        name: formData.name,
        bio: formData.bio,
        image: uploadedImages[0],
      };

      const data = await createAuthor(createThis);
      if (isServerError(data)) {
        setError(data.error);
        return;
      }

      setFormData({
        name: "",
        bio: "",
        image: null,
      });
      setImagePreview(null);
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
      toast.success("Author created successfully");
      router.push("/apps/author/list");
    } catch (error) {
      console.error("Error adding author:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box>
          <Stack
            direction="row"
            spacing={{ xs: 1, sm: 2, md: 4 }}
            justifyContent="space-between"
            mb={3}
          >
            <Typography variant="h5"># New</Typography>
            <Box display="flex" gap={1}>
              <Button
                variant="outlined"
                color="error"
                onClick={() => {
                  router.push("/apps/author/list");
                }}
              >
                Cancel
              </Button>
              <Button disabled={saving} type="submit" variant="contained" color="primary">
                Create author
              </Button>
            </Box>
          </Stack>
          <Divider></Divider>
          <Stack
            direction="row"
            spacing={{ xs: 1, sm: 2, md: 4 }}
            justifyContent="space-between"
            alignItems="center"
            mb={3}
          ></Stack>
          <Divider></Divider>

          <Grid container spacing={3} mb={4}>
            <Grid item xs={12} sm={6}>
              <CustomFormLabel htmlFor="Name" sx={{ mt: 0 }}>
                Name
              </CustomFormLabel>
              <CustomTextField
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomFormLabel htmlFor="Bio" sx={{ mt: 0 }}>
                Bio
              </CustomFormLabel>
              <CustomTextField
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                fullWidth
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomFormLabel htmlFor="Image" sx={{ mt: 0 }}>
                Profile Picture
              </CustomFormLabel>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                style={{ display: "none" }}
                id="image-upload"
              />
              <label htmlFor="image-upload">
                <Button variant="contained" component="span">
                  Upload Image
                </Button>
              </label>
              {imagePreview && (
                <Box mt={2}>
                  <Avatar src={imagePreview} alt="Preview" sx={{ width: 100, height: 100 }} />
                </Box>
              )}
            </Grid>
          </Grid>
          {showAlert && (
            <Alert severity="success" sx={{ position: "fixed", top: 16, right: 16 }}>
              Author added successfully.
            </Alert>
          )}
        </Box>
        {error && <ServerErrorRender error={error} toastMessage />}
      </form>
    </>
  );
};

export default Createauthor;