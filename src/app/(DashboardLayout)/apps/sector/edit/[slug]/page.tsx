import React from "react";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/app/components/container/PageContainer";
import EditSectorPage from "@/app/components/apps/sector/Edit-sector/index";
import { SectorProvider } from "@/app/context/SectorContext/index";
import BlankCard from "@/app/components/shared/BlankCard";
import { CardContent } from "@mui/material";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Sector Edit",
  },
];

const SectorEdit = () => {
  return (
    <SectorProvider>
      <PageContainer title="Edit Sector" description="this is Edit Sector">
        <Breadcrumb title="Edit Sector" items={BCrumb} />
        <BlankCard>
          <CardContent>
            <EditSectorPage />
          </CardContent>
        </BlankCard>
      </PageContainer>
    </SectorProvider>
  );
};

export default SectorEdit;
