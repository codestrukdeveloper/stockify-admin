import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/app/components/container/PageContainer";
import React from "react";
import CreateIndustryApp from "@/app/components/apps/industry/Add-industry";
import BlankCard from "@/app/components/shared/BlankCard";
import { CardContent } from "@mui/material";
import { IndustryProvider } from "@/app/context/IndustryContext";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Industry Create",
  },
];

const CreateIndustry = () => {
  return (
    <IndustryProvider>
      <PageContainer
        title="Create Industry"
        description="this is Create Industry"
      >
        <Breadcrumb title="Create Industry" items={BCrumb} />

        <BlankCard>
          <CardContent>
            <CreateIndustryApp />
          </CardContent>
        </BlankCard>
      </PageContainer>
    </IndustryProvider>
  );
};
export default CreateIndustry;
