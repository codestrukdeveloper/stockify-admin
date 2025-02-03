'use client';
import React, { useEffect, useState } from 'react';
import {
    Container,
    Typography,
    Button,
    Tabs,
    Tab,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    IconButton,
    Grid,
    FormControl,
    Snackbar,
    Alert
} from '@mui/material';
import toast from 'react-hot-toast';
import DeleteIcon from '@mui/icons-material/Delete';
import Image from 'next/image';
import { IHome } from '@/app/(DashboardLayout)/types/apps/home';
import { CustomSelect } from './CustomSelect';
import { CustomSelectType } from './CustomSelectType';
import { isServerError } from '@/app/(DashboardLayout)/action';
import { createHome, fetchHome,deleteHome } from '@/app/(DashboardLayout)/apps/home/action';
import { HomeSchema } from '@/schema/home.dto';

// Enum for Home Sections
export enum HomeEnum {
    LISTED = "listed",
    UN_LISTED = "un_listed",
    IPO = "ipo"
}

interface CreateHomeClientProps {
    initialHome: IHome;
}

const CreateHomeClient: React.FC<CreateHomeClientProps> = ({ initialHome }) => {
    const [tabIndex, setTabIndex] = useState(0);
    const [search, setSearch] = useState('');
    const [ipoCompanies, setIpoCompanies] = useState<any[]>([]);
    const [listedCompanies, setListedCompanies] = useState<any[]>([]);
    const [unlistedCompanies, setUnlistedCompanies] = useState<any[]>([]);
    const [relatedStocks, setRelatedStocks] = useState<string[]>([]);
    const [type, setType] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

    const handleAddStock = (stock: string) => setRelatedStocks([stock]);
    const handleAddType = (type: string) => setType(type);
    const handleCloseSnackbar = () => setOpenSnackbar(false);

    const handleSubmit = async () => {
        const homeData = { name: type, companyId: relatedStocks } as unknown as IHome; // Create the data structure expected by HomeSchema
        const result = HomeSchema.safeParse(homeData);

        if (!result.success) {
            const newErrors: Record<string, string> = {};
            result.error.errors.forEach((error) => {
                newErrors[error.path[0]] = error.message;
            });

            setErrors(newErrors);
            setSnackbarMessage('Please fix the validation errors');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        } else {
            try {
                // API Call to create Home
                const response = await createHome(homeData);
                if (isServerError(response)) {
                    toast.error(response.error.message || 'An error occurred');
                } else {
                    // Reset errors and notify success
                    setErrors({});
                    toast.success('Home created successfully!');
                    setSnackbarMessage('Home created successfully!');
                    setSnackbarSeverity('success');
                    setOpenSnackbar(true);

                    // Fetch the latest home data after creating
                    fetchHomeData();
                    resetForm();
                }
            } catch (error) {
                setSnackbarMessage('An unexpected error occurred');
                setSnackbarSeverity('error');
                setOpenSnackbar(true);
            }
        }
    };

    const fetchHomeData = async () => {
        // Fetch updated home data and set it into state
        try {
            const homeListResponse = await fetchHome(); // Replace with actual API to fetch updated home data
            if (isServerError(homeListResponse)) {
                toast.error(homeListResponse.error.message || 'An error occurred');
            } else {
                console.log('homeListResponse',homeListResponse);
                const records: Array<{ _id: string; companies: any[] }> = homeListResponse.data.data;
                // Extract records for each HomeEnum section
                const ipoData = records.find((item) => item._id === HomeEnum.IPO)?.companies || [];
                const listedData = records.find((item) => item._id === HomeEnum.LISTED)?.companies || [];
                const unlistedData = records.find((item) => item._id === HomeEnum.UN_LISTED)?.companies || [];

                setIpoCompanies(ipoData);
                setListedCompanies(listedData);
                setUnlistedCompanies(unlistedData);
            }
        } catch (error) {
            toast.error('Failed to fetch updated home data.');
        }
    };
    const resetForm = () => {
        setRelatedStocks([]);
        setType('');
    };

    useEffect(() => {
        if (initialHome?.data && Array.isArray(initialHome.data)) {
            const ipoData = initialHome.data.find(item => item._id === HomeEnum.IPO)?.companies || [];
            const listedData = initialHome.data.find(item => item._id === HomeEnum.LISTED)?.companies || [];
            const unlistedData = initialHome.data.find(item => item._id === HomeEnum.UN_LISTED)?.companies || [];

            setIpoCompanies(Array.isArray(ipoData) ? ipoData : []);
            setListedCompanies(Array.isArray(listedData) ? listedData : []);
            setUnlistedCompanies(Array.isArray(unlistedData) ? unlistedData : []);
        }
    }, [initialHome]);

    const handleDelete = async(category: HomeEnum, id: string) => {
        // switch (category) {
        //     case HomeEnum.IPO:
        //         setIpoCompanies(prev => prev.filter((item) => item._id !== id));
        //         break;
        //     case HomeEnum.LISTED:
        //         setListedCompanies(prev => prev.filter((item) => item._id !== id));
        //         break;
        //     case HomeEnum.UN_LISTED:
        //         setUnlistedCompanies(prev => prev.filter((item) => item._id !== id));
        //         break;
        // }
        try {
            // API Call to create Home
            const response = await deleteHome(category,id);
            if (isServerError(response)) {
                toast.error(response.error.message || 'An error occurred');
            } else {
                // Reset errors and notify success
                setErrors({});
                toast.success('Home deleted successfully!');
                setSnackbarMessage('Home deleted successfully!');
                setSnackbarSeverity('success');
                setOpenSnackbar(true);
                // Fetch the latest home data after creating
                fetchHomeData();
            }
        } catch (error) {
            setSnackbarMessage('An unexpected error occurred');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        }
    };

    const filteredData = (category: HomeEnum) => {
        let companies: any[] = [];
        switch (category) {
            case HomeEnum.IPO:
                companies = ipoCompanies;
                break;
            case HomeEnum.LISTED:
                companies = listedCompanies;
                break;
            case HomeEnum.UN_LISTED:
                companies = unlistedCompanies;
                break;
        }
        return companies.filter((item) =>
            item.name && item.name.toLowerCase().includes(search.toLowerCase())
        );
    };

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" gutterBottom>
                Home
            </Typography>

            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <FormControl fullWidth>
                        <CustomSelectType
                            id="type.id"
                            name="Type"
                            value={type}
                            onChange={(value: any) => handleAddType(value)}
                            error={!!errors.type}
                            helperText={errors.type}
                        />
                    </FormControl>
                </Grid>

                <Grid item xs={12} md={4}>
                    <FormControl fullWidth>
                        <CustomSelect
                            id="company.id"
                            name="Company"
                            value={relatedStocks?.[0]}
                            onChange={(value: any) => handleAddStock(value)}
                            error={!!errors.relatedStocks}
                            helperText={errors.relatedStocks}
                        />
                    </FormControl>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
                        Add
                    </Button>
                </Grid>
            </Grid>

            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>

            <Box mt={4}>
                <Tabs value={tabIndex} onChange={(_, newIndex) => setTabIndex(newIndex)}>
                    <Tab label="IPO" />
                    <Tab label="Listed" />
                    <Tab label="Unlisted" />
                </Tabs>

                <Box mt={2}>
                    <TextField
                        fullWidth
                        label="Search"
                        variant="outlined"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </Box>

                <Box mt={2}>
                    {([HomeEnum.IPO, HomeEnum.LISTED, HomeEnum.UN_LISTED] as const).map((category, index) => (
                        tabIndex === index && (
                            <TableContainer component={Paper} key={category}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Logo</TableCell>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {filteredData(category).length > 0 ? (
                                            filteredData(category).map((item: any) => (
                                                <TableRow key={item._id}>
                                                    <TableCell>
                                                        <Box
                                                            sx={{
                                                                position: 'relative',
                                                                width: 50,
                                                                height: 50
                                                            }}
                                                        >
                                                            <Image
                                                                src={item.logo || '/default-logo.png'}
                                                                alt={item.name || 'Company Logo'}
                                                                fill
                                                                style={{
                                                                    objectFit: 'contain'
                                                                }}
                                                            />
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell>{item.name || 'N/A'}</TableCell>
                                                    <TableCell>
                                                        <IconButton color="error" onClick={() => handleDelete(category, item._id)}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={3} align="center">
                                                    No companies found
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )
                    ))}
                </Box>
            </Box>
        </Container>
    );
};

export default CreateHomeClient;
