import React from "react";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/app/components/container/PageContainer";
import { IndustryProvider } from "@/app/context/IndustryContext/index";
import IndustryDetail from "@/app/components/apps/industry/Industry-detail/index";
import BlankCard from "@/app/components/shared/BlankCard";
import { CardContent } from "@mui/material";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Industry Details",
  },
];

const IndustryDetailPage = () => {
  return (
    <IndustryProvider>
      <PageContainer
        title="Industry Detail"
        description="this is Industry Detail"
      >
        <Breadcrumb title="Industry Detail" items={BCrumb} />
        <BlankCard>
          <CardContent>
            <IndustryDetail />
          </CardContent>
        </BlankCard>
      </PageContainer>
    </IndustryProvider>
  );
};
export default IndustryDetailPage;
