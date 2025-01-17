import React from "react";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/app/components/container/PageContainer";
import EditCategoryPage from "@/app/components/apps/category/Edit-category/index";
import { CategoryProvider } from "@/app/context/CategoryContext/index";
import BlankCard from "@/app/components/shared/BlankCard";
import { CardContent } from "@mui/material";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Category Edit",
  },
];

const CategoryEdit = () => {
  return (
    <CategoryProvider>
      <PageContainer title="Edit Category" description="this is Edit Category">
        <Breadcrumb title="Edit Category" items={BCrumb} />
        <BlankCard>
          <CardContent>
            <EditCategoryPage />
          </CardContent>
        </BlankCard>
      </PageContainer>
    </CategoryProvider>
  );
};

export default CategoryEdit;
