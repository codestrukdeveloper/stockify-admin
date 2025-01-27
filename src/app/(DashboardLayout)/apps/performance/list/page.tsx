import React from "react";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/app/components/container/PageContainer";
import PerformancesList from "@/app/components/apps/performance/Performance-list/index";
import BlankCard from "@/app/components/shared/BlankCard";
import { CardContent } from "@mui/material";
import { isServerError } from "@/app/(DashboardLayout)/action";
import ErrorMessage from "@/app/components/shared/ErrorMessage";
import { fetchPerformances } from "../action";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Performance List",
  },
];

const Performances = async () => {
  const page = 1;
  const limit = 10;


  const performances = await fetchPerformances(page, limit);

  if (isServerError(performances)) {
    return (
      <ErrorMessage error={performances.error} />

    )
  }

  console.log("performances", performances.totalPage)
  return (
    <PageContainer title="Performance List" description="this is Performance List">
      <Breadcrumb title="Performance List" items={BCrumb} />
      <BlankCard>
        <CardContent>
          <PerformancesList performancesList={performances.data} totalPages={performances.totalPage} currentPage={page} />
        </CardContent>
      </BlankCard>
    </PageContainer>
  );
}
export default Performances;
