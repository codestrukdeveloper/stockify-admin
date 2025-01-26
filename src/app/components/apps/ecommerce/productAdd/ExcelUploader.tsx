import React, { useState } from "react";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
import * as XLSX from "xlsx";
import { ICompany, ICompanyFull } from "@/app/(DashboardLayout)/types/apps/ICompany";
import { IProfitLosses } from "@/app/(DashboardLayout)/types/apps/IProfitLoss";
import { IBalanceSheet } from "@/app/(DashboardLayout)/types/apps/IBalanceSheet";
import { ICashflowSum } from "@/app/(DashboardLayout)/types/apps/ICashflowSum";
import { IKeyIndicators } from "@/app/(DashboardLayout)/types/apps/IKeyIndicators";

interface ExcelUploaderProps {
    onUpload: (data: Partial<ICompanyFull>) => void;
    oldData: Partial<ICompanyFull>
}

const ExcelUploader: React.FC<ExcelUploaderProps> = ({ onUpload, oldData }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setLoading(true);
        setError(null);

        try {
            const data = await file.arrayBuffer();
            const workbook = XLSX.read(data);
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, {
                header: 1,
                defval: "",
            });

            // Process the Excel data
            const processedData = processExcelData(jsonData as unknown as any[][], oldData);
            onUpload(processedData); // Pass the processed data to the parent component
        } catch (err) {
            setError("Failed to process the file. Please check the format.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const processExcelData = (data: any[][], oldData: Partial<ICompanyFull>): Partial<ICompanyFull> => {
        const result: Partial<ICompanyFull> = {
            company: oldData.company,
            profitLoss: [],
            balanceSheet: [],
            cashFlow: [],
            keyIndicators: [],
        };

        // Helper function to find rows by their header
        const findRow = (header: string) => data.find((row) => row[0]?.toString().trim() === header.trim());

        const getValue = (header: string, index: number, defaultValue: string = "0", isPercentage: boolean = false, isFloat: boolean = false) => {
            const row = findRow(header);
            if (!row) {
                console.warn(`Header "${header}" not found in Excel file. Using default value: ${defaultValue}`);
                return defaultValue;
            }

            const value = row[index + 1];

            // Handle special cases
            if (value === '#DIV/0!' || value === undefined || value === null) {
                return defaultValue;
            }

            // For percentage columns, convert to string with % sign
            if (isPercentage) {
                // If value is already a percentage string, return as is
                if (typeof value === 'string' && value.includes('%')) {
                    return value;
                }

                // Convert decimal to percentage string
                if (typeof value === 'number') {
                    return `${(value * 100).toFixed(1)}%`;
                }
            }

            // Handle float conversion for specific columns
            if (isFloat && typeof value === 'number') {
                return value.toFixed(2);
            }

            // For other numeric values, convert to string
            return value.toString();
        };

        // Company Data
        const companyData: ICompany = {
            ...oldData.company,
            name: getValue("company name", 0, oldData.company?.name || ""),
            ticker: getValue("Ticker", 0, oldData.company?.ticker || ""),
            rating: parseFloat(getValue("Ratings", 0, oldData.company?.rating?.toString() || "0")),
            isin: getValue("ISIN", 0, oldData.company?.isin || ""),
            pan: getValue("PAN", 0, oldData.company?.pan || ""),
            location: getValue("Address", 0, oldData.company?.location || ""),
            email: getValue("Co. email", 0, oldData.company?.email || ""),
            phone: getValue("Co. mobile number", 0, oldData.company?.phone || ""),
            website: getValue("Co. website link", 0, oldData.company?.website || ""),
            videoLink: getValue("company profile video link", 0, oldData.company?.videoLink || ""),
            aboutus: getValue("About the company - content", 0, oldData.company?.aboutus || ""),
        } as ICompany;
        result.company = companyData;

        // Profit & Loss
        const profitLossHeader = findRow("PROFIT & LOSS");
        if (profitLossHeader) {
            const years = profitLossHeader.slice(1);

            const profitLossData: IProfitLosses[] = years.map((year, index) => ({
                period: year.toString(),
                revenue: getValue("REVENUE", index),
                expense: getValue("EXPENSE", index),
                ebdita: getValue("EBDITA", index),
                otherCost: getValue("OTHER COST", index),
                pbt: getValue("PBT", index),
                taxExpense: getValue("TAX EXPENSE", index),
                pat: getValue("PAT", index),
                otherIncExpense: getValue("OTHER INCOME/EXP.", index),
                incomeNet: getValue("INCOME (NET OF TAXES)", index),
                outstandingShare: getValue("OUTSTANDING SHARE", index, "0", false, true),
                epsPerShare: getValue("EPS ( Rs/share)", index, "0", false, true),
                revGrowth: getValue("REVENUE GROWTH %", index, "0%", true),
                ebitaMargin: getValue("EBIDTA MARGIN %", index, "0%", true),
                patMargin: getValue("NET MARGIN %", index, "0%", true),
                epsGrowth: getValue("EPS GROWTH %", index, "0%", true),
            }));

            result.profitLoss = profitLossData;
        }

        // Balance Sheet
        const balanceSheetHeader = findRow("BALANCE SHEET");
        if (balanceSheetHeader) {
            const years = balanceSheetHeader.slice(1);

            const balanceSheetData: IBalanceSheet[] = years.map((year, index) => ({
                period: year.toString(),
                cashEqlt: getValue("CASH & CASH EQUIVALENT", index),
                nonCurrentAsset: getValue("NON CURRENT ASSET", index),
                currentAsset: getValue("CURRENT ASSET", index),
                totalAsset: getValue("TOTAL ASSET", index),
                eqShareCap: getValue("EQUITY SHARE CAPITAL", index),
                reserves: getValue("RESERVES", index),
                totalEq: getValue("TOTAL EQUITY", index),
                nonCurrentLiability: getValue("NON CURRENT LIABILITY", index),
                currentLiability: getValue("CURRENT LIABILITY", index),
                totalLiability: getValue("TOTAL LIABILITIES", index),
                totalEqLiability: getValue("TOTAL EQUITY & LIABILITY", index),
            }));

            result.balanceSheet = balanceSheetData;
        }

        // Cash Flow
        const cashFlowHeader = findRow("CASH FLOW");
        if (cashFlowHeader) {
            const years = cashFlowHeader.slice(1);

            const cashFlowData: ICashflowSum[] = years.map((year, index) => ({
                period: year.toString(),
                operatingAct: getValue("OPERATING ACTIVITY", index),
                investingAct: getValue("INVESTING ACTIVITY", index),
                financialAct: getValue("FINANCING ACTIVITY", index),
                netCashFlow: getValue("NET CASH FLOW", index),
            }));

            result.cashFlow = cashFlowData;
        }

        // Key Indicators
        const keyIndicatorHeader = findRow("KEY INDICATOR");
        if (keyIndicatorHeader) {
            const year = keyIndicatorHeader[1];

            const keyIndicatorsData: IKeyIndicators[] = [
                {
                    period: year.toString(),
                    currentSharePrice: getValue("CURRENT SHARE PRICE", 0, "0", false, true),
                    faceValuePerShare: getValue("FACE VALUE/SHARE ", 0, "0", false, true),
                    bookValuePerShare: getValue("BOOK VALUE/SHARE ", 0, "0", false, true),
                    priceToEarning: getValue("PRICE TO EARNING (PE)", 0, "0", false, true),
                    priceToSales: getValue("PRICE/SALES ", 0, "0", false, true),
                    priceToBook: getValue("PRICE/BOOK", 0, "0", false, true),
                    outstandingSharesMillion: getValue("OUTSTANDING SHARES (Million)", 0, "0", false, true),
                    marketCapMillionRs: getValue("MARKET CAP (Rs. Million)", 0),
                    debtToEquity: getValue("DEBT/EQUITY", 0, "0", false, true),
                    dividendPerShare: getValue("DIVIDEND/SHARE ", 0, "0"),
                    dividendPercentOnCMP: getValue("DIVIDEND % (ON CMP)", 0, "0%", true),
                    returnOnTotalAssets: getValue("RETURN ON TOTAL ASSETS", 0, "0%", true),
                    returnOnEquity: getValue("RETURN ON EQUITY", 0, "0%", true),
                    rowc: getValue("ROWC", 0, "0%", true),
                },
            ];

            result.keyIndicators = keyIndicatorsData;
        }

        return result;
    };

    return (
        <Box sx={{ mt: 3,my: 3 }} display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"}>
            <Typography variant="h6" gutterBottom>
                Upload Excel File
            </Typography>
            <input
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileUpload}
                disabled={loading}
                style={{ display: "none" }}
                id="excel-upload"
            />
            <label htmlFor="excel-upload">
                <Button variant="contained" component="span" disabled={loading}>
                    {loading ? <CircularProgress size={24} /> : "Upload"}
                </Button>
            </label>
            {error && (
                <Typography color="error" sx={{ mt: 2 }}>
                    {error}
                </Typography>
            )}
        </Box>
    );
};

export default ExcelUploader;