import React from "react";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/app/components/container/PageContainer";
import EditDepositPage from "@/app/components/apps/deposit/Edit-deposit/index";
import BlankCard from "@/app/components/shared/BlankCard";
import { CardContent } from "@mui/material";
import { fetchDepositById } from "../../action";
import { isServerError } from "@/app/(DashboardLayout)/action";
import ErrorMessage from "@/app/components/shared/ErrorMessage";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Deposit Edit",
  },
];

const DepositEdit =async({ params }: { params: { id: string } }) =>{
  
  const companyData = await fetchDepositById(params.id);

  if (isServerError(companyData)) {
    console.log("categoriesResponse", companyData)
    return <ErrorMessage error={companyData.error} />
  }

  return (
      <PageContainer title="Edit Deposit" description="this is Edit Deposit">
        <Breadcrumb title="Edit Deposit" items={BCrumb} />
        <BlankCard>
          <CardContent>
            <EditDepositPage depositData={companyData.data} />
          </CardContent>
        </BlankCard>
      </PageContainer>
  );
};

export default DepositEdit;
