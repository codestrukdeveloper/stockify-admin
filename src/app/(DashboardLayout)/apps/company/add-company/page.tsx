
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

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Add Product",
  },
];

const stockData = {
  dates: ['2024-01-01', '2024-01-02', '2024-01-03', '2024-01-04', '2024-01-05', '2024-01-06', '2024-01-07', '2024-01-08'],
  prices: [150, 153, 157, 160, 162, 161, 164, 167],
};


const AddCompany = () => {
  return (
    <PageContainer title="Add Product" description="this is Add Product">
      {/* breadcrumb */}
      {/* <Breadcrumb title="Add Product" items={BCrumb} /> */}
      <form>
        <CompanyLogoAndNameCard />


        <KeyIndicators />

        <AboutTheCompany />

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
        />



        <ProfitLossSummary />

        <BalanceSheet />
        <CashFlowSummary />


      </form>
    </PageContainer>
  );
};

export default AddCompany;
