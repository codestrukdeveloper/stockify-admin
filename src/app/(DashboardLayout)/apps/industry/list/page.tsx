import React from "react";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/app/components/container/PageContainer";
import IndustryList from "@/app/components/apps/industry/Industry-list/index";
import { IndustryProvider } from "@/app/context/IndustryContext/index";
import BlankCard from "@/app/components/shared/BlankCard";
import { CardContent } from "@mui/material";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Industry List",
  },
];

const IndustryListing = () => {
  return (
    <IndustryProvider>
      <PageContainer title="Industry List" description="this is Industry List">
        <Breadcrumb title="Industry List" items={BCrumb} />
        <BlankCard>
          <CardContent>
            <IndustryList />
          </CardContent>
        </BlankCard>
      </PageContainer>
    </IndustryProvider>
  );
}
export default IndustryListing;
