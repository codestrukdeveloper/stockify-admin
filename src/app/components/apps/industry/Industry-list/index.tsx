"use client";

import React, { useContext, useEffect, useState } from "react";
import { IndustryContext } from "@/app/context/IndustryContext/index";
import {
  Table,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tooltip,
  IconButton,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Typography,
  Stack,
  InputAdornment,
} from "@mui/material";
import Link from "next/link";
import {
  IconEdit,
  IconEye,
  IconSearch,
  IconTrash,
} from "@tabler/icons-react";
import CustomCheckbox from "@/app/components/forms/theme-elements/CustomCheckbox";
import { useDispatch, useSelector } from "@/store/hooks";
import { deleteIndustry, fetchIndustry } from "@/store/apps/industry/IndustrySlice";
import { orderBy } from "lodash";
import { IndustryList as IndustryListType } from "@/app/(DashboardLayout)/types/apps/industry";

function IndustryList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIndustry());
  }, [dispatch]);

  const tabItem = ["All", "Shipped", "Delivered", "Pending"];
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleClick = (status: string) => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % tabItem.length);
    setActiveTab(status);
  };

  const getVisibleProduct = (
    industries: IndustryListType[],
    sortBy: string,
    search: string
  ): IndustryListType[] => {
    let filteredIndustries = industries;

    if (sortBy === "newest") {
      filteredIndustries = orderBy(filteredIndustries, ["created"], ["desc"]);
    } else if (sortBy === "priceAsc") {
      filteredIndustries = orderBy(filteredIndustries, ["price"], ["asc"]);
    }

    if (search !== "") {
      filteredIndustries = filteredIndustries.filter((industry) =>
        industry.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    return filteredIndustries;
  };

  const industries = useSelector((state: any) =>
    getVisibleProduct(
      state.industryReducer.industries,
      state.industryReducer.sortBy,
      searchTerm
    )
  );

  const toggleSelectAll = () => {
    const selectAllValue = !selectAll;
    setSelectAll(selectAllValue);
    if (selectAllValue) {
      setSelectedProducts(industries.map((industry: IndustryListType) => industry._id!));
    } else {
      setSelectedProducts([]);
    }
  };

  const toggleSelectProduct = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleDelete = () => {
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    for (const productId of selectedProducts) {
      // Assume deleteIndustry is an API call to delete an industry
      await deleteIndustry(productId);
    }
    setSelectedProducts([]);
    setSelectAll(false);
    setOpenDeleteDialog(false);
  };

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
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconSearch size={16} />
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
            href="/apps/industry/create"
          >
            New Industry
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
            {industries.map((industry: IndustryListType) => (
              <TableRow key={industry._id}>
                <TableCell padding="checkbox">
                  <CustomCheckbox
                    checked={selectedProducts.includes(industry._id!)}
                    onChange={() => toggleSelectProduct(industry._id!)}
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="h6" fontSize="14px">
                    {industry._id}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" fontSize="14px">
                    {industry.name}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Tooltip title="Edit Industry">
                    <IconButton
                      color="success"
                      component={Link}
                      href={`/apps/industry/edit/${industry.name}`}
                    >
                      <IconEdit width={22} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="View Industry">
                    <IconButton
                      color="primary"
                      component={Link}
                      href={`/apps/industry/detail/${industry.name}`}
                    >
                      <IconEye width={22} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Industry">
                    <IconButton
                      color="error"
                      onClick={() => {
                        setSelectedProducts([industry._id!]);
                        handleDelete();
                      }}
                    >
                      <IconTrash width={22} />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete selected industries?
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
    </Box>
  );
}

export default IndustryList;
