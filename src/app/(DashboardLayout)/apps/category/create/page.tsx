import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/app/components/container/PageContainer";
import React from "react";
import CreateCategoryApp from "@/app/components/apps/category/Add-category";
import BlankCard from "@/app/components/shared/BlankCard";
import { CardContent } from "@mui/material";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Category Create",
  },
];

const CreateCategory = () => {
  return (
      <PageContainer
        title="Create Category"
        description="this is Create Category"
      >
        <Breadcrumb title="Create Category" items={BCrumb} />

        <BlankCard>
          <CardContent>
            <CreateCategoryApp />
          </CardContent>
        </BlankCard>
      </PageContainer>
  );
};
export default CreateCategory;
