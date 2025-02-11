// Interfaces.ts
import React, { useState } from "react";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
import * as XLSX from "xlsx";
import toast from "react-hot-toast";
import { ICompany, ICompanyFull, IFaq, IFinancialResults } from "@/app/(DashboardLayout)/types/apps/ICompany";
import { IProfitLosses } from "@/app/(DashboardLayout)/types/apps/IProfitLoss";
import { IBalanceSheet } from "@/app/(DashboardLayout)/types/apps/IBalanceSheet";
import { ICashflowSum } from "@/app/(DashboardLayout)/types/apps/ICashflowSum";
import { IKeyIndicators } from "@/app/(DashboardLayout)/types/apps/IKeyIndicators";
import { IPriceTrend } from "@/app/(DashboardLayout)/types/apps/IPricingTrend.interface";
import { IShareholder } from "@/app/(DashboardLayout)/types/apps/IShareholder";
import { IManagement } from "@/app/(DashboardLayout)/types/apps/IManagement";


export type FILE_FOR = "company_details" | "pricing_trend" | "profit_loss" | "key_indicators" | "share_holder" | "cash_Flow" | "balanceSheet";



interface ExcelUploaderProps {
    onUpload: (data: Partial<ICompanyFull>) => void;
    oldData: Partial<ICompanyFull>;
    fileFor: FILE_FOR;
}

const ExcelUploader: React.FC<ExcelUploaderProps> = ({ onUpload, oldData, fileFor }) => {
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

            const processedData = processExcelData(jsonData as any[][], oldData);
            onUpload(processedData);
        } catch (err) {
            setError("Failed to process the file. Please check the format.");
            console.error(err);
            toast.error("Error processing file");
        } finally {
            setLoading(false);
        }
    };

    const getValue = (data: any[][], header: string, index: number, defaultValue: string = "0", isPercentage: boolean = false, isFloat: boolean = false) => {

        // // console.log("FILE_FOR",fileFor);

        // if (fileFor === "company_details") {
        //     const row = data[0].find((row) => row?.toString().trim().toLowerCase() === header.trim().toLowerCase());
        //     console.log("DATA", data[0]);

        //     console.log("DATA_ROW", index, row);
        //     console.log("HEADER", index, header);
        //     // console.log("DATA",index,data.find((row:string)=>row[0]?.toString().trim()));

        //     console.log("ROW", row, index);

        //     if (!row) {
        //         console.warn(`Header "${header}" not found. Using default: ${defaultValue}`);
        //         return defaultValue;
        //     }

        //     const value = data[1][index + 1];
        //     console.log("value", value, data[1][index + 1]);

        //     if (value === '#DIV/0!' || value === undefined || value === null) {
        //         return defaultValue;
        //     }

        //     if (isPercentage) {
        //         if (typeof value === 'string' && value.includes('%')) {
        //             return value;
        //         }
        //         if (typeof value === 'number') {
        //             return `${(value * 100).toFixed(1)}%`;
        //         }
        //     }

        //     if (isFloat && typeof value === 'number') {
        //         return value.toFixed(2);
        //     }

        //     return value.toString();

        // }
        // else {
        const row = data.find((row) => row[0]?.toString().trim().toLowerCase() === header.trim().toLowerCase());
        // console.log("DATA", index, data);
        // console.log("HEADER", index, header);
        // console.log("DATA",index,data.find((row:string)=>row[0]?.toString().trim()));

        // console.log("ROW", row, index);

        if (!row) {
            console.warn(`Header "${header}" not found. Using default: ${defaultValue}`);
            return defaultValue;
        }

        const value = row[index + 1];
        console.log("value", value);
        console.log("row", row);


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



    const processProfitLoss = (data: any[][]): IProfitLosses[] => {
        const profitLossHeader = data.find(row => row[0]?.toString().trim() === "PROFIT & LOSS");
        if (!profitLossHeader) return [];

        const years = profitLossHeader.slice(1).filter(Boolean);
        return years.map((year, index) => ({
            period: year.toString(),
            revenue: getValue(data, "REVENUE", index),
            expense: getValue(data, "EXPENSE", index),
            ebdita: getValue(data, "EBDITA", index),
            otherCost: getValue(data, "OTHER COST", index),
            pbt: getValue(data, "PBT", index),
            taxExpense: getValue(data, "TAX EXPENSE", index),
            pat: getValue(data, "PAT", index),
            otherIncExpense: getValue(data, "OTHER INCOME/EXP.", index),
            incomeNet: getValue(data, "INCOME (NET OF TAXES)", index),
            outstandingShare: getValue(data, "OUTSTANDING SHARE", index, "0", false, true),
            epsPerShare: getValue(data, "EPS ( Rs/share)", index, "0", false, true),
            revGrowth: getValue(data, "REVENUE GROWTH %", index, "0%", true),
            ebitaMargin: getValue(data, "EBIDTA MARGIN %", index, "0%", true),
            patMargin: getValue(data, "NET MARGIN %", index, "0%", true),
            epsGrowth: getValue(data, "EPS GROWTH %", index, "0%", true)
        }));
    };

    const processBalanceSheet = (data: any[][]): IBalanceSheet[] => {
        const balanceSheetHeader = data.find(row => row[0]?.toString().trim() === "BALANCE SHEET");
        if (!balanceSheetHeader) return [];

        const years = balanceSheetHeader.slice(1).filter(Boolean);
        return years.map((year, index) => ({
            period: year.toString(),
            cashEqlt: getValue(data, "CASH & CASH EQUIVALENT", index),
            nonCurrentAsset: getValue(data, "NON CURRENT ASSET", index),
            currentAsset: getValue(data, "CURRENT ASSET", index),
            totalAsset: getValue(data, "TOTAL ASSET", index),
            eqShareCap: getValue(data, "EQUITY SHARE CAPITAL", index),
            reserves: getValue(data, "RESERVES", index),
            totalEq: getValue(data, "TOTAL EQUITY", index),
            nonCurrentLiability: getValue(data, "NON CURRENT LIABILITY", index),
            currentLiability: getValue(data, "CURRENT LIABILITY", index),
            totalLiability: getValue(data, "TOTAL LIABILITIES", index),
            totalEqLiability: getValue(data, "TOTAL EQUITY & LIABILITY", index)
        }));
    };

    const processCashFlow = (data: any[][]): ICashflowSum[] => {
        const cashFlowHeader = data.find(row => row[0]?.toString().trim() === "CASH FLOW");
        if (!cashFlowHeader) return [];

        const years = cashFlowHeader.slice(1).filter(Boolean);
        return years.map((year, index) => ({
            period: year.toString(),
            operatingAct: getValue(data, "OPERATING ACTIVITY", index),
            investingAct: getValue(data, "INVESTING ACTIVITY", index),
            financialAct: getValue(data, "FINANCING ACTIVITY", index),
            netCashFlow: getValue(data, "NET CASH FLOW", index)
        }));
    };

    const processKeyIndicators = (data: any[][]): IKeyIndicators[] => {
        const keyIndicatorHeader = data.find(row => row[0]?.toString().trim() === "KEY INDICATOR");
        if (!keyIndicatorHeader) return [];

        const years = keyIndicatorHeader.slice(1).filter(Boolean);
        return years.map((year, index) => ({
            period: year.toString(),
            currentSharePrice: getValue(data, "CURRENT SHARE PRICE", index, "0", false, true),
            faceValuePerShare: getValue(data, "FACE VALUE/SHARE", index, "0", false, true),
            bookValuePerShare: getValue(data, "BOOK VALUE/SHARE", index, "0", false, true),
            priceToEarning: getValue(data, "PRICE TO EARNING (PE)", index, "0", false, true),
            priceToSales: getValue(data, "PRICE/SALES", index, "0", false, true),
            priceToBook: getValue(data, "PRICE/BOOK", index, "0", false, true),
            outstandingSharesMillion: getValue(data, "OUTSTANDING SHARES (Million)", index, "0", false, true),
            marketCapMillionRs: getValue(data, "MARKET CAP (Rs. Million)", index),
            debtToEquity: getValue(data, "DEBT/EQUITY", index, "0", false, true),
            dividendPerShare: getValue(data, "DIVIDEND/SHARE", index, "0"),
            dividendPercentOnCMP: getValue(data, "DIVIDEND % (ON CMP)", index, "0%", true),
            returnOnTotalAssets: getValue(data, "RETURN ON TOTAL ASSETS", index, "0%", true),
            returnOnEquity: getValue(data, "RETURN ON EQUITY", index, "0%", true),
            rowc: getValue(data, "ROWC", index, "0%", true)
        }));
    };

    const processPriceTrend = (data: any[][]): IPriceTrend[] => {
        const priceTrendHeader = data.find(row => row[0]?.toString().trim() === "PRICE TREND");
        if (!priceTrendHeader) return [];

        const dates = priceTrendHeader.slice(1).filter(Boolean);
        return dates.map((date, index) => ({
            date: date.toString(),
            price: parseFloat(getValue(data, "PRICE", index, "0")),
            volume: parseFloat(getValue(data, "VOLUME", index, "0"))
        }));
    };

    const extractCompanyData = (data: any[][]): Partial<ICompany> => {
        const headers = data[0]; // Extract headers (first row)
        const values = data[1]; // Extract values (second row)

        const getValue = (field: string): any => {
            const index = headers.indexOf(field);
            return index !== -1 ? values[index] : undefined;
        };

        return {
            name: getValue("Title"),
            ticker: getValue("Slug"),
            isin: getValue("isin"),
            metaTitle: getValue("Title"),
            metaDescription: getValue("about"),
            keywords: getValue("Category") ? getValue("Category").split(",") : [],
            pan: getValue("pan"),
            location: getValue("location"),
            rating: getValue("rating") ? Number(getValue("rating")) : undefined,
            price: getValue("price") ? Number(getValue("price")) : undefined,
            email: getValue("email"),
            phone: getValue("phone"),
            website: getValue("website"),
            videoLink: getValue("company-profile-video"),
            aboutus: getValue("about"),
            categoryId: getValue("Category"),
            ipoPrice: getValue("price"),
            ipoDate: getValue("Date"),
            preIpoDate: getValue("period"),
            industryId: getValue("Industry"),
            sectorId: getValue("Market"),
            dhrpId: getValue("dhrp_doc"),
            performanceId: getValue("profit-and-loss"),
            slug: getValue("Slug"),
            logo: getValue("Image URL") ? getValue("Image URL").split("|")[0] : undefined, // Get first image URL
            status: true,
        };
    };

    const extractShareholders = (data: any[][]): IShareholder[] => {
        const shareholders: IShareholder[] = [];
        const headers = data[0]; // Column headers (first row)
        const values = data[1]; // Corresponding values (second row)
        const currentYear = new Date().getFullYear().toString();

        for (let i = 0; i < headers.length; i++) {
            const header = headers[i]?.toString().trim().toLowerCase();

            if (header.endsWith("-shareholder-name")) {
                const number = header.split("-")[0]; // Extracts "first", "second", etc.
                const percentIndex = headers.indexOf(`${number}-shareholder-percent`);

                if (percentIndex !== -1) {
                    const name = values[i]?.trim();
                    const percent = values[percentIndex];

                    if (name.toLowerCase() !== "all others") {
                        shareholders.push({
                            name,
                            percent,
                            asOf: currentYear,
                        });
                    }

                }
            }
        }

        return shareholders;
    };

    const extractFaq = (data: any[][]) => {
        const faq: { question: string; answer: string }[] = [];
        const headers = data[0];
        const values = data[1];

        for (let i = 0; i < headers.length; i++) {
            const header = headers[i]?.toString().trim().toLowerCase();

            if (header.startsWith("comp_faq_q")) {
                const answerIndex = headers.indexOf(`comp_faq_a${header.replace("comp_faq_q", "")}`);

                if (answerIndex !== -1) {
                    faq.push({
                        question: values[i],
                        answer: values[answerIndex],
                    });
                }
            }
        }

        return faq;
    };

    const processExcelData = (data: any[][], oldData: Partial<ICompanyFull>): Partial<ICompanyFull> => {
        const result: Partial<ICompanyFull> = {
            company: oldData.company,
            profitLoss: oldData.profitLoss || [],
            balanceSheet: oldData.balanceSheet || [],
            cashFlow: oldData.cashFlow || [],
            keyIndicators: oldData.keyIndicators || [],
            priceTrend: oldData.priceTrend || []
        };
        console.log("FILE_FOR", fileFor);

        console.log("processExcelData", data);
        const faq = extractFaq(data);
        const shareHolders = extractShareholders(data);
        const companyDataExtracted = extractCompanyData(data);


        console.log("faq", faq);
        console.log("shareHolder", shareHolders);
        console.log("companyDataExtracted", companyDataExtracted);




        const companyData: Partial<ICompany> = {
            ...oldData.company,
            ...companyDataExtracted,
            faq,
            shareHolders
        };

        // Process Shareholders



        const financialResults: IFinancialResults[] = [];
        let financialIndex = 1;
        while (getValue(data, `Financial ${financialIndex} Title`, 0, "") !== "") {
            financialResults.push({
                title: getValue(data, `Financial ${financialIndex} Title`, 0, ""),
                period: getValue(data, `Financial ${financialIndex} Period`, 0, ""),
                document: getValue(data, `Financial ${financialIndex} Document`, 0, "")
            });
            financialIndex++;
        }
        if (financialResults.length > 0) {
            companyData.financialResults = financialResults;
        }

        if (fileFor === "company_details") {
            result.company = companyData as ICompany;
        }


        if (fileFor === "key_indicators") {
            result.profitLoss = processProfitLoss(data);

            result.balanceSheet = processBalanceSheet(data);
            result.cashFlow = processCashFlow(data);
            result.keyIndicators = processKeyIndicators(data);
            result.priceTrend = processPriceTrend(data);
        };
        console.log("RESULT", result);
        return result;
    };




    return (
        <Box sx={{ mt: 3, my: 3 }} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
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
                <Button
                    variant="contained"
                    component="span"
                    disabled={loading}
                    sx={{
                        minWidth: '120px',
                        position: 'relative'
                    }}
                >
                    {loading ? (
                        <CircularProgress
                            size={24}
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                marginTop: '-12px',
                                marginLeft: '-12px'
                            }}
                        />
                    ) : "Upload"}
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
