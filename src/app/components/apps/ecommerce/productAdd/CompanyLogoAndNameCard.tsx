"use client";

import { Box, Grid, TextField, InputLabel, FormControl } from "@mui/material";
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
  logo: File | undefined | null | string;
  handleLogo: (file: File) => void;
  deposits: IDeposit[];
  industries: IIndustry[];
  performances: IPerformance[];
  dhrps: IDhrp[];
  categories: ICategory[];
  validationErrors: Record<string, string>;
  id: string
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
  id
}) => {
  return (
    <div id={id}>
      <Box display="flex" gap={2} flexWrap={"wrap"}>
        <Grid container spacing={2}>

          <Grid className="bg:black" item xs={12} md={3} display="flex" alignItems="center">
            <CompanyImage
              image={logo}
              onChangeImage={handleLogo}
              validationErrors={validationErrors}
            />
          </Grid>

          <Grid item xs={12} display={"flex"} flexDirection={"column"} gap={2} md={9}>
            {/* Company Name */}
            <FormControl fullWidth>
              <InputLabel shrink htmlFor="company.name">
                Company Name
              </InputLabel>
              <TextField
                id="company.name"
                className="w-full"
                placeholder="Company Title"
                variant="filled"
                name="name"
                sx={{ width: "100%" }}
                value={company?.name || ""}
                onChange={(e) => onChange("name", e.target.value)}
                error={!!validationErrors["company.name"]}
                helperText={validationErrors["company.name"]}
              />
            </FormControl>

            <FormControl fullWidth>
              <InputLabel shrink htmlFor="company.name">
                Company Slug
              </InputLabel>
              <TextField
                id="company.slug"
                className="w-full"
                placeholder="Company Slug"
                variant="filled"
                name="name"
                sx={{ width: "100%" }}
                value={company?.slug || ""}
                onChange={(e) => onChange("slug", e.target.value)}
                error={!!validationErrors["company.slug"]}
                helperText={validationErrors["company.slug"]}
              />
            </FormControl>


            <Grid container spacing={2}>
              {/* Company Ticker */}
              <Grid item xs={6} sm={4}>
                <FormControl fullWidth>
                  <InputLabel shrink htmlFor="company.ticker">
                    Company Ticker
                  </InputLabel>
                  <TextField
                    id="company.ticker"
                    className="w-full"
                    placeholder="Company Ticker"
                    variant="filled"
                    name="ticker"
                    sx={{ width: "100%" }}
                    value={company?.ticker || ""}
                    onChange={(e) => onChange("ticker", e.target.value)}
                    error={!!validationErrors["company.ticker"]}
                    helperText={validationErrors["company.ticker"]}
                  />
                </FormControl>
              </Grid>

              {/* Min Quantity */}
              <Grid item xs={6} sm={4}>
                <FormControl fullWidth>
                  <InputLabel shrink htmlFor="company.minQty">
                    Min Quantity
                  </InputLabel>
                  <TextField
                    id="company.minQty"
                    className="w-full"
                    placeholder="MinQty"
                    variant="filled"
                    name="minQty"
                    type="number"
                    sx={{ width: "100%" }}
                    value={company?.minQty || ""}
                    onChange={(e) => onChange("minQty", e.target.value)}
                    error={!!validationErrors["company.minQty"]}
                    helperText={validationErrors["company.minQty"]}
                  />
                </FormControl>
              </Grid>

              {/* Max Quantity */}
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel shrink htmlFor="company.maxQty">
                    Max Quantity
                  </InputLabel>
                  <TextField
                    id="company.maxQty"
                    className="w-full"
                    placeholder="Max Qty"
                    variant="filled"
                    name="maxQty"
                    type="number"

                    sx={{ width: "100%" }}
                    value={company?.maxQty || ""}
                    onChange={(e) => onChange("maxQty", e.target.value)}
                    error={!!validationErrors["company.maxQty"]}
                    helperText={validationErrors["company.maxQty"]}
                  />
                </FormControl>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              {/* Company Ticker */}

              {/* Min Quantity */}
              <Grid item xs={4} sm={4}>
                <FormControl fullWidth>
                  <InputLabel shrink htmlFor="company.minQty">
                    Pre Ipo Date
                  </InputLabel>
                  <TextField
                    id="company.price"
                    className="w-full"
                    placeholder=" Pre Ipo Date"
                    variant="filled"
                    name="price"
                    type="text"
                    sx={{ width: "100%" }}
                    value={company?.preIpoDate || ""}
                    onChange={(e) => onChange("preIpoDate", e.target.value)}
                    error={!!validationErrors["company.preIpoDate"]}
                    helperText={validationErrors["company.preIpoDate"]}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={4} sm={4}>
                <FormControl fullWidth>
                  <InputLabel shrink htmlFor="company.ipoDate">
                    Ipo Date
                  </InputLabel>
                  <TextField
                    id="company.ipoDate"
                    className="w-full"
                    placeholder="Ipo Date"
                    variant="filled"
                    name="ipoDate"
                    type="text"
                    sx={{ width: "100%" }}
                    value={company?.ipoDate || ""}
                    onChange={(e) => onChange("ipoDate", e.target.value)}
                    error={!!validationErrors["company.ipoDate"]}
                    helperText={validationErrors["company.ipoDate"]}
                  />
                </FormControl>
              </Grid>


              <Grid item xs={4} sm={4}>
                <FormControl fullWidth>
                  <InputLabel shrink htmlFor="company.ipoPrice">
                    Pre Ipo Price
                  </InputLabel>
                  <TextField
                    id="company.ipoPrice"
                    className="w-full"
                    placeholder="pre ipo price"
                    variant="filled"
                    name="ipoPrice"
                    type="text"
                    sx={{ width: "100%" }}
                    value={company?.ipoPrice || ""}
                    onChange={(e) => onChange("ipoPrice", e.target.value)}
                    error={!!validationErrors["company.ipoPrice"]}
                    helperText={validationErrors["company.ipoPrice"]}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={4} sm={4}>
                <FormControl fullWidth>
                  <InputLabel shrink htmlFor="company.minQty">
                    Current Price
                  </InputLabel>
                  <TextField
                    id="company.price"
                    className="w-full"
                    placeholder="Price"
                    variant="filled"
                    name="price"
                    type="number"
                    sx={{ width: "100%" }}
                    value={company?.price || ""}
                    onChange={(e) => onChange("price", e.target.value)}
                    error={!!validationErrors["company.price"]}
                    helperText={validationErrors["company.price"]}
                  />
                </FormControl>
              </Grid>
              {/* Company Ticker */}
              <Grid item xs={4} sm={4}>
                <FormControl fullWidth>
                  <InputLabel shrink htmlFor="company.qty">
                    Company Qty
                  </InputLabel>
                  <TextField
                    id="company.qty"
                    className="w-full"
                    placeholder="Company Qty"
                    variant="filled"
                    name="qty"
                    type="number"
                    sx={{ width: "100%" }}
                    value={company?.qty || ""}
                    onChange={(e) => onChange("qty", e.target.value)}
                    error={!!validationErrors["company.qty"]}
                    helperText={validationErrors["company.qty"]}
                  />
                </FormControl>
              </Grid>


              <Grid item xs={4} sm={4}>
                <FormControl fullWidth>
                  <InputLabel shrink htmlFor="company.lot">
                    Lot
                  </InputLabel>
                  <TextField
                    id="company.lot"
                    className="w-full"
                    placeholder="Lot"
                    variant="filled"
                    name="lot"
                    type="number"
                    sx={{ width: "100%" }}
                    value={company?.lot || ""}
                    onChange={(e) => onChange("lot", e.target.value)}
                    error={!!validationErrors["company.lot"]}
                    helperText={validationErrors["company.lot"]}
                  />
                </FormControl>
              </Grid>

            </Grid>

            <Grid container spacing={2}>
              {/* Performance */}
              <Grid item xs={6} sm={4}>
                <FormControl fullWidth>
                  <InputLabel shrink htmlFor="company.performanceId">
                    Performance
                  </InputLabel>
                  <CustomSelect
                    id="company.performanceId"
                    name="performanceId"
                    options={performances}
                    value={company?.performanceId || ""}
                    onChange={(value) => onChange("performanceId", value)}
                    error={!!validationErrors["company.performanceId"]}
                    helperText={validationErrors["company.performanceId"]}
                  />
                </FormControl>
              </Grid>

              {/* DHRP */}
              <Grid item xs={6} sm={4}>
                <FormControl fullWidth>
                  <InputLabel shrink htmlFor="company.dhrpId">
                    DHRP
                  </InputLabel>
                  <CustomSelect
                    name="dhrpId"
                    id="company.dhrpId"
                    options={dhrps}
                    value={company?.dhrpId || ""}
                    onChange={(value) => onChange("dhrpId", value)}
                    error={!!validationErrors["company.dhrpId"]}
                    helperText={validationErrors["company.dhrpId"]}
                  />
                </FormControl>
              </Grid>

              {/* Sector */}
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel shrink htmlFor="company.sectorId">
                    Sector
                  </InputLabel>
                  <CustomSelect
                    name="sectorId"
                    id="company.sectorId"
                    options={sectors}
                    value={company?.sectorId || ""}
                    onChange={(value) => onChange("sectorId", value)}
                    error={!!validationErrors["company.sectorId"]}
                    helperText={validationErrors["company.sectorId"]}
                  />
                </FormControl>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              {/* Industry */}
              <Grid item xs={6} sm={4}>
                <FormControl fullWidth>
                  <InputLabel shrink htmlFor="company.industryId">
                    Industry
                  </InputLabel>
                  <CustomSelect
                    name="industryId"
                    id="company.industryId"
                    value={company?.industryId || ""}
                    onChange={(value) => onChange("industryId", value)}
                    options={industries}
                    error={!!validationErrors["company.industryId"]}
                    helperText={validationErrors["company.industryId"]}
                  />
                </FormControl>
              </Grid>

              {/* Category */}
              <Grid item xs={6} sm={4}>
                <FormControl fullWidth>
                  <InputLabel shrink htmlFor="company.categoryId">
                    Category
                  </InputLabel>
                  <CustomSelect
                    id="company.categoryId"
                    name="categoryId"
                    value={company?.categoryId || ""}
                    onChange={(value) => onChange("categoryId", value)}
                    options={categories}
                    error={!!validationErrors["company.categoryId"]}
                    helperText={validationErrors["company.categoryId"]}
                  />
                </FormControl>
              </Grid>

              {/* Deposits */}
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel shrink htmlFor="company.depositsId">
                    Deposits
                  </InputLabel>
                  <CustomMultiSelect
                    name="depositsId"
                    id={'company.depositsId'}
                    onChange={(value) => onChange("depositsId", value)}
                    options={deposits}
                    error={!!validationErrors["company.depositsId"]}
                    helperText={validationErrors["company.depositsId"]}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default CompanyLogoAndNameCard;