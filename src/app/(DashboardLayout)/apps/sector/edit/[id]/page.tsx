import React from "react";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/app/components/container/PageContainer";
import EditSectorPage from "@/app/components/apps/sector/Edit-sector/index";
import BlankCard from "@/app/components/shared/BlankCard";
import { CardContent } from "@mui/material";
import { fetchSectorById } from "../../action";
import { isServerError } from "@/app/(DashboardLayout)/action";
import ErrorMessage from "@/app/components/shared/ErrorMessage";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Sector Edit",
  },
];

const SectorEdit = async({ params }: { params: { id: string } }) =>{
  
  const sectorData = await fetchSectorById(params.id);

  if (isServerError(sectorData)) {
    console.log("categoriesResponse", sectorData)
    return <ErrorMessage error={sectorData.error} />
  }
  return (
      <PageContainer title="Edit Sector" description="this is Edit Sector">
        <Breadcrumb title="Edit Sector" items={BCrumb} />
        <BlankCard>
          <CardContent>
            <EditSectorPage SectorData={sectorData.data} />
          </CardContent>
        </BlankCard>
      </PageContainer>
  );
};

export default SectorEdit;
