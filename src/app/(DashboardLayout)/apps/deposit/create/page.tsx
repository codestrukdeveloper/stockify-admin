import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/app/components/container/PageContainer";
import React from "react";
import CreateDepositApp from "@/app/components/apps/deposit/Add-deposit";
import BlankCard from "@/app/components/shared/BlankCard";
import { CardContent } from "@mui/material";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Deposit Create",
  },
];

const CreateDeposit = () => {
  return (
    <PageContainer
      title="Create Deposit"
      description="this is Create Deposit"
    >
      <Breadcrumb title="Create Deposit" items={BCrumb} />

      <BlankCard>
        <CardContent>
          <CreateDepositApp />
        </CardContent>
      </BlankCard>
    </PageContainer>
  );
};
export default CreateDeposit;
