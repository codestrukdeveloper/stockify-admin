import React from "react";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/app/components/container/PageContainer";
import { PerformanceProvider } from "@/app/context/PerformanceContext/index";
import PerformanceDetail from "@/app/components/apps/performance/Performance-detail/index";
import BlankCard from "@/app/components/shared/BlankCard";
import { CardContent } from "@mui/material";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Performance Details",
  },
];

const PerformanceDetailPage = () => {
  return (
    <PerformanceProvider>
      <PageContainer
        title="Performance Detail"
        description="this is Performance Detail"
      >
        <Breadcrumb title="Performance Detail" items={BCrumb} />
        <BlankCard>
          <CardContent>
            <PerformanceDetail />
          </CardContent>
        </BlankCard>
      </PageContainer>
    </PerformanceProvider>
  );
};
export default PerformanceDetailPage;
