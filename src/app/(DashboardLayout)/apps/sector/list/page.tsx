import React from "react";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/app/components/container/PageContainer";
import ISector from "@/app/components/apps/sector/Sector-list/index";
import { SectorProvider } from "@/app/context/SectorContext/index";
import BlankCard from "@/app/components/shared/BlankCard";
import { CardContent } from "@mui/material";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Sector List",
  },
];

const ISectoring = () => {
  return (
    <SectorProvider>
      <PageContainer title="Sector List" description="this is Sector List">
        <Breadcrumb title="Sector List" items={BCrumb} />
        <BlankCard>
          <CardContent>
            <ISector />
          </CardContent>
        </BlankCard>
      </PageContainer>
    </SectorProvider>
  );
}
export default ISectoring;
