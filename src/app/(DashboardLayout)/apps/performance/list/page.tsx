import React from "react";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/app/components/container/PageContainer";
import IPerformance from "@/app/components/apps/performance/Performance-list/index";
import { PerformanceProvider } from "@/app/context/PerformanceContext/index";
import BlankCard from "@/app/components/shared/BlankCard";
import { CardContent } from "@mui/material";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Performance List",
  },
];

const IPerformanceing = () => {
  return (
    <PerformanceProvider>
      <PageContainer title="Performance List" description="this is Performance List">
        <Breadcrumb title="Performance List" items={BCrumb} />
        <BlankCard>
          <CardContent>
            <IPerformance />
          </CardContent>
        </BlankCard>
      </PageContainer>
    </PerformanceProvider>
  );
}
export default IPerformanceing;
