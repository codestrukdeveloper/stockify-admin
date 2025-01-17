"use client";
import React, { useContext, useState } from "react";
import { CategoryContext } from "@/app/context/CategoryContext/index";
import {
  Table,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Badge,
  Tooltip,
  IconButton,
  Tabs,
  Tab,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Typography,
  Grid,
  Stack,
  InputAdornment,
  Chip,
} from "@mui/material";
import Link from "next/link";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  IconEdit,
  IconEye,
  IconListDetails,
  IconSearch,
  IconShoppingBag,
  IconSortAscending,
  IconTrash,
  IconTruck,
} from "@tabler/icons-react";
import CustomCheckbox from "@/app/components/forms/theme-elements/CustomCheckbox";

function CategoryList() {
  const { categories, deleteCategory } = useContext(CategoryContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [selectedProducts, setSelectedProducts] = useState<any>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const tabItem = ["All", "Shipped", "Delivered", "Pending"];
  const [currentIndex, setCurrentIndex] = useState(0);


  // Handle status filter change
  const handleClick = (status: string) => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % tabItem.length);
    setActiveTab(status);
  };



  // Filter categories based on search term
  const filteredCategories = categories.filter(
    (category: { name: string; }) => {
      return (
        (category.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (activeTab === "All")
      );
    }
  );



  // Calculate the counts for different statuses
  const Shipped = categories.filter(
    (t: { status: string }) => t.status === "Shipped"
  ).length;
  const Delivered = categories.filter(
    (t: { status: string }) => t.status === "Delivered"
  ).length;
  const Pending = categories.filter(
    (t: { status: string }) => t.status === "Pending"
  ).length;

  // Toggle all checkboxes
  const toggleSelectAll = () => {
    const selectAllValue = !selectAll;
    setSelectAll(selectAllValue);
    if (selectAllValue) {
      setSelectedProducts(categories.map((category: { id: any }) => category.id));
    } else {
      setSelectedProducts([]);
    }
  };

  // Toggle individual product selection
  const toggleSelectProduct = (productId: any) => {
    const index = selectedProducts.indexOf(productId);
    if (index === -1) {
      setSelectedProducts([...selectedProducts, productId]);
    } else {
      setSelectedProducts(
        selectedProducts.filter((id: any) => id !== productId)
      );
    }
  };

  // Handle opening delete confirmation dialog
  const handleDelete = () => {
    setOpenDeleteDialog(true);
  };

  // Handle confirming deletion of selected products
  const handleConfirmDelete = async () => {
    for (const productId of selectedProducts) {
      await deleteCategory(productId);
    }
    setSelectedProducts([]);
    setSelectAll(false);
    setOpenDeleteDialog(false);
  };

  // Handle closing delete confirmation dialog
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  return (
    <Box>
    
      <Stack
        mt={3}
        justifyContent="space-between"
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
      >
        <TextField
          id="search"
          type="text"
          size="small"
          variant="outlined"
          placeholder="Search"
          value={searchTerm}
          onChange={(e: any) => setSearchTerm(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconSearch size={"16"} />
              </InputAdornment>
            ),
          }}
        />
        <Box display="flex" gap={1}>
          {selectAll && (
            <Button
              variant="outlined"
              color="error"
              onClick={handleDelete}
              startIcon={<IconTrash width={18} />}
            >
              Delete All
            </Button>
          )}
          <Button
            variant="contained"
            color="primary"
            component={Link}
            href="/apps/category/create"
          >
            New Category
          </Button>
        </Box>
      </Stack>

      <Box sx={{ overflowX: "auto" }}>
        <Table sx={{ whiteSpace: { xs: "nowrap", md: "unset" } }}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <CustomCheckbox
                  checked={selectAll}
                  onChange={toggleSelectAll}
                />
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontSize="14px">
                  Id
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontSize="14px">
                  Name
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6" fontSize="14px">
                  Action
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCategories.map(
              (category: {
                id: any;
                name: any;
              }) => (
                <TableRow key={category.id}>
                  <TableCell padding="checkbox">
                    <CustomCheckbox
                      checked={selectedProducts.includes(category.id)}
                      onChange={() => toggleSelectProduct(category.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontSize="14px">
                      {category.id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontSize="14px">
                      {category.name}
                    </Typography>
                  </TableCell>
               
                  <TableCell align="center">
                    <Tooltip title="Edit Category">
                      <IconButton
                        color="success"
                        component={Link}
                        href={`/apps/category/edit/${category.name}`}
                      >
                        <IconEdit width={22} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="View Category">
                      <IconButton
                        color="primary"
                        component={Link}
                        href={`/apps/category/detail/${category.name}`}
                      >
                        <IconEye width={22} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Category">
                      <IconButton
                        color="error"
                        onClick={() => {
                          setSelectedProducts([category.id]);
                          handleDelete();
                        }}
                      >
                        <IconTrash width={22} />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </Box>
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete selected categories?
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleCloseDeleteDialog}>
            Cancel
          </Button>
          <Button
            color="error"
            variant="outlined"
            onClick={handleConfirmDelete}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box >
  );
}
export default CategoryList;
