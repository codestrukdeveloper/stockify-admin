import React, { useState } from "react";
import { Box, Button, Grid, TextField, Typography, Divider } from "@mui/material";
import { IManagement } from "@/app/(DashboardLayout)/types/apps/IManagement";

interface EditableAddressAndManagementProps {
  address?: string;
  pan?: string;
  isin?: string;
  email?: string;
  phone?: string;
  website?: string;
  management: IManagement[];
  onAddressChange: (address: string) => void;
  onPanChange: (pan: string) => void;
  onIsinChange: (isin: string) => void;
  onEmailChange: (email: string) => void;
  onPhoneChange: (phone: string) => void;
  onWebsiteChange: (website: string) => void;
  onManagementChange: (management: IManagement[]) => void;
}

const EditableAddressAndManagement: React.FC<EditableAddressAndManagementProps> = ({
  address,
  pan,
  isin,
  email,
  phone,
  website,
  management,
  onAddressChange,
  onPanChange,
  onIsinChange,
  onEmailChange,
  onPhoneChange,
  onWebsiteChange,
  onManagementChange,
}) => {
  const [newManager, setNewManager] = useState<IManagement>({
    name: "",
    position: "",
  });

  const handleAddManager = () => {
    if (newManager.name.trim() && newManager.position.trim()) {
      onManagementChange([...management, newManager]);
      setNewManager({ name: "", position: "" });
    }
  };

  const handleRemoveManager = (index: number) => {
    const updatedManagement = management.filter((_, i) => i !== index);
    onManagementChange(updatedManagement);
  };

  const handleEditManager = (index: number, key: keyof IManagement, value: string) => {
    const updatedManagement = [...management];
    updatedManagement[index] = { ...updatedManagement[index], [key]: value };
    onManagementChange(updatedManagement);
  };

  return (
    <Box p={3} sx={{ backgroundColor: "#f9f9f9", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)" }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", color: "#333" }}>
        Company Information
      </Typography>
      <Divider sx={{ mb: 3 }} />

      {/* Address Section */}
      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: "bold", color: "#555" }}>
        Registered Address
      </Typography>
      <TextField
        fullWidth
        value={address || ""}
        onChange={(e) => onAddressChange(e.target.value)}
        placeholder="Enter registered address"
        margin="normal"
        variant="outlined"
      />

      {/* PAN Section */}
      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: "bold", color: "#555" }}>
        PAN
      </Typography>
      <TextField
        fullWidth
        value={pan || ""}
        onChange={(e) => onPanChange(e.target.value)}
        placeholder="Enter PAN"
        margin="normal"
        variant="outlined"
      />

      {/* ISIN Section */}
      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: "bold", color: "#555" }}>
        ISIN
      </Typography>
      <TextField
        fullWidth
        value={isin || ""}
        onChange={(e) => onIsinChange(e.target.value)}
        placeholder="Enter ISIN"
        margin="normal"
        variant="outlined"
      />

      {/* Email Section */}
      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: "bold", color: "#555" }}>
        Email
      </Typography>
      <TextField
        fullWidth
        value={email || ""}
        onChange={(e) => onEmailChange(e.target.value)}
        placeholder="Enter email"
        margin="normal"
        variant="outlined"
      />

      {/* Phone Section */}
      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: "bold", color: "#555" }}>
        Phone
      </Typography>
      <TextField
        fullWidth
        value={phone || ""}
        onChange={(e) => onPhoneChange(e.target.value)}
        placeholder="Enter phone"
        margin="normal"
        variant="outlined"
      />

      {/* Website Section */}
      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: "bold", color: "#555" }}>
        Website
      </Typography>
      <TextField
        fullWidth
        value={website || ""}
        onChange={(e) => onWebsiteChange(e.target.value)}
        placeholder="Enter website"
        margin="normal"
        variant="outlined"
      />

      {/* Management Section */}
      <Typography variant="h6" mt={3} gutterBottom sx={{ fontWeight: "bold", color: "#333" }}>
        Management
      </Typography>
      <Divider sx={{ mb: 2 }} />

      {management.map((manager, index) => (
        <Grid container spacing={2} alignItems="center" key={index} mb={2}>
          <Grid item xs={5}>
            <TextField
              fullWidth
              value={manager.name}
              onChange={(e) => handleEditManager(index, "name", e.target.value)}
              placeholder="Manager Name"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              fullWidth
              value={manager.position}
              onChange={(e) => handleEditManager(index, "position", e.target.value)}
              placeholder="Manager Position"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              variant="text"
              color="secondary"
              onClick={() => handleRemoveManager(index)}
            >
              Remove
            </Button>
          </Grid>
        </Grid>
      ))}

      {/* Add New Manager */}
      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: "bold", mt: 3 }}>
        Add New Manager
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={5}>
          <TextField
            fullWidth
            value={newManager.name}
            onChange={(e) => setNewManager((prev) => ({ ...prev, name: e.target.value }))}
            placeholder="New Manager Name"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={5}>
          <TextField
            fullWidth
            value={newManager.position}
            onChange={(e) => setNewManager((prev) => ({ ...prev, position: e.target.value }))}
            placeholder="New Manager Position"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddManager}
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EditableAddressAndManagement;
