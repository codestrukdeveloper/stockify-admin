import React, { useState } from "react";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
import * as XLSX from "xlsx";
import { ICompanyFull } from "@/app/(DashboardLayout)/types/apps/ICompany";
import { IProfitLosses } from "@/app/(DashboardLayout)/types/apps/IProfitLoss";
import { IBalanceSheet } from "@/app/(DashboardLayout)/types/apps/IBalanceSheet";
import { ICashflowSum } from "@/app/(DashboardLayout)/types/apps/ICashflowSum";
import { IKeyIndicators } from "@/app/(DashboardLayout)/types/apps/IKeyIndicators";
import toast from "react-hot-toast";

interface DataExcelUploaderProps {
    onUpload: (data: Partial<ICompanyFull>) => void;
    oldData: Partial<ICompanyFull>
}

export const CompanyOtherUploadData: React.FC<DataExcelUploaderProps> = ({ onUpload, oldData }) => {
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
            onUpload(processedData);
        } catch (err) {
            setError("Failed to process the file. Please check the format.");
            toast.error("Error processing file");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const processExcelData = (data: any[][], oldData: Partial<ICompanyFull>): Partial<ICompanyFull> => {
        const result: Partial<ICompanyFull> = {
            profitLoss: oldData.profitLoss || [],
            balanceSheet: oldData.balanceSheet || [],
            cashFlow: oldData.cashFlow || [],
            keyIndicators: oldData.keyIndicators || [],
            priceTrend: oldData.priceTrend || []
        };

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

            if (isPercentage) {
                if (typeof value === 'string' && value.includes('%')) {
                    return value;
                }

                if (typeof value === 'number') {
                    return `${(value * 100).toFixed(1)}%`;
                }
            }

            if (isFloat && typeof value === 'number') {
                return value.toFixed(2);
            }

            return value.toString();
        };


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
        <Box sx={{ mt: 3, my: 3 }} display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"}>
            <Typography variant="h6" gutterBottom>
                Upload Excel File For Other Data ex:profitloss,keyIndicators...
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

