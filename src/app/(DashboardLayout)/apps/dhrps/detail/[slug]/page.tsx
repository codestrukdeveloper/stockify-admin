import React from "react";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/app/components/container/PageContainer";
import { DhrpsProvider } from "@/app/context/DhrpsContext/index";
import DhrpsDetail from "@/app/components/apps/dhrps/Dhrps-detail/index";
import BlankCard from "@/app/components/shared/BlankCard";
import { CardContent } from "@mui/material";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Dhrps Details",
  },
];

const DhrpsDetailPage = () => {
  return (
    <DhrpsProvider>
      <PageContainer
        title="Dhrps Detail"
        description="this is Dhrps Detail"
      >
        <Breadcrumb title="Dhrps Detail" items={BCrumb} />
        <BlankCard>
          <CardContent>
            <DhrpsDetail />
          </CardContent>
        </BlankCard>
      </PageContainer>
    </DhrpsProvider>
  );
};
export default DhrpsDetailPage;
