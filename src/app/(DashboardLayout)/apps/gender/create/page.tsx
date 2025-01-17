import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/app/components/container/PageContainer";
import React from "react";
import CreateGenderApp from "@/app/components/apps/gender/Add-gender";
import BlankCard from "@/app/components/shared/BlankCard";
import { CardContent } from "@mui/material";
import { GenderProvider } from "@/app/context/GenderContext";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Gender Create",
  },
];

const CreateGender = () => {
  return (
    <GenderProvider>
      <PageContainer
        title="Create Gender"
        description="this is Create Gender"
      >
        <Breadcrumb title="Create Gender" items={BCrumb} />

        <BlankCard>
          <CardContent>
            <CreateGenderApp />
          </CardContent>
        </BlankCard>
      </PageContainer>
    </GenderProvider>
  );
};
export default CreateGender;
