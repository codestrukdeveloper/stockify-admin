"use client";

import { Box, Grid, TextField } from "@mui/material";
import React from "react";
import CompanyImage from "./CompanyImage";
import CustomMultiSelect from "./CustomMultiSelect";
import { ICompany } from "@/app/(DashboardLayout)/types/apps/ICompany";
import { ISector } from "@/app/(DashboardLayout)/types/apps/sector";
import { IDeposit } from "@/app/(DashboardLayout)/types/apps/deposit";
import { IIndustry } from "@/app/(DashboardLayout)/types/apps/industry";
import { IPerformance } from "@/app/(DashboardLayout)/types/apps/peformance";
import { ICategory } from "@/app/(DashboardLayout)/types/apps/category";
import { CustomSelect } from "@/app/components/shared/CustomSelect";
import { IDhrp } from "@/app/(DashboardLayout)/types/apps/IDhrp";

interface CompanyLogoAndNameCardProps {
  company?: Partial<ICompany>;
  onChange: (key: keyof ICompany, value: string | string[]) => void;
  sectors: ISector[];
  logo: File | undefined | null;
  handleLogo: (file: File) => void;
  deposits: IDeposit[];
  industries: IIndustry[];
  performances: IPerformance[];
  dhrps: IDhrp[];
  categories: ICategory[];
  validationErrors: Record<string, string>;
}

const CompanyLogoAndNameCard: React.FC<CompanyLogoAndNameCardProps> = ({
  company,
  onChange,
  sectors,
  industries,
  performances,
  deposits,
  handleLogo,
  logo,
  dhrps,
  categories,
  validationErrors,
}) => {
  return (
    <Box display="flex" gap={2} flexWrap={"wrap"}>
      <Grid container spacing={2}>
        <Grid className="bg:black" item xs={12} md={3} display="flex" alignItems="center">
          <CompanyImage
            image={logo}
            onChangeImage={handleLogo}
            validationErrors={validationErrors} // Pass validationErrors
          />
        </Grid>

        <Grid item xs={12} display={"flex"} flexDirection={"column"} gap={2} md={9}>
          <TextField
            id="company.name"

            className="w-full"
            placeholder="Company Title"
            variant="filled"
            name="name"
            value={company?.name || ""}
            onChange={(e) => onChange("name", e.target.value)}
            error={!!validationErrors["company.name"]}
            helperText={validationErrors["company.name"]}
          />
          <Grid container spacing={2}>
            <Grid item xs={6} sm={4}>
              <TextField
                className="w-full"
                placeholder="Company Ticker"
                variant="filled"
                name="ticker"
                id="company.ticker"

                value={company?.ticker || ""}
                onChange={(e) => onChange("ticker", e.target.value)}
                error={!!validationErrors["company.ticker"]}
                helperText={validationErrors["company.ticker"]}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <TextField
                className="w-full"
                placeholder="MinQty"
                variant="filled"
                id="company.minQty"
                name="minQty"
                value={company?.minQty || ""}
                onChange={(e) => onChange("minQty", e.target.value)}
                error={!!validationErrors["company.minQty"]}
                helperText={validationErrors["company.minQty"]}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                className="w-full"
                placeholder="Max Qty"
                variant="filled"
                id="company.maxQty"

                name="maxQty"
                sx={{ width: "100%" }}
                value={company?.maxQty || ""}
                onChange={(e) => onChange("maxQty", e.target.value)}
                error={!!validationErrors["company.maxQty"]}
                helperText={validationErrors["company.maxQty"]}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6} sm={4}>
              <CustomSelect
                name="performanceId"
                options={performances}
                value={company?.performanceId || ""}
                onChange={(value) => onChange("performanceId", value)}
                error={!!validationErrors["company.performanceId"]}
                helperText={validationErrors["company.performanceId"]}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <CustomSelect
                name="dhrpId"
                options={dhrps}

                value={company?.dhrpId || ""}
                onChange={(value) => onChange("dhrpId", value)}
                error={!!validationErrors["company.dhrpId"]}
                helperText={validationErrors["company.dhrpId"]}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <CustomSelect
                name="sectorId"
                options={sectors}
                value={company?.sectorId || ""}
                onChange={(value) => onChange("sectorId", value)}
                error={!!validationErrors["company.sectorId"]}
                helperText={validationErrors["company.sectorId"]}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6} sm={4}>
              <CustomSelect
                name="industryId"
                value={company?.industryId || ""}
                onChange={(value) => onChange("industryId", value)}
                options={industries}
                error={!!validationErrors["company.industryId"]}
                helperText={validationErrors["company.industryId"]}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <CustomSelect
                name="categoryId"
                value={company?.categoryId || ""}
                onChange={(value) => onChange("categoryId", value)}
                options={categories}
                error={!!validationErrors["company.categoryId"]}
                helperText={validationErrors["company.categoryId"]}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <CustomMultiSelect
                name="depositsId"
                onChange={(value) => onChange("depositsId", value)} // Pass array of selected values
                options={deposits}
                error={!!validationErrors["company.depositsId"]}
                helperText={validationErrors["company.depositsId"]}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CompanyLogoAndNameCard;