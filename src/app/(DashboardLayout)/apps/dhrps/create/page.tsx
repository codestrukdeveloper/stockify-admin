import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/app/components/container/PageContainer";
import React from "react";
import CreateDhrpsApp from "@/app/components/apps/dhrps/Add-dhrps";
import BlankCard from "@/app/components/shared/BlankCard";
import { CardContent } from "@mui/material";
import { DhrpsProvider } from "@/app/context/DhrpsContext";

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
    <DhrpsProvider>
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
    </DhrpsProvider>
  );
};
export default CreateDhrps;
