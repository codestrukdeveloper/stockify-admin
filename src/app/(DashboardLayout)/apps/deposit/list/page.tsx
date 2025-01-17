import React from "react";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/app/components/container/PageContainer";
import DepositList from "@/app/components/apps/deposit/Deposit-list/index";
import { DepositProvider } from "@/app/context/DepositContext/index";
import BlankCard from "@/app/components/shared/BlankCard";
import { CardContent } from "@mui/material";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Deposit List",
  },
];

const DepositListing = () => {
  return (
    <DepositProvider>
      <PageContainer title="Deposit List" description="this is Deposit List">
        <Breadcrumb title="Deposit List" items={BCrumb} />
        <BlankCard>
          <CardContent>
            <DepositList />
          </CardContent>
        </BlankCard>
      </PageContainer>
    </DepositProvider>
  );
}
export default DepositListing;
