import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/app/components/container/PageContainer";
import React from "react";
import BlankCard from "@/app/components/shared/BlankCard";
import { CardContent } from "@mui/material";
import Createauthor from "@/app/components/apps/author/Add-author";

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
          <Createauthor />
        </CardContent>
      </BlankCard>
    </PageContainer>
  );
};
export default CreateIndustry;
