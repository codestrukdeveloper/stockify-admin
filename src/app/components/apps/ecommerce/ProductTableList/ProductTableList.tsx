'use client'
import * as React from 'react';
import { alpha, useTheme } from '@mui/material/styles';
import { format } from 'date-fns';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { visuallyHidden } from '@mui/utils';
import { useSelector, useDispatch } from '@/store/hooks';
import CustomCheckbox from '../../../forms/theme-elements/CustomCheckbox';
import CustomSwitch from '../../../forms/theme-elements/CustomSwitch';
import { IconDotsVertical, IconFilter, IconSearch, IconTrash } from '@tabler/icons-react';
import { ProductType } from '../../../../(DashboardLayout)/types/apps/eCommerce';
import { RootState } from '@/store/store';
import { ICompany } from '@/app/(DashboardLayout)/types/apps/ICompany';
import { fetchCompanys, searchCompanies } from '@/utils/api/company-action';
import { useRouter, useSearchParams } from 'next/navigation';
import { getDaysAgo } from '@/utils/utils';
import { deleteCompanyById } from '@/app/(DashboardLayout)/apps/company/action';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }

  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  console.log("array", array);
  const stabilizedThis = array?.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }

    return a[1] - b[1];
  });

  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: string;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Companies',
  },
  {
    id: 'ticker',
    numeric: false,
    disablePadding: false,
    label: 'Ticker',
  },
  {
    id: 'lastUpdated',
    numeric: false,
    disablePadding: false,
    label: 'Last Updated',
  },
  {
    id: 'action',
    numeric: false,
    disablePadding: false,
    label: 'Action',
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: any) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property: any) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <CustomCheckbox
            color="primary"
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
  handleSearch: React.ChangeEvent<HTMLInputElement> | any;
  search: string;
  onDeleteSuccess: () => void
}

const EnhancedTableToolbar = async(props: EnhancedTableToolbarProps) => {
  const { numSelected, handleSearch, search } = props;

  const onDelete = async () => {
    if (numSelected > 0) {
      try {
   
        props.onDeleteSuccess();
      } catch (error) {
        console.error('Error deleting companies:', error);
      }
    }
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle2" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Box sx={{ flex: '1 1 100%' }}>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconSearch size="1.1rem" />
                </InputAdornment>
              ),
            }}
            placeholder="Search Product"
            size="small"
            onChange={handleSearch}
            value={search}
          />
        </Box>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={onDelete}> {/* Add onClick handler */}
            <IconTrash width="18" />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <IconFilter size="1.2rem" />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

interface Props {
  initialCompanies: ICompany[];
  initialPage: number;
  initialSearch: string;
}

interface Props {
  initialCompanies: ICompany[];
  initialPage: number;
  initialSearch: string;
}

export default function ProductTableList({ initialCompanies, initialPage, initialSearch }: Props) {
  const [companies, setCompanies] = React.useState<ICompany[]>(initialCompanies);
  const [search, setSearch] = React.useState(initialSearch);
  const [page, setPage] = React.useState(initialPage);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);
  const { companies: searchedCompanies } = useSelector((state: RootState) => state.companyReducer);


  const dispatch = useDispatch();

  // Fetch Products
  React.useEffect(() => {
    dispatch(searchCompanies(page, rowsPerPage, search));
  }, [search]);

  React.useEffect(() => {
    if (searchedCompanies && searchCompanies.length > 0) {
      setCompanies(searchedCompanies)
    }
  }, [searchedCompanies])

  const { } = useSelector((state: RootState) => state.companyReducer);

  const [rows, setRows] = React.useState<any>(fetchCompanys);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };


  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n: any) => n._id); // Use _id instead of name
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };


  const handleChangePage = (event: unknown, newPage: number) => {
    router.push(`/apps/company/list?page=${newPage}&&limit=${rowsPerPage}`);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const theme = useTheme();
  const borderColor = theme.palette.divider;

  // Handle Edit Action
  const handleEdit = (id: string) => {
    router.push(`/apps/company/edit-company/${id}`);
  };

  console.log("selected",selected)
  const handleDeleteSuccess = async () => {
    setCompanies((prevCompanies) => {
      return prevCompanies.filter((company) => !selected.includes(company._id!));
    });
    // console.log("selected", selectedIds)
    // await Promise.all(selectedIds.map((id: string) => deleteCompanyById(id)));
    setSelected([]);
    dispatch(searchCompanies(1, 20, ""));

  };
  console.log("companies", companies)

  return (
    <Box>
      <Box>
        <EnhancedTableToolbar
          onDeleteSuccess={handleDeleteSuccess}
          numSelected={selected.length}
          search={search}
          handleSearch={(event: any) => handleSearch(event)}
        />
        <Paper variant="outlined" sx={{ mx: 2, mt: 1, border: `1px solid ${borderColor}` }}>
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tablename"
              size={dense ? 'small' : 'medium'}
            >

              <TableBody>
                {Array.isArray(companies) && companies?.map((row: ICompany, index) => {
                  const isItemSelected = isSelected(row._id!);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row._id!)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row._id} // Use _id as the key
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <CustomCheckbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>

                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <Avatar src={row.logo} alt="product" sx={{ width: 56, height: 56 }} />
                          <Box sx={{ ml: 2 }}>
                            <Typography variant="h6" fontWeight="600">
                              {row.name}
                            </Typography>
                            <Typography color="textSecondary" variant="subtitle1">
                              {row.name}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography>{row?.ticker}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography fontWeight={600} variant="h6">
                          {row.updatedAt && getDaysAgo(row.updatedAt)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Tooltip title="Edit">
                          <IconButton size="small" onClick={() => handleEdit(row._id!)}>
                            <IconDotsVertical size="1.1rem" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <Box ml={2}>
          <FormControlLabel
            control={<CustomSwitch checked={dense} onChange={handleChangeDense} />}
            label="Dense padding"
          />
        </Box>
      </Box>
    </Box>
  );
}
