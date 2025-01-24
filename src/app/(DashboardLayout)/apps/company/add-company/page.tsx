import AddCompanyClient from "@/app/components/apps/ecommerce/productAdd/AddCompany";
import { fetchSectors } from "../../sector/action";
import { fetchIndustries } from "../../industry/action";
import { fetchPerformances } from "../../performance/action";
import { fetchCategories } from "@/app/components/apps/category/action";
import { isServerError } from "@/app/(DashboardLayout)/action";
import ErrorMessage from "@/app/components/shared/ErrorMessage";
import { fetchDeposits } from "../../deposit/action";
import { IIndustry } from "@/app/(DashboardLayout)/types/apps/industry";

export default async function AddCompany() {
  // Fetch data for sectors, industries, deposits, performances, and categories
  const sectorsResponse = await fetchSectors(1, 6);
  const industriesResponse = await fetchIndustries(1, 1);
  const depositsResponse = await fetchDeposits(1, 5);
  const performancesResponse = await fetchPerformances(1, 3);
  const categoriesResponse = await fetchCategories(1, 5);
  console.log("industriesResponse", industriesResponse);
  console.log("depositsResponse", depositsResponse);
  console.log("performancesResponse", performancesResponse);
  console.log("categoriesResponse", categoriesResponse);

  if (isServerError(categoriesResponse)) {
    console.log("categoriesResponse", categoriesResponse)
    return <ErrorMessage error={categoriesResponse.error} />
  }

  if (isServerError(performancesResponse)) {

    return <ErrorMessage error={performancesResponse.error} />
  }

  if (isServerError(depositsResponse)) {
    return <ErrorMessage error={depositsResponse.error} />
  };
  if (isServerError(industriesResponse)) {

    return <ErrorMessage error={industriesResponse.error} />
  }

  if (isServerError(sectorsResponse)) {

    return <ErrorMessage error={sectorsResponse.error} />
  }



 
  // console.log("SUBD",industriesResponse);




  return (
    <AddCompanyClient
      sectors={sectorsResponse.data}
      deposits={depositsResponse.data}
      performances={performancesResponse.data}
      categories={categoriesResponse.data}
      industries={industriesResponse.data}
    />
  );
}
