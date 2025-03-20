import AddCompanyClient from "@/app/components/apps/stocks/productAdd/AddCompany";
import { fetchSectors } from "../../sector/action";
import { fetchIndustries } from "../../industry/action";
import { fetchPerformances } from "../../performance/action";
import { isServerError } from "@/app/(DashboardLayout)/action";
import ErrorMessage from "@/app/components/shared/ErrorMessage";
import { fetchDeposits } from "../../deposit/action";
import { ICompanyFull } from "@/app/(DashboardLayout)/types/apps/ICompany";
import { fetchCategories } from "../../category/action";
import { fetchDhrps } from "../../dhrps/action";
import { initialBalanceSheet, initialCashflowSum, initialProfitLosses, keyIndicatorsInitialValue } from "../edit-company/[id]/constant";

export default async function AddCompany() {
  const sectorsResponse = await fetchSectors(1, 100);
  const industriesResponse = await fetchIndustries(1, 100);
  const depositsResponse = await fetchDeposits(1, 100);
  const performancesResponse = await fetchPerformances(1, 100);
  const categoriesResponse = await fetchCategories(1, 100);
  const dhrpResponse = await fetchDhrps(1, 100);

  // console.log("industriesResponse", industriesResponse);
  // console.log("depositsResponse", depositsResponse);
  // console.log("performancesResponse", performancesResponse);
  // console.log("categoriesResponse", categoriesResponse);
  // console.log("dhrpResponse", dhrpResponse);


  if (isServerError(categoriesResponse)) {
    // console.log("categoriesResponse", categoriesResponse)
    return <ErrorMessage error={categoriesResponse.error} />
  }

  if (isServerError(performancesResponse)) {

    return <ErrorMessage error={performancesResponse.error} />
  };
  if (isServerError(dhrpResponse)) {

    return <ErrorMessage error={dhrpResponse.error} />
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

  console.log("balanceSheet", );

  const companyData:ICompanyFull={
    profitLoss:[initialProfitLosses],
    cashFlow:[initialCashflowSum],
    keyIndicators:[keyIndicatorsInitialValue],
    balanceSheet:[initialBalanceSheet],
    company: {
      name: "",
      metaTitle:"",
      seoHeader:"",
      seoContent:"",
      metaDescription:"",
      keywords:[],
      ticker: "",
      isin: "",
      location: "",
      rating: undefined,
      price: undefined,
      qty: undefined,
      minQty: undefined,
      maxQty: undefined,
      lot: undefined,
      email: "",
      phone: "",
      website: "",
      aboutus: "",
      logo: "",
      videoLink: "",
      categoryId: "",
      industryId: "",
      sectorId: "",
      performanceId: "",
      depositsId: [],
      dhrpId: "",
      management: [],
      slug: "",
      financialResults: [],
      faq: [],
      shareHolders: [],

    },
    priceTrend:[]

  }

  return (
    <AddCompanyClient
      sectors={sectorsResponse.data || []}
      deposits={depositsResponse.data || []}
      performances={performancesResponse.data || []}
      categories={categoriesResponse.data || []}
      industries={industriesResponse.data || []}
      dhrps={dhrpResponse.data || []}
      companyData={companyData}
    />
  );
}
