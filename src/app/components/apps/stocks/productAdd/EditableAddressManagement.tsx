import React, { useState } from "react";
import { Box, Button, Grid, TextField, Typography, Divider, Paper } from "@mui/material";
import { Delete } from "@mui/icons-material";
import ErrorMessage from "@/app/components/shared/ErrorMessage";

interface IManagement {
  name: string;
  position: string;
}

interface EditableAddressAndManagementProps {
  address?: string;
  pan?: string;
  isin?: string;
  email?: string;
  phone?: string;
  website?: string;
  location?: string;
  management: IManagement[];
  onAddressChange: (address: string) => void;
  onPanChange: (pan: string) => void;
  onIsinChange: (isin: string) => void;
  onEmailChange: (email: string) => void;
  onPhoneChange: (phone: string) => void;
  onWebsiteChange: (website: string) => void;
  onManagementChange: (management: IManagement[]) => void;
  onLocationChange: (location: string) => void;
  validationErrors: Record<string, string>;
  id: string;
}

const EditableAddressAndManagement: React.FC<EditableAddressAndManagementProps> = ({
  address,
  pan,
  isin,
  email,
  phone,
  website,
  management,
  location,
  onAddressChange,
  onLocationChange,
  onPanChange,
  onIsinChange,
  onEmailChange,
  onPhoneChange,
  onWebsiteChange,
  onManagementChange,
  validationErrors,
  id
}) => {
  const [newManager, setNewManager] = useState<IManagement>({ name: "", position: "" });

  const handleAddManager = () => {
    if (newManager.name.trim() && newManager.position.trim()) {
      onManagementChange([...management, newManager]);
      setNewManager({ name: "", position: "" });
    }
  };

  const validatePhoneNumber = (phoneNumber: string): boolean => {
    const phoneRegex = /^[0-9]{11||10||12}$/; 
    return phoneRegex.test(phoneNumber);
  };

  const validateWebsite = (url: string): boolean => {
    try {
      const urlObject = new URL(url);
      return urlObject.protocol=== "http" || urlObject.protocol === "https"||urlObject.protocol === "www";
    } catch (e) {
      return false;
    }
  };

  const handleRemoveManager = (index: number) => {
    const updatedManagement = management.filter((_, i) => i !== index);
    onManagementChange(updatedManagement);
  };

  return (
    <div id={id}>
      <Paper elevation={3} sx={{ padding: 2, borderRadius: "8px" }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
          Company Information
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: "bold", mt: 3 }}>
          Add New Manager
        </Typography>
        <Grid container spacing={2} justifyContent={"space-between"} alignItems="center">
          <Grid item xs={12} sm={4} md={5}>
            <TextField
              fullWidth

              value={newManager.name}
              onChange={(e) => setNewManager((prev) => ({ ...prev, name: e.target.value }))}
              placeholder="New Manager Name"
              variant="outlined"
              error={!!validationErrors['management.name']}
              helperText={validationErrors['management.name']}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={5}>
            <TextField
              fullWidth
              value={newManager.position}
              onChange={(e) => setNewManager((prev) => ({ ...prev, position: e.target.value }))}
              placeholder="New Manager Position"
              variant="outlined"
              error={!!validationErrors['management.position']}
              helperText={validationErrors['management.position']}
            />
          </Grid>
          <Grid item xs={12} sm={2} md={1}>
            <Button variant="contained" color="primary" onClick={handleAddManager}>
              Add
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item md={6} xs={12}>

            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mt: 2 }}>
              Registered Address
            </Typography>
            <TextField
              fullWidth
              value={location || ""}
              onChange={(e) => onAddressChange(e.target.value)}
              placeholder="Enter address"
              id="company.location"

              variant="outlined"
              error={!!validationErrors['company.location']}
              helperText={validationErrors['company.location']}
            />

            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mt: 2 }}>
              PAN
            </Typography>
            <TextField
              fullWidth
              value={pan || ""}
              onChange={(e) => onPanChange(e.target.value)}
              placeholder="Enter PAN"
              id="company.pan"

              variant="outlined"
              error={!!validationErrors['company.pan']}
              helperText={validationErrors['company.pan']}
            />

            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mt: 2 }}>
              ISIN
            </Typography>
            <TextField
              fullWidth
              value={isin || ""}
              onChange={(e) => onIsinChange(e.target.value)}
              placeholder="Enter ISIN"
              id="company.isin"
              variant="outlined"
              error={!!validationErrors['company.isin']}
              helperText={validationErrors['company.isin']}
            />

            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mt: 2 }}>
              Co. email
            </Typography>
            <TextField
              type="email"
              fullWidth
              value={email || ""}
              onChange={(e) => onEmailChange(e.target.value)}
              placeholder="Enter email"
              id="company.email"

              variant="outlined"
              error={!!validationErrors['company.email']}
              helperText={validationErrors['company.email']}
            />

            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mt: 2 }}>
              Co. site
            </Typography>
            <TextField
              type="text"
              fullWidth
              value={website || ""}
              onChange={(e) => onWebsiteChange(e.target.value)}
              placeholder="Enter site"
              variant="outlined"
              id="company.website"

              error={!validateWebsite(website || "") && !!validationErrors["company.website"]}
              helperText={
                !validateWebsite(website || "")
                  ? "Please enter a valid URL (e.g.,example.com)"
                  : validationErrors["company.website"]
              }
            />

            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mt: 2 }}>
              Co. phone
            </Typography>
            <TextField
              type="text"
              fullWidth
              value={phone || ""}
              onChange={(e) => onPhoneChange(e.target.value)}
              placeholder="Enter phone number"
              variant="outlined"
              error={!validatePhoneNumber(phone || "") && !!validationErrors["company.phone"]}
              helperText={
                !validatePhoneNumber(phone || "")
                  ? "Please enter a valid 10-digit phone number."
                  : validationErrors["company.phone"]
              }
            />
          </Grid>

          {/* Management Section */}
          <Grid item md={6} xs={12} mt={2}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", color: "#333" }}>
              Management
            </Typography>
            <Divider sx={{ mb: 2 }} />

            {management.map((manager, index) => (
              <Grid container spacing={2} key={index} alignItems="center" sx={{ mb: 2 }}>
                <Grid item xs={5}>
                  <TextField
                    fullWidth
                    value={manager.name}
                    onChange={(e) => {
                      const updatedManagement = [...management];
                      updatedManagement[index].name = e.target.value;
                      onManagementChange(updatedManagement);
                    }}
                    placeholder="Manager Name"
                    variant="outlined"
                    error={!!validationErrors[`management[${index}].name`]}
                    helperText={validationErrors[`management[${index}].name`]}
                  />
                </Grid>
                <Grid item xs={5}>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    {manager.position}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Button variant="contained" color="error" onClick={() => handleRemoveManager(index)}>
                    <Delete />
                  </Button>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
        {validationErrors?.["company.management"] && (
          <Box
            sx={{
              color: "error.main",
              fontSize: "0.875rem",
              marginTop: 0.5,
            }}
          >
            <ErrorMessage error={{ message: validationErrors["company.management"] }} />

          </Box>
        )}
      </Paper>
    </div>

  );
};

export default EditableAddressAndManagement;