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
import { deleteSectors, fetchSectors } from "@/app/(DashboardLayout)/apps/sector/action";
import { isServerError } from "@/app/(DashboardLayout)/action";
import { ISector } from "@/app/(DashboardLayout)/types/apps/sector";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { IError } from "@/app/(DashboardLayout)/types/apps/error";
import { ServerErrorRender } from "@/app/components/shared/ServerErrorRender";

function SectorList({ sectors: initialsectors, totalPages, currentPage }: { sectors: ISector[], currentPage: number, totalPages: number }) {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const [pageNo, setPageNo] = useState(currentPage);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPages] = useState(totalPages);
  const [error, setError] = useState<IError | null>();

  const [sectors, setSectors] = useState<ISector[]>(initialsectors || []);

  const [limit, setLimit] = useState(10);

  const [activeTab, setActiveTab] = useState("All");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);


  const fetchSectorsWithPage = async (pageNo: number) => {
    setLoading(true);
    try {

      const data = await fetchSectors(pageNo, limit);

      if (isServerError(data)) {

        setError(data.error);
        return
      }
      setSectors(data.data);
      // setTotalPages(data.totalPage);
    } catch (error) {

    }
    finally {
      setLoading(false);
    }
  }



  const onSearch = async (search: string) => {

    setSearchTerm(search);

    const data = await fetchSectors(1, 20, search);

    if (isServerError(data)) {
      setError(data.error);
      return
    }

    setSectors(data.data);
    setTotalPages(data.totalPage);

  }

  const tabItems = ["All", "Shipped", "Delivered", "Pending"];
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleClick = (status: string) => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % tabItems.length);
    setActiveTab(status);
  };


  useEffect(() => {
    fetchSectorsWithPage(0);
  }, [])

  const toggleSelectAll = () => {
    const selectAllValue = !selectAll;
    setSelectAll(selectAllValue);
    if (selectAllValue) {
      setSelectedProducts(sectors.map((sector: ISector) => sector._id!));
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

      const deleted = await deleteSectors(productId);
      if (isServerError(deleted)) {
        setError(deleted.error);
        setSelectedProducts([]);
        setSelectAll(false);
        setOpenDeleteDialog(false);
        return
      }


    }

    setSectors((prev) =>
      prev.filter((deposit) => !selectedProducts.includes(deposit._id!))
    );
    setSelectedProducts([]);
    toast.success("deleted successfully")
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
    await fetchSectorsWithPage(newPage + 1)
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLimit(parseInt(event.target.value));
    setPageNo(1);
  };

  if (loading) {
    return <Loading />;
  }

  console.log("sectors", sectors);
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
            href="/apps/sector/create"
          >
            New Sector
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
            {sectors.map((sector: ISector) => (
              <TableRow key={sector._id}>
                <TableCell padding="checkbox">
                  <CustomCheckbox
                    checked={selectedProducts.includes(sector._id!)}
                    onChange={() => toggleSelectProduct(sector._id!)}
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="h6" fontSize="14px">
                    {sector._id}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" fontSize="14px">
                    {sector.name}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Tooltip title="Edit sector">
                    <IconButton
                      color="success"
                      component={Link}
                      href={`/apps/sector/edit/${sector._id}`}
                    >
                      <IconEdit width={22} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete sector">
                    <IconButton
                      color="error"
                      onClick={() => {
                        setSelectedProducts([sector._id!]);
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
          Are you sure you want to delete selected sectors?
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

export default SectorList;