import React from "react";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/app/components/container/PageContainer";
import BlankCard from "@/app/components/shared/BlankCard";
import { CardContent } from "@mui/material";
import { fetchSectors } from "../action";
import { isServerError } from "@/app/(DashboardLayout)/action";
import ErrorMessage from "@/app/components/shared/ErrorMessage";
import SectorList from "@/app/components/apps/sector/Sector-list";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Sector List",
  },
];

const ISectoring=async ({ searchParams }: { searchParams?: { page?: string, limit?: string; search?: string } }) =>{
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const limit = searchParams?.limit ? parseInt(searchParams.limit) : 10;


  const sectors = await fetchSectors(page, limit);

  if (isServerError(sectors)) {
    console.log("sectors",sectors)
    return   <ErrorMessage error={sectors.error} />
    
  }

  return (
      <PageContainer title="Sector List" description="this is Sector List">
        <Breadcrumb title="Sector List" items={BCrumb} />
        <BlankCard>
          <CardContent>
            <SectorList sectors={sectors.data||[]} totalPages={sectors.totalPage||1} currentPage={page} />
          </CardContent>
        </BlankCard>
      </PageContainer>
  );
}
export default ISectoring;
