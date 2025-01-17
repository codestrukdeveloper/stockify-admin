import React from "react";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/app/components/container/PageContainer";
import EditDhrpsPage from "@/app/components/apps/dhrps/Edit-dhrps/index";
import { DhrpsProvider } from "@/app/context/DhrpsContext/index";
import BlankCard from "@/app/components/shared/BlankCard";
import { CardContent } from "@mui/material";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Dhrps Edit",
  },
];

const DhrpsEdit = () => {
  return (
    <DhrpsProvider>
      <PageContainer title="Edit Dhrps" description="this is Edit Dhrps">
        <Breadcrumb title="Edit Dhrps" items={BCrumb} />
        <BlankCard>
          <CardContent>
            <EditDhrpsPage />
          </CardContent>
        </BlankCard>
      </PageContainer>
    </DhrpsProvider>
  );
};

export default DhrpsEdit;
