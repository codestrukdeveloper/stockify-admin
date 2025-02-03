import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/app/components/container/PageContainer";
import React from "react";
import CreateHome from "@/app/components/apps/home/List-Home";
import BlankCard from "@/app/components/shared/BlankCard";
import { CardContent } from "@mui/material";
import { fetchHome } from "../action";
import { isServerError } from "@/app/(DashboardLayout)/action";
import ErrorMessage from "@/app/components/shared/ErrorMessage";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Home",
  },
];

const ListHome =  async() => {
  const page =  1;
  const homeData = await fetchHome();
console.log("homeData", homeData);
  if (isServerError(homeData)) {
    return <ErrorMessage error={homeData.error} />
    
  }
  return (
      <PageContainer
        title="Home"
        description="this is Home"
      >
        <Breadcrumb title="Home" items={BCrumb} />

        <BlankCard>
          <CardContent>
            <CreateHome home={homeData.data}  />
          </CardContent>
        </BlankCard>
      </PageContainer>
  );
};
export default ListHome;
