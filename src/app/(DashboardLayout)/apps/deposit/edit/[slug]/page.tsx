import React from "react";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/app/components/container/PageContainer";
import EditDepositPage from "@/app/components/apps/deposit/Edit-deposit/index";
import { DepositProvider } from "@/app/context/DepositContext/index";
import BlankCard from "@/app/components/shared/BlankCard";
import { CardContent } from "@mui/material";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Deposit Edit",
  },
];

const DepositEdit = () => {
  return (
    <DepositProvider>
      <PageContainer title="Edit Deposit" description="this is Edit Deposit">
        <Breadcrumb title="Edit Deposit" items={BCrumb} />
        <BlankCard>
          <CardContent>
            <EditDepositPage />
          </CardContent>
        </BlankCard>
      </PageContainer>
    </DepositProvider>
  );
};

export default DepositEdit;
