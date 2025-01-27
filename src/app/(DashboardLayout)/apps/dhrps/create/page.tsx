import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/app/components/container/PageContainer";
import React from "react";
import CreateDhrpsApp from "@/app/components/apps/dhrps/Add-dhrps";
import BlankCard from "@/app/components/shared/BlankCard";
import { CardContent } from "@mui/material";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Dhrps Create",
  },
];

const CreateDhrps = () => {
  return (
      <PageContainer
        title="Create Dhrps"
        description="this is Create Dhrps"
      >
        <Breadcrumb title="Create Dhrps" items={BCrumb} />

        <BlankCard>
          <CardContent>
            <CreateDhrpsApp />
          </CardContent>
        </BlankCard>
      </PageContainer>
  );
};
export default CreateDhrps;
