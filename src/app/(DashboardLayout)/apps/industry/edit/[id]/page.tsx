import React from "react";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/app/components/container/PageContainer";
import EditIndustryPage from "@/app/components/apps/industry/Edit-industry/index";
import BlankCard from "@/app/components/shared/BlankCard";
import { CardContent } from "@mui/material";
import { isServerError } from "@/app/(DashboardLayout)/action";
import ErrorMessage from "@/app/components/shared/ErrorMessage";
import { fetchIndustryById } from "../../action";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Industry Edit",
  },
];

const IndustryEdit =async({ params }: { params: { id: string } }) =>{
  
  const industryData = await fetchIndustryById(params.id);

  if (isServerError(industryData)) {
    console.log("categoriesResponse", industryData)
    return <ErrorMessage error={industryData.error} />
  }
  return (
      <PageContainer title="Edit Industry" description="this is Edit Industry">
        <Breadcrumb title="Edit Industry" items={BCrumb} />
        <BlankCard>
          <CardContent>
            <EditIndustryPage industryData={industryData.data} />
          </CardContent>
        </BlankCard>
      </PageContainer>
  );
};

export default IndustryEdit;
