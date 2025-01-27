import React from "react";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/app/components/container/PageContainer";
import BlankCard from "@/app/components/shared/BlankCard";
import { CardContent } from "@mui/material";
import { fetchDeposits } from "../action";
import { isServerError } from "@/app/(DashboardLayout)/action";
import ErrorMessage from "@/app/components/shared/ErrorMessage";
import DepositList from "@/app/components/apps/deposit/Deposit-list";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Deposit List",
  },
];

const IDepositing = async () => {
  const page = 1;
  const limit = 10;


  const deposits = await fetchDeposits(page, limit);

  if (isServerError(deposits)) {
    return <ErrorMessage error={deposits.error} />

  }
  console.log("Deposits", deposits.totalPage)
  return (
    <PageContainer title="Deposit List" description="this is Deposit List">
      <Breadcrumb title="Deposit List" items={BCrumb} />
      <BlankCard>
        <CardContent>
          <DepositList deposits={deposits.data} totalPages={deposits.totalPage} currentPage={page} />
        </CardContent>
      </BlankCard>
    </PageContainer>
  );
}
export default IDepositing;
