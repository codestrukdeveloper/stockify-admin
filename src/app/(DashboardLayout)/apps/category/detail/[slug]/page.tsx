import React from "react";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/app/components/container/PageContainer";
import { CategoryProvider } from "@/app/context/CategoryContext/index";
import CategoryDetail from "@/app/components/apps/category/Category-detail/index";
import BlankCard from "@/app/components/shared/BlankCard";
import { CardContent } from "@mui/material";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Category Details",
  },
];

const CategoryDetailPage = () => {
  return (
    <CategoryProvider>
      <PageContainer
        title="Category Detail"
        description="this is Category Detail"
      >
        <Breadcrumb title="Category Detail" items={BCrumb} />
        <BlankCard>
          <CardContent>
            <CategoryDetail />
          </CardContent>
        </BlankCard>
      </PageContainer>
    </CategoryProvider>
  );
};
export default CategoryDetailPage;
