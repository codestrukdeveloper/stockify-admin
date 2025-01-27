"use client";

import React, { useEffect, useState } from "react";
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
  TablePagination,
} from "@mui/material";
import Link from "next/link";
import { IconEdit, IconEye, IconSearch, IconTrash } from "@tabler/icons-react";
import CustomCheckbox from "@/app/components/forms/theme-elements/CustomCheckbox";
import Loading from "@/app/loading";
import ErrorMessage from "@/app/components/shared/ErrorMessage";
import { isServerError } from "@/app/(DashboardLayout)/action";
import { ISector } from "@/app/(DashboardLayout)/types/apps/sector";
import { useRouter } from "next/navigation";
import { deletePerformance, fetchPerformances } from "@/app/(DashboardLayout)/apps/performance/action";
import { IPerformance } from "@/app/(DashboardLayout)/types/apps/peformance";
import { IError } from "@/app/(DashboardLayout)/types/apps/error";
import { ServerErrorRender } from "@/app/components/shared/ServerErrorRender";

function PerformanceList({ performancesList: initialPerformances, totalPages, currentPage }: { performancesList: IPerformance[], currentPage: number, totalPages: number }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [pageNo, setPageNo] = useState(currentPage);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPages] = useState(totalPages);
  const [error, setError] = useState<IError>();


  const [performancesList, setPerformances] = useState<ISector[]>(initialPerformances || []);

  const [limit, setLimit] = useState(10);
  const [activeTab, setActiveTab] = useState("All");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);


  const fetchdhrpsWithPage = async (pageNo: number) => {
    setLoading(true);
    try {

      const data = await fetchPerformances(pageNo, limit);

      if (isServerError(data)) {
        return <div>
          <ErrorMessage error={data.error} />
        </div>
      }
      console.log("datadatadatadatadatadatadatadata", data);

      setPerformances(data.data);
      // setTotalPages(data.totalPage);
    } catch (error) {

    }
    finally {
      setLoading(false);
    }
  }



  const onSearch = async (search: string) => {

    setSearchTerm(search);

    const data = await fetchPerformances(1, 20, search);

    if (isServerError(data)) {
      setError(data.error);
      return
    }

    setPerformances(data.data);
    setTotalPages(data.totalPage);

  }

  const tabItems = ["All", "Shipped", "Delivered", "Pending"];
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleClick = (status: string) => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % tabItems.length);
    setActiveTab(status);
  };



  const toggleSelectAll = () => {
    const selectAllValue = !selectAll;
    setSelectAll(selectAllValue);
    if (selectAllValue) {
      setSelectedProducts(performancesList.map((performance: IPerformance) => performance._id!));
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

      const deleted = await deletePerformance(productId);
      if (isServerError(deleted)) {
        setError(deleted.error);
        setPerformances((prev) =>
          prev.filter((industry) => !selectedProducts.includes(industry._id!))
        );
        setSelectAll(false);
        setOpenDeleteDialog(false);
        onSearch("");
        return
      }


    }
    setSelectedProducts([]);
    setSelectAll(false);
    setOpenDeleteDialog(false);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleChangePage = async (event: unknown, newPage: number) => {
    console.log("pageNo", newPage, totalPages * limit);
    setPageNo(newPage + 1);
    await fetchdhrpsWithPage(newPage + 1)
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLimit(parseInt(event.target.value));
    setPageNo(1);
  };

  if (loading) {
    return <Loading />;
  }

  console.log("performancesList", performancesList);
  console.log("currentPage", currentPage);
  console.log("totalPage", currentPage);

  return (
    <Box>
      {
        error &&
        <ServerErrorRender error={error} toastMessage />
      }
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
          onChange={(e) => onSearch(e.target.value)}
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
            href="/apps/performance/create"
          >
            New Performance
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
            {performancesList && performancesList.length > 0 && performancesList.map((performance: IPerformance) => (
              <TableRow key={performance._id}>
                <TableCell padding="checkbox">
                  <CustomCheckbox
                    checked={selectedProducts.includes(performance._id!)}
                    onChange={() => toggleSelectProduct(performance._id!)}
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="h6" fontSize="14px">
                    {performance._id}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" fontSize="14px">
                    {performance.name}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Tooltip title="Edit Industry">
                    <IconButton
                      color="success"
                      component={Link}
                      href={`/apps/performance/edit/${performance._id}`}
                    >
                      <IconEdit width={22} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Industry">
                    <IconButton
                      color="error"
                      onClick={() => {
                        setSelectedProducts([performance._id!]);
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
        <TablePagination
          rowsPerPageOptions={[10]}
          component="div"
          count={totalPage * limit}
          rowsPerPage={limit}
          page={pageNo - 1}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete selected performancesList?
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleCloseDeleteDialog}>
            Cancel
          </Button>
          <Button color="error" variant="outlined" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default PerformanceList;