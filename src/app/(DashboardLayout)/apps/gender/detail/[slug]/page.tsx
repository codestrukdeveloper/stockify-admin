import React from "react";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/app/components/container/PageContainer";
import { GenderProvider } from "@/app/context/GenderContext/index";
import GenderDetail from "@/app/components/apps/gender/Gender-detail/index";
import BlankCard from "@/app/components/shared/BlankCard";
import { CardContent } from "@mui/material";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Gender Details",
  },
];

const GenderDetailPage = () => {
  return (
    <GenderProvider>
      <PageContainer
        title="Gender Detail"
        description="this is Gender Detail"
      >
        <Breadcrumb title="Gender Detail" items={BCrumb} />
        <BlankCard>
          <CardContent>
            <GenderDetail />
          </CardContent>
        </BlankCard>
      </PageContainer>
    </GenderProvider>
  );
};
export default GenderDetailPage;
