import { Box, Typography } from '@mui/material'
import React from 'react'
import ResponsiveTable, { DataTableProps } from './ResponsiveTable'
const fakeProfitLossData: DataTableProps = {
    name: "Key Indicators",
    year: ["2024"],
    data: {
        "CURRENT SHARE PRICE": ["12000"],
        "FACE VALUE/SHARE": ["8000"],
        "BOOK VALUE/SHARE": ["4000"],
        "PRICE TO EARNING (PE)": ["500"],
        "PRICE/SALES": ["500"], 
        "PRICE/BOOK": ["500"],
        "OUTSTANDING SHARES (Million)": ["500"],
        "MARKET CAP (Rs. Million)": ["500"],
        "DEBT/EQUITY": ["500"], 
        "DIVIDEND/SHARE": ["500"],
        "DIVIDEND % (ON CMP)": ["500"],
        "RETURN ON TOTAL ASSETS": ["500"],
        "RETURN ON EQUITY": ["500"],
        "ROWC": ["500"]

    },
};

const KeyIndicators = () => {
    return (
        <Box mt={3}>

            <Typography textAlign={"center"} textTransform={"uppercase"} variant="h1" fontWeight={"bold"}>
                Key{" "}
                <Typography
                    component="span"
                    sx={{
                        color: "#2AA500",
                        fontWeight: "inherit",
                        fontSize: "inherit",
                        lineHeight: "inherit",
                    }}
                >
                    Indicators
                </Typography>
            </Typography>

            <ResponsiveTable initialData={fakeProfitLossData} />

        </Box>
    )
}

export default KeyIndicators
