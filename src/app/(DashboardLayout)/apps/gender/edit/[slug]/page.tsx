import React from "react";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/app/components/container/PageContainer";
import EditGenderPage from "@/app/components/apps/gender/Edit-gender/index";
import { GenderProvider } from "@/app/context/GenderContext/index";
import BlankCard from "@/app/components/shared/BlankCard";
import { CardContent } from "@mui/material";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Gender Edit",
  },
];

const GenderEdit = () => {
  return (
    <GenderProvider>
      <PageContainer title="Edit Gender" description="this is Edit Gender">
        <Breadcrumb title="Edit Gender" items={BCrumb} />
        <BlankCard>
          <CardContent>
            <EditGenderPage />
          </CardContent>
        </BlankCard>
      </PageContainer>
    </GenderProvider>
  );
};

export default GenderEdit;
