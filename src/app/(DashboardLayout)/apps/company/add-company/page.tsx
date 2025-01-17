
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
import { useState } from "react";
import { ICompanyFull } from "@/app/(DashboardLayout)/types/apps/company";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Add Product",
  },
];

const AddCompany = () => {
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
      categoryId: "",
      industryId: "",
      sectorId: "",
      performanceId: "",
      depositsId: [],
      dhrpId: "",
    },
    sector: { _id: "", name: "", },
    industry: { _id: "", name: "" },
    performance: { _id: "", name: "" },
    category: { _id: "", name: "", },
    deposits: [],
    dhrp: { _id: "", name: "" },
    profitLoss: [],
    priceTrend: [],
    keyIndicators: [],
    balanceSheet: [],
    cashFlow: [],
  });

  const handleInputChange = (key: keyof ICompanyFull, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <PageContainer title="Add Product" description="this is Add Product">
      <Breadcrumb title="Add Product" items={BCrumb} />
      <form>
        {/* Example for updating sections */}
        <CompanyLogoAndNameCard
          data={formData.company}
          onChange={(updatedCompany) =>
            handleInputChange("company", updatedCompany)
          }
        />

        <KeyIndicators
          data={formData.keyIndicators}
          onChange={(updatedIndicators) =>
            handleInputChange("keyIndicators", updatedIndicators)
          }
        />

        <AboutTheCompany
          data={formData.company.aboutus}
          onChange={(about) =>
            handleInputChange("company", { ...formData.company, aboutus: about })
          }
        />

        <PricingTrend
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
        />

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

        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </PageContainer>
  );
};

export default AddCompany;
