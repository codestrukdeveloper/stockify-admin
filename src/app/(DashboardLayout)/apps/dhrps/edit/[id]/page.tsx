import React from "react";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/app/components/container/PageContainer";
import EditDhrpsPage from "@/app/components/apps/dhrps/Edit-dhrps/index";
import BlankCard from "@/app/components/shared/BlankCard";
import { CardContent } from "@mui/material";
import { isServerError } from "@/app/(DashboardLayout)/action";
import ErrorMessage from "@/app/components/shared/ErrorMessage";
import { fetchDhrpById } from "../../action";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Dhrps Edit",
  },
];

const DhrpsEdit = async ({ params }: { params: { id: string } }) => {

  const dhrpData = await fetchDhrpById(params.id);

  if (isServerError(dhrpData)) {
    console.log("dhrpDataResponse", dhrpData)
    return <ErrorMessage error={dhrpData.error} />
  }

  return (
      <PageContainer title="Edit Dhrps" description="this is Edit Dhrps">
        <Breadcrumb title="Edit Dhrps" items={BCrumb} />
        <BlankCard>
          <CardContent>
            <EditDhrpsPage dhrpsData={dhrpData.data} />
          </CardContent>
        </BlankCard>
      </PageContainer>
  );
};

export default DhrpsEdit;
