import React from "react";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/app/components/container/PageContainer";
import BlankCard from "@/app/components/shared/BlankCard";
import { CardContent } from "@mui/material";
import DhrpList from "@/app/components/apps/dhrps/Dhrps-list/index";
import { isServerError } from "@/app/(DashboardLayout)/action";
import { fetchDhrps } from "../action";
import ErrorMessage from "@/app/components/shared/ErrorMessage";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Dhrps List",
  },
];

const IDhrpsing = async() => {
  const page =  1;
  const limit = 10;


  const dhrps = await fetchDhrps(page, limit);

  if (isServerError(dhrps)) {
    return <ErrorMessage error={dhrps.error} />
    
  }
  return (
      <PageContainer title="Dhrps List" description="this is Dhrps List">
        <Breadcrumb title="Dhrps List" items={BCrumb} />
        <BlankCard>
          <CardContent>
            <DhrpList dhrps={dhrps.data} totalPages={dhrps.totalPage} currentPage={page}  />
          </CardContent>
        </BlankCard>
      </PageContainer>
  );
}
export default IDhrpsing;
