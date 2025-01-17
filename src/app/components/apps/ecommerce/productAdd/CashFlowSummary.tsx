import { Box, Typography } from '@mui/material'
import React from 'react'
import ResponsiveTable, { DataTableProps } from './ResponsiveTable'
const fakeProfitLossData:DataTableProps = {
    name:"Cash flow  Summary",
    year: ["2020", "2021", "2022", "2023", "2024"],
    data: {
      "REVENUE": ["12000", "13500", "14500", "16000", "17500"],
      "EXPENSE": ["8000", "8500", "9000", "9500", "10000"],
      "EBDITA": ["4000", "5000", "5500", "6500", "7500"],
      "OTHER COST": ["500", "600", "700", "800", "900"],
    },
  };
  
const CashFlowSummary = () => {
    return (
        <Box mt={3}>

            <Typography textAlign={"center"} variant="h1" fontWeight={"bold"}>
            CASH FLOW{" "}
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

<ResponsiveTable  initialData={fakeProfitLossData} />

        </Box>
    )
}

export default CashFlowSummary
