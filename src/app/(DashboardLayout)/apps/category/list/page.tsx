import React from "react";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/app/components/container/PageContainer";
import ICategory from "@/app/components/apps/category/Category-list/index";
import { CategoryProvider } from "@/app/context/CategoryContext/index";
import BlankCard from "@/app/components/shared/BlankCard";
import { CardContent } from "@mui/material";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Category List",
  },
];

const ICategorying = () => {
  return (
    <CategoryProvider>
      <PageContainer title="Category List" description="this is Category List">
        <Breadcrumb title="Category List" items={BCrumb} />
        <BlankCard>
          <CardContent>
            <ICategory />
          </CardContent>
        </BlankCard>
      </PageContainer>
    </CategoryProvider>
  );
}
export default ICategorying;
