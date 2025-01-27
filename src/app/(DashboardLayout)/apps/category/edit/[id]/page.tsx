import React from "react";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/app/components/container/PageContainer";
import EditCategoryPage from "@/app/components/apps/category/Edit-category/index";
import BlankCard from "@/app/components/shared/BlankCard";
import { CardContent } from "@mui/material";
import { fetchCategoryById } from "../../action";
import { isServerError } from "@/app/(DashboardLayout)/action";
import ErrorMessage from "@/app/components/shared/ErrorMessage";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Category Edit",
  },
];

const CategoryEdit =async({ params }: { params: { id: string } }) =>{
  
  const companyData = await fetchCategoryById(params.id);

  if (isServerError(companyData)) {
    console.log("categoriesResponse", companyData)
    return <ErrorMessage error={companyData.error} />
  }
  return (
      <PageContainer title="Edit Category" description="this is Edit Category">
        <Breadcrumb title="Edit Category" items={BCrumb} />
        <BlankCard>
          <CardContent>
            <EditCategoryPage categoryData={companyData.data} />
          </CardContent>
        </BlankCard>
      </PageContainer>
  );
};

export default CategoryEdit;
