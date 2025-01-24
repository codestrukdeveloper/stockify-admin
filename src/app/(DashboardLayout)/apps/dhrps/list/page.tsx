import React from "react";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/app/components/container/PageContainer";
import IDhrps from "@/app/components/apps/dhrps/Dhrps-list/index";
import { DhrpsProvider } from "@/app/context/DhrpsContext/index";
import BlankCard from "@/app/components/shared/BlankCard";
import { CardContent } from "@mui/material";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Dhrps List",
  },
];

const IDhrpsing = () => {
  return (
    <DhrpsProvider>
      <PageContainer title="Dhrps List" description="this is Dhrps List">
        <Breadcrumb title="Dhrps List" items={BCrumb} />
        <BlankCard>
          <CardContent>
            <IDhrps />
          </CardContent>
        </BlankCard>
      </PageContainer>
    </DhrpsProvider>
  );
}
export default IDhrpsing;
