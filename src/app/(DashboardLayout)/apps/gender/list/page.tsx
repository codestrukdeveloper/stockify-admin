import React from "react";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/app/components/container/PageContainer";
import GenderList from "@/app/components/apps/gender/Gender-list/index";
import { GenderProvider } from "@/app/context/GenderContext/index";
import BlankCard from "@/app/components/shared/BlankCard";
import { CardContent } from "@mui/material";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Gender List",
  },
];

const GenderListing = () => {
  return (
    <GenderProvider>
      <PageContainer title="Gender List" description="this is Gender List">
        <Breadcrumb title="Gender List" items={BCrumb} />
        <BlankCard>
          <CardContent>
            <GenderList />
          </CardContent>
        </BlankCard>
      </PageContainer>
    </GenderProvider>
  );
}
export default GenderListing;
