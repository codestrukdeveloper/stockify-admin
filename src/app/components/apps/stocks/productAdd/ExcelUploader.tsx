// Interfaces.ts
import React, { useState } from "react";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
import * as XLSX from "xlsx";
import toast from "react-hot-toast";
import { ICompany, ICompanyFull, IFaq, IFinancialResults } from "@/app/(DashboardLayout)/types/apps/ICompany";

import { IShareholder } from "@/app/(DashboardLayout)/types/apps/IShareholder";
import { IProfitLosses } from "@/app/(DashboardLayout)/types/apps/IProfitLoss";
import { IBalanceSheet } from "@/app/(DashboardLayout)/types/apps/IBalanceSheet";
import { ICashflowSum } from "@/app/(DashboardLayout)/types/apps/ICashflowSum";
import { IKeyIndicators } from "@/app/(DashboardLayout)/types/apps/IKeyIndicators";



const YEAR_MAPPING: Record<string, string> = {
    "twenty-twenty-four": "2024",
    "twenty-twenty-three": "2023",
    "twenty-twenty-two": "2022",
    "twenty-twenty-one": "2021",
    "twenty-twenty": "2020",
    "twenty-nineteen": "2019",
    "twenty-eighteen": "2018",
};

interface ExcelUploaderProps {
    onUpload: (data: Partial<ICompanyFull>) => void;
    oldData: Partial<ICompanyFull>;
}

export const ExcelUploader: React.FC<ExcelUploaderProps> = ({ onUpload, oldData,  }) => {
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

    const extractCompanyData = (data: any[][]): Partial<ICompany> => {
        const headers = data[0]; // Extract headers (first row)
        const values = data[1]; // Extract values (second row)

        const getValue = (field: string): any => {
            const index = headers.indexOf(field);
            return index !== -1 ? values[index] : undefined;
        };

        const parsePhpSerializedArray = (str: string): string[] => {
            const matches = Array.from(str.matchAll(/s:\d+:"(.*?)"/g));
            return matches.map(match => match[1]);
        };


        const dhrpId = getValue("dhrp_status");
        const depositsId = getValue("depository");

        const dhrpValues = dhrpId ? parsePhpSerializedArray(dhrpId) : [];
        const depositValues = depositsId ? parsePhpSerializedArray(depositsId) : [];


        const annualReports: IFinancialResults[] = headers
            .map((header, index) => {
                if (header.startsWith("annual-report-")) {
                    const periodMatch = header.match(/\d+/);
                    const periodYear = periodMatch ? `20${periodMatch[0]}` : "2025";
                    const document = values[index] || "";

                    return document ? { title: "Annual Report", period: periodYear, document } : null;
                }
                return null;
            })
            .filter((report): report is IFinancialResults => report !== null);




        return {
            name: getValue("Title"),
            ticker: getValue("Slug"),
            isin: getValue("isin"),
            metaTitle: getValue("_yoast_wpseo_title"),
            metaDescription: getValue("_yoast_wpseo_metadesc"),
            seoHeader: getValue("seo-header"),
            seoContent: getValue("seo-content"),
            keywords: getValue("seo-header") ? getValue("seo-header").split(",") : [],
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
            dhrpId: dhrpValues[0] || "",
            depositsId: depositValues,
            financialResults: annualReports,
            slug: getValue("Slug"),
            logo: getValue("Image URL") ? getValue("Image URL").split("|")[0] : undefined,
            logoAlt: getValue("Image Alt Text") ? getValue("Image URL").split("|")[0] : undefined,

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
        };

        console.log("processExcelData", data);
        const faq = extractFaq(data);
        const shareHolders = extractShareholders(data);
        const companyDataExtracted = extractCompanyData(data);
        const findRow = (header: string) => data.find((row) => row[0]?.toString().trim() === header.trim());

        console.log("companyDataExtracted", companyDataExtracted);
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



        const companyData: Partial<ICompany> = {
            ...oldData.company,
            ...companyDataExtracted,
            faq,
            shareHolders
        };



        
        

        result.company = companyData as ICompany;
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
        console.log("RESULT", result);
        return result;
    };




    return (
        <Box sx={{ mt: 3, my: 3 }} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            <Typography variant="h6" gutterBottom>
                Upload Excel File For  Company Details
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

