import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/app/components/container/PageContainer";
import BlankCard from "@/app/components/shared/BlankCard";
import ProductTableList from "@/app/components/apps/ecommerce/ProductTableList/ProductTableList";
import { searchCompanies } from "../action";
import { isServerError } from "@/app/(DashboardLayout)/action";
import ErrorMessage from "@/app/components/shared/ErrorMessage";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Stocks",
  },
];

export default async function EcomProductList({ searchParams }: { searchParams?: { page?: string, limit?: string; search?: string } }) {


  const companies = await searchCompanies(1, 10, "");

  if (isServerError(companies)) {
    <ErrorMessage error={companies.error} />

    return
  }



  return (
    <PageContainer title="eCommerce Product List" description="this is eCommerce Product List">
      {/* Breadcrumb */}
      <Breadcrumb title="Stocks" items={BCrumb} />
      <BlankCard>
        <ProductTableList initialSearch="" initialCompanies={companies.data} totalPages={companies.totalPage}   initialPage={1}  />
      </BlankCard>
    </PageContainer>
  );
}
