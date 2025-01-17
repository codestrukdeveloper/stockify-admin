import React from "react";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/app/components/container/PageContainer";
import { SectorProvider } from "@/app/context/SectorContext/index";
import SectorDetail from "@/app/components/apps/sector/Sector-detail/index";
import BlankCard from "@/app/components/shared/BlankCard";
import { CardContent } from "@mui/material";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Sector Details",
  },
];

const SectorDetailPage = () => {
  return (
    <SectorProvider>
      <PageContainer
        title="Sector Detail"
        description="this is Sector Detail"
      >
        <Breadcrumb title="Sector Detail" items={BCrumb} />
        <BlankCard>
          <CardContent>
            <SectorDetail />
          </CardContent>
        </BlankCard>
      </PageContainer>
    </SectorProvider>
  );
};
export default SectorDetailPage;
