import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/app/components/container/PageContainer";
import BlankCard from "@/app/components/shared/BlankCard";
import ProductTableList from "@/app/components/apps/ecommerce/ProductTableList/ProductTableList";
import { ICompany } from "@/app/(DashboardLayout)/types/apps/company";
import { companyService } from "@/utils/api/company-service";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Stocks",
  },
];

export default async function EcomProductList({ searchParams }: { searchParams?: { page?: string,limit?:string; search?: string } }) {
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const limit = searchParams?.limit ? parseInt(searchParams.limit) : 20;

  const search = searchParams?.search || "";

  // Fetch companies from API on the server side
    const companies = await companyService.searchCompanies(page, limit, search);
    
    console.log("companies",companies)


  return (
    <PageContainer title="eCommerce Product List" description="this is eCommerce Product List">
      {/* Breadcrumb */}
      <Breadcrumb title="Stocks" items={BCrumb} />
      <BlankCard>
        <ProductTableList initialCompanies={companies} initialPage={page} initialSearch={search} />
      </BlankCard>
    </PageContainer>
  );
}
