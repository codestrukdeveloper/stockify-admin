import React from "react";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/app/components/container/PageContainer";
import EditPerformancePage from "@/app/components/apps/performance/Edit-performance/index";
import BlankCard from "@/app/components/shared/BlankCard";
import { CardContent } from "@mui/material";
import { fetchPerformanceById } from "../../action";
import { isServerError } from "@/app/(DashboardLayout)/action";
import ErrorMessage from "@/app/components/shared/ErrorMessage";
import { ServerErrorRender } from "@/app/components/shared/ServerErrorRender";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Performance Edit",
  },
];

const PerformanceEdit = async ({ params }: { params: { id: string } }) => {

  const performanceData = await fetchPerformanceById(params.id);

  if (isServerError(performanceData)) {
    return <ServerErrorRender error={performanceData.error} />
  }
  return (
    <PageContainer title="Edit Performance" description="this is Edit Performance">
      <Breadcrumb title="Edit Performance" items={BCrumb} />
      <BlankCard>
        <CardContent>
          <EditPerformancePage performanceData={performanceData.data} />
        </CardContent>
      </BlankCard>
    </PageContainer>
  );
};

export default PerformanceEdit;
