import React from "react";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/app/components/container/PageContainer";
import { DepositProvider } from "@/app/context/DepositContext/index";
import DepositDetail from "@/app/components/apps/deposit/Deposit-detail/index";
import BlankCard from "@/app/components/shared/BlankCard";
import { CardContent } from "@mui/material";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Deposit Details",
  },
];

const DepositDetailPage = () => {
  return (
    <DepositProvider>
      <PageContainer
        title="Deposit Detail"
        description="this is Deposit Detail"
      >
        <Breadcrumb title="Deposit Detail" items={BCrumb} />
        <BlankCard>
          <CardContent>
            <DepositDetail />
          </CardContent>
        </BlankCard>
      </PageContainer>
    </DepositProvider>
  );
};
export default DepositDetailPage;
