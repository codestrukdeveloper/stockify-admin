import React from "react";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/app/components/container/PageContainer";
import BlankCard from "@/app/components/shared/BlankCard";
import { CardContent } from "@mui/material";
import { fetchCategories } from "../action";
import { isServerError } from "@/app/(DashboardLayout)/action";
import { ServerErrorRender } from "@/app/components/shared/ServerErrorRender";
import CategoryList from "@/app/components/apps/category/Category-list";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Category List",
  },
];

const ICategorying =  async() => {
  const page =  1;
  const limit = 10;


  const categories = await fetchCategories(page, limit);

  if (isServerError(categories)) {
    return <ServerErrorRender error={categories.error} />
    
  }
  return (
      <PageContainer title="Category List" description="this is Category List">
        <Breadcrumb title="Category List" items={BCrumb} />
        <BlankCard>
          <CardContent>
            <CategoryList categories={categories.data} totalPages={categories.totalPage}  currentPage={page}/>
          </CardContent>
        </BlankCard>
      </PageContainer>
  );
}
export default ICategorying;
