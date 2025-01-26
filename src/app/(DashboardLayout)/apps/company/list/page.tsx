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
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const limit = searchParams?.limit ? parseInt(searchParams.limit) : 20;

  const search = searchParams?.search || "";

  const companies = await searchCompanies(page, limit, search);

  if (isServerError(companies)) {
    <ErrorMessage error={companies.error} />

    return
  }

  console.log("companies", companies)

  const searchCompaniesFunction = async () => {
    await searchCompanies(page, limit, search)
  }


  return (
    <PageContainer title="eCommerce Product List" description="this is eCommerce Product List">
      {/* Breadcrumb */}
      <Breadcrumb title="Stocks" items={BCrumb} />
      <BlankCard>
        <ProductTableList initialCompanies={companies.data} initialPage={page} initialSearch={search} />
      </BlankCard>
    </PageContainer>
  );
}
