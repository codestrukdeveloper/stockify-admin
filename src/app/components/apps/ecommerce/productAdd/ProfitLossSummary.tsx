import { Box, Typography } from '@mui/material'
import React from 'react'
import ResponsiveTable, { DataTableProps } from './ResponsiveTable'
const fakeProfitLossData: DataTableProps = {
    name: "Profit & Loss",
    year: ["2020", "2021", "2022", "2023", "2024"],
    data: {
        "REVENUE": ["12000", "13500", "14500", "16000", "17500"],
        "EXPENSE": ["8000", "8500", "9000", "9500", "10000"],
        "EBDITA": ["4000", "5000", "5500", "6500", "7500"],
        "OTHER COST": ["500", "600", "700", "800", "900"],
        "PBT": ["3500", "4400", "4800", "5700", "6600"],
        "TAX EXPENSE": ["1000", "1200", "1300", "1500", "1700"],
        "PAT": ["2500", "3200", "3500", "4200", "4900"],
        "OTHER INCOME/EXP.": ["100", "200", "300", "400", "500"],
        "INCOME (NET OF TAXES)": ["2600", "3400", "3800", "4600", "5400"],
        "OUTSTANDING SHARE": ["1.0", "1.2", "1.3", "1.4", "1.5"],
        "EPS (Rs/share)": ["2.6", "3.4", "3.8", "4.6", "5.4"],
        "REVENUE GROWTH %": ["2.6", "3.4", "3.8", "4.6", "5.4"],
        "EBIDTA MARGIN %": ["2.6", "3.4", "3.8", "4.6", "5.4"],
        "NET MARGIN %": ["2.6", "3.4", "3.8", "4.6", "5.4"],
        "EPS GROWTH %": ["2.6", "3.4", "3.8", "4.6", "5.4"],

    },
};

const ProfitLossSummary = () => {
    return (
        <Box mt={3}>

            <Typography textAlign={"center"} variant="h1" fontWeight={"bold"}>
                PROFIT & LOSS{" "}
                <Typography
                    component="span"
                    sx={{
                        color: "#2AA500",
                        fontWeight: "inherit",
                        fontSize: "inherit",
                        lineHeight: "inherit",
                    }}
                >
                    SUMMARY
                </Typography>
            </Typography>

            <ResponsiveTable initialData={fakeProfitLossData} />

        </Box>
    )
}

export default ProfitLossSummary
