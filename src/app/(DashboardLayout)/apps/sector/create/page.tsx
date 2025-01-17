import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/app/components/container/PageContainer";
import React from "react";
import CreateSectorApp from "@/app/components/apps/sector/Add-sector";
import BlankCard from "@/app/components/shared/BlankCard";
import { CardContent } from "@mui/material";
import { SectorProvider } from "@/app/context/SectorContext";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Sector Create",
  },
];

const CreateSector = () => {
  return (
    <SectorProvider>
      <PageContainer
        title="Create Sector"
        description="this is Create Sector"
      >
        <Breadcrumb title="Create Sector" items={BCrumb} />

        <BlankCard>
          <CardContent>
            <CreateSectorApp />
          </CardContent>
        </BlankCard>
      </PageContainer>
    </SectorProvider>
  );
};
export default CreateSector;
