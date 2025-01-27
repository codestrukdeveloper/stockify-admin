import React from "react";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/app/components/container/PageContainer";
import IIndustry from "@/app/components/apps/industry/Industry-list/index";
import BlankCard from "@/app/components/shared/BlankCard";
import { CardContent } from "@mui/material";
import { fetchIndustries } from "../action";
import { isServerError } from "@/app/(DashboardLayout)/action";
import ErrorMessage from "@/app/components/shared/ErrorMessage";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Industry List",
  },
];

const IIndustrying = async ({ searchParams }: { searchParams?: { page?: string, limit?: string; search?: string } }) =>{
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const limit = searchParams?.limit ? parseInt(searchParams.limit) : 10;

  const search = searchParams?.search || "";

  const blogs = await fetchIndustries(page, limit);

  if (isServerError(blogs)) {
    <ErrorMessage error={blogs.error} />
    return
  }

  console.log("blogs..........", blogs.data)
  return (
      <PageContainer title="Industry List" description="this is Industry List">
        <Breadcrumb title="Industry List" items={BCrumb} />
        <BlankCard>
          <CardContent>
            <IIndustry  industries={blogs.data} totalPages={blogs.totalPage} currentPage={page} />
          </CardContent>
        </BlankCard>
      </PageContainer>
  );
}
export default IIndustrying;
