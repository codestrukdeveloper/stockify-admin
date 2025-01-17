import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/app/components/container/PageContainer";
import React from "react";
import CreatePerformanceApp from "@/app/components/apps/performance/Add-performance";
import BlankCard from "@/app/components/shared/BlankCard";
import { CardContent } from "@mui/material";
import { PerformanceProvider } from "@/app/context/PerformanceContext";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Performance Create",
  },
];

const CreatePerformance = () => {
  return (
    <PerformanceProvider>
      <PageContainer
        title="Create Performance"
        description="this is Create Performance"
      >
        <Breadcrumb title="Create Performance" items={BCrumb} />

        <BlankCard>
          <CardContent>
            <CreatePerformanceApp />
          </CardContent>
        </BlankCard>
      </PageContainer>
    </PerformanceProvider>
  );
};
export default CreatePerformance;
