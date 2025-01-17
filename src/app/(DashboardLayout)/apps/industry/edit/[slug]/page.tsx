import React from "react";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/app/components/container/PageContainer";
import EditIndustryPage from "@/app/components/apps/industry/Edit-industry/index";
import { IndustryProvider } from "@/app/context/IndustryContext/index";
import BlankCard from "@/app/components/shared/BlankCard";
import { CardContent } from "@mui/material";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Industry Edit",
  },
];

const IndustryEdit = () => {
  return (
    <IndustryProvider>
      <PageContainer title="Edit Industry" description="this is Edit Industry">
        <Breadcrumb title="Edit Industry" items={BCrumb} />
        <BlankCard>
          <CardContent>
            <EditIndustryPage />
          </CardContent>
        </BlankCard>
      </PageContainer>
    </IndustryProvider>
  );
};

export default IndustryEdit;
