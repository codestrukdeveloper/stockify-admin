import React from "react";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/app/components/container/PageContainer";
import BlankCard from "@/app/components/shared/BlankCard";
import { CardContent } from "@mui/material";
import { fetchAuthors } from "../action";
import { isServerError } from "@/app/(DashboardLayout)/action";
import { ServerErrorRender } from "@/app/components/shared/ServerErrorRender";
import AuthorList from "@/app/components/apps/author/author-list";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Industry List",
  },
];

const AuthorListPage = async () => {
  const page = 1;
  const limit = 10;


  const authorsData = await fetchAuthors(page, limit);

  if (isServerError(authorsData)) {
    return <ServerErrorRender error={authorsData.error} />
  }
  return (
    <PageContainer title="Industry List" description="this is Industry List">
      <Breadcrumb title="Industry List" items={BCrumb} />
      <BlankCard>
        <CardContent>
          <AuthorList authorListData={authorsData.data} totalPages={authorsData.totalPage} currentPage={1}/>
        </CardContent>
      </BlankCard>
    </PageContainer>
  );
}
export default AuthorListPage;
