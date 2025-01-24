"use client"
import { Box, Button, Grid, Stack } from "@mui/material";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/app/components/container/PageContainer";

import CompanyLogoAndNameCard from "@/app/components/apps/ecommerce/productAdd/CompanyLogoAndNameCard";
import KeyIndicators from "@/app/components/apps/ecommerce/productAdd/KeyIndicators";
import CashFlowSummary from "@/app/components/apps/ecommerce/productAdd/CashFlowSummary";
import BalanceSheet from "@/app/components/apps/ecommerce/productAdd/BalanceSheet";
import ProfitLossSummary from "@/app/components/apps/ecommerce/productAdd/ProfitLossSummary";
import AboutTheCompany from "@/app/components/apps/ecommerce/productAdd/AboutTheCompany";
import PricingTrend from "@/app/components/apps/ecommerce/productAdd/PricingTrend";
import React, { useState } from "react";
import { ICompanyFull } from "@/app/(DashboardLayout)/types/apps/company";
import { ISector } from "@/app/(DashboardLayout)/types/apps/sector";
import { IDeposit, IIndustry } from "@/app/(DashboardLayout)/types/apps/industry";
import { IPerformance } from "@/app/(DashboardLayout)/types/apps/peformance";
import { ICategory } from "@/app/(DashboardLayout)/types/apps/category";
import { IKeyIndicators } from "@/app/(DashboardLayout)/types/apps/IKeyIndicators";
import { IBalanceSheet } from "@/app/(DashboardLayout)/types/apps/IBalanceSheet";
import { ICashflowSum } from "@/app/(DashboardLayout)/types/apps/ICashflowSum";
import { IPriceTrend } from "@/app/(DashboardLayout)/types/apps/IPricingTrend.interface";
import { IProfitLosses } from "@/app/(DashboardLayout)/types/apps/IProfitLoss";
import EditableAddressAndManagement from "./EditableAddressManagement";
import FileUpload from "./FileUpload";
import MainFileUpload from "./MainFileUpload";
import { createCompanyAction, uploadImages } from "@/app/(DashboardLayout)/apps/company/action";
import { isServerError } from "@/app/(DashboardLayout)/action";
import { IError } from "@/app/(DashboardLayout)/types/apps/error";
import ErrorMessage from "@/app/components/shared/ErrorMessage";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Add Product",
  },
];

const keyIndicatorsInitialValue: IKeyIndicators = {
  period: "2025",
  currentSharePrice: "0",
  faceValuePerShare: "0",
  bookValuePerShare: "0",
  priceToEarning: "0",
  priceToSales: "0",
  priceToBook: "0",
  outstandingSharesMillion: "0",
  marketCapMillionRs: "0",
  debtToEquity: "0",
  dividendPercentOnCMP: "0",
  dividendPerShare: "0",
  returnOnEquity: "0",
  returnOnTotalAssets: "0",
  rowc: "0",
}
const initialBalanceSheet: IBalanceSheet = {
  period: new Date().getFullYear().toString(),
  cashEqlt: "0",
  nonCurrentAsset: "0",
  currentAsset: "0",
  totalAsset: "0",
  eqShareCap: "0",
  reserves: "0",
  totalEq: "0",
  nonCurrentLiability: "0",
  currentLiability: "0",
  totalLiability: "0",
  totalEqLiability: "0",
  companyId: "",
};

const initialCashflowSum: ICashflowSum = {
  period: new Date().getFullYear().toString(),
  operatingAct: "0",
  investingAct: "0",
  financialAct: "0",
  netCashFlow: "0",
};

const initialPriceTrend: IPriceTrend = {
  price: "0",
  label: "",
  period: new Date().getFullYear().toString(),
};

const initialProfitLosses: IProfitLosses = {
  period: new Date().getFullYear().toString(),
  revenue: "0",
  expense: "0",
  ebdita: "0",
  otherCost: "0",
  pbt: "0",
  taxExpense: "0",
  pat: "0",
  otherIncExpense: "0",
  incomeNet: "0",
  outstandingShare: "0",
  epsPerShare: "0",
  revGrowth: "0",
  ebitaMargin: "0",
  patMargin: "0",
  epsGrowth: "0",
  companyId: "",
};


interface AddCompanyProps {
  sectors: ISector[],
  deposits: IDeposit[],
  industries: IIndustry[],
  performances: IPerformance[],
  categories: ICategory[]
}

const AddCompanyClient: React.FC<AddCompanyProps> = ({
  sectors,
  deposits,
  industries,
  performances,
  categories
}) => {
  const [error, setError] = useState<IError>();
  const [logo, setLogo] = useState<File>();
  const [formData, setFormData] = useState<ICompanyFull>({
    company: {
      name: "",
      ticker: "",
      isin: "",
      location: "",
      rating: undefined,
      price: undefined,
      qty: undefined,
      minQty: undefined,
      maxQty: undefined,
      lot: undefined,
      email: "",
      phone: "",
      website: "",
      aboutus: "",
      logo: "",
      categoryId: "",
      industryId: "",
      sectorId: "",
      performanceId: "",
      depositsId: [],
      dhrpId: "",
      management: [],
      shareHolders: [],
      slug: "",
      financialResulsts: []
    },
    profitLoss: [initialProfitLosses],
    priceTrend: [initialPriceTrend],
    keyIndicators: [keyIndicatorsInitialValue],
    balanceSheet: [initialBalanceSheet],
    cashFlow: [initialCashflowSum],
  });

  const onChangeCompany = <K extends keyof ICompanyFull["company"]>(
    key: K,
    value: ICompanyFull["company"][K]
  ) => {
    setFormData((prev) => ({
      ...prev,
      company: { ...prev.company, [key]: value },
    }));
  };

  const handleInputChange = (key: keyof ICompanyFull, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSelectChange = (key: keyof ICompanyFull["company"], value: string) => {
    console.log(`Parent handleSelectChange: Key=${key}, Value=${value}`); // Debugging

    setFormData((prev) => ({
      ...prev,
      company: { ...prev.company, [key]: value },
    }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // if (logo) {
      //   console.log("FILES",logo);
      //   const data = await uploadImages("stocks", [logo]);
      //   if (isServerError(data)) {
      //     setError(data.error);
      //     // return
      //   }

      //   if (!Array.isArray(data)) {
      //     setError({
      //       message: "uploaded images is not an array"
      //     })
      //     // return
      //   }

      //   setFormData((prev) => ({
      //     ...prev,
      //     company: { ...prev.company, logo: Array.isArray(data) ? data[0] : data }

      //   }))
      // }

      const created = await createCompanyAction(formData);



      if (isServerError(created)) {

        setError(created.error);
      }


    } catch (error) {

      console.log("ERRPOR", error);
    }

  };
  console.log("Error", error)

  if (error) {
    <ErrorMessage error={error} />
  }

  console.log("FORM_Data", formData)

  return (
    <PageContainer title="Add Product" description="this is Add Product">
      <Breadcrumb title="Add Product" items={BCrumb} />
      {/* <MainFileUpload  /> */}
      <br />
      <form onSubmit={onSubmit}>
        <CompanyLogoAndNameCard
          company={formData.company}
          onChange={handleSelectChange}
          sectors={sectors}
          logo={logo}
          handleLogo={setLogo}
          industries={industries}
          performances={performances}
          deposits={deposits}
          categories={categories}
        />

        <KeyIndicators
          data={formData.keyIndicators}
          onChange={(updatedIndicators) =>
            handleInputChange("keyIndicators", updatedIndicators)
          }
        />

        <AboutTheCompany
          aboutus={formData.company.aboutus}
          videoLink={formData.company.videoLink}

          onAboutChange={(about: string) =>
            handleInputChange("company", { ...formData.company, aboutus: about })
          }

          onVideoLinkChange={(newLink: string) =>
            handleInputChange("company", { ...formData.company, videoLink: newLink })
          }
        />

        {/* <PricingTrend
          data={{
            labels: ["Nov 23", "Dec 23", "Jan 24"],
            datasets: [
              {
                label: "Price",
                data: [9000, 9500, 8000],
                borderColor: "#4caf50",
                backgroundColor: "#4caf50",
                pointRadius: 5,
                pointBackgroundColor: "#4caf50",
                fill: false,
                tension: 0.4,
              },
            ],
          }}
          onChange={(updatedTrend) =>
            handleInputChange("priceTrend", updatedTrend)
          }
        /> */}

        <ProfitLossSummary
          data={formData.profitLoss}
          onChange={(updatedProfitLoss) =>
            handleInputChange("profitLoss", updatedProfitLoss)
          }
        />

        <BalanceSheet
          data={formData.balanceSheet}
          onChange={(updatedBalanceSheet) =>
            handleInputChange("balanceSheet", updatedBalanceSheet)
          }
        />

        <CashFlowSummary
          data={formData.cashFlow}
          onChange={(updatedCashFlow) =>
            handleInputChange("cashFlow", updatedCashFlow)
          }
        />
        <br />
        <EditableAddressAndManagement
          address={formData.company.location}
          pan={formData.company.pan}
          isin={formData.company.isin}
          email={formData.company.email}
          phone={formData.company.phone}
          website={formData.company.website}
          management={formData.company.management}
          onAddressChange={(address) => onChangeCompany("location", address)}
          onPanChange={(pan) => onChangeCompany("pan", pan)}
          onIsinChange={(isin) => onChangeCompany("isin", isin)}
          onEmailChange={(email) => onChangeCompany("email", email)}
          onPhoneChange={(phone) => onChangeCompany("phone", phone)}
          onWebsiteChange={(website) => onChangeCompany("website", website)}
          onManagementChange={(management) =>
            onChangeCompany("management", management)
          }
        />


        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </PageContainer>
  );
};

export default AddCompanyClient;