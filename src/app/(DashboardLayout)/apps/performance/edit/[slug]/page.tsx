import React from "react";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/app/components/container/PageContainer";
import EditPerformancePage from "@/app/components/apps/performance/Edit-performance/index";
import { PerformanceProvider } from "@/app/context/PerformanceContext/index";
import BlankCard from "@/app/components/shared/BlankCard";
import { CardContent } from "@mui/material";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Performance Edit",
  },
];

const PerformanceEdit = () => {
  return (
    <PerformanceProvider>
      <PageContainer title="Edit Performance" description="this is Edit Performance">
        <Breadcrumb title="Edit Performance" items={BCrumb} />
        <BlankCard>
          <CardContent>
            <EditPerformancePage />
          </CardContent>
        </BlankCard>
      </PageContainer>
    </PerformanceProvider>
  );
};

export default PerformanceEdit;
