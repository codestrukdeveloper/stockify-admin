import React from "react";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/app/components/container/PageContainer";
import BlankCard from "@/app/components/shared/BlankCard";
import { CardContent } from "@mui/material";
import { isServerError } from "@/app/(DashboardLayout)/action";
import { fetchAuthorById } from "../../action";
import { ServerErrorRender } from "@/app/components/shared/ServerErrorRender";
import EditAuthor from "@/app/components/apps/author/Edit-author";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Industry Edit",
  },
];

const EditAuthorPage = async ({ params }: { params: { id: string } }) => {
  console.log("authorsparamsparams", params.id);
  const authorData = await fetchAuthorById(params.id);

  if (isServerError(authorData)) {
    return <ServerErrorRender error={authorData.error} />
  }
  console.log("Server", authorData);
  return (
    <PageContainer title="Edit Industry" description="this is Edit Industry">
      <Breadcrumb title="Edit Industry" items={BCrumb} />
      <BlankCard>
        <CardContent>
          <EditAuthor initialData={authorData.data} />
        </CardContent>
      </BlankCard>
    </PageContainer>
  );
};

export default EditAuthorPage;
