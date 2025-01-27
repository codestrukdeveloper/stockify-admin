import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/app/components/container/PageContainer";
import React from "react";
import CreateIndustryApp from "@/app/components/apps/industry/Add-industry";
import BlankCard from "@/app/components/shared/BlankCard";
import { CardContent } from "@mui/material";

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
  );
};
export default CreateIndustry;
