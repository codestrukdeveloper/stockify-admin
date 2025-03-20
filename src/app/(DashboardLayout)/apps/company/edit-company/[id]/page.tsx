import { fetchSectors } from "../../../sector/action";
import { fetchIndustries } from "../../../industry/action";
import { fetchPerformances } from "../../../performance/action";
import { isServerError } from "@/app/(DashboardLayout)/action";
import ErrorMessage from "@/app/components/shared/ErrorMessage";
import { fetchDeposits } from "../../../deposit/action";
import { fetchCompanyById } from "../../action";
import { ICompanyFull } from "@/app/(DashboardLayout)/types/apps/ICompany";
import EditCompanyClient from "@/app/components/apps/stocks/productAdd/EditCompany";
import { fetchCategories } from "../../../category/action";
import { fetchDhrps } from "../../../dhrps/action";
import { initialBalanceSheet, initialCashflowSum, initialProfitLosses, keyIndicatorsInitialValue } from "./constant";

const handleError = (response: any) => {
  if (isServerError(response)) {
    return <ErrorMessage error={response.error} />;
  }
  return null;
};

export default async function AddCompany({ params }: { params: { id: string } }) {
  const sectorsResponse = await fetchSectors(1, 100);
  const industriesResponse = await fetchIndustries(1, 100);
  const depositsResponse = await fetchDeposits(1, 100);
  const performancesResponse = await fetchPerformances(1, 100);
  const categoriesResponse = await fetchCategories(1, 100);
  const dhrpResponse = await fetchDhrps(1, 100);
  const companyData = await fetchCompanyById(params.id);

  // console.log("industriesResponse", industriesResponse);
  // console.log("depositsResponse", depositsResponse);
  // console.log("performancesResponse", performancesResponse);
  // console.log("categoriesResponse", categoriesResponse);
  // console.log("dhrpResponse", dhrpResponse);



  if (isServerError(categoriesResponse)) {
    console.log("categoriesResponse", categoriesResponse)
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
  };

  if (isServerError(companyData)) {

    return <ErrorMessage error={companyData.error} />
  }

  console.log("companyData", companyData);


  const companyDataHere: ICompanyFull = {
    profitLoss: companyData.profitLoss || [initialProfitLosses],
    cashFlow: companyData.cashFlow || [initialCashflowSum],
    keyIndicators: companyData.keyIndicators || [keyIndicatorsInitialValue],
    balanceSheet: companyData.balanceSheet || [initialBalanceSheet],
    company: {
      _id: companyData._id,
      name: companyData.name || "",
      ticker: companyData.ticker || "",
      seoHeader:companyData.seoHeader||"",
      seoContent:companyData.seoContent||"",
      isin: companyData.isin || "",
      location: companyData.location || "",
      rating: companyData.rating,
      price: companyData.price,
      pan: companyData.pan,
      qty: companyData.qty,
      minQty: companyData.minQty,
      maxQty: companyData.maxQty,
      lot: companyData.lot,
      email: companyData.email || "",
      phone: companyData.phone || "",
      metaTitle: companyData.metaTitle || "",
      metaDescription: companyData.metaDescription || "",
      keywords: companyData.keywords || [],
      website: companyData.website || "",
      aboutus: companyData.aboutus || "",
      logo: companyData.logo || "",
      videoLink: companyData.videoLink || "",
      categoryId: companyData.categoryId || "",
      industryId: companyData.industryId || "",
      sectorId: companyData.sectorId || "",
      performanceId: companyData.performanceId || "",
      ipoDate: companyData.ipoDate|| "",
      preIpoDate:companyData.preIpoDate||"",
      ipoPrice: companyData.ipoPrice|| "",
      depositsId: companyData.depositsId || [],
      dhrpId: companyData.dhrpId || "",
      management: companyData.management || [],
      slug: companyData.slug || "",
      financialResults: companyData.financialResults || [],
      faq: companyData.faq || [],
      shareHolders: companyData.shareHolders || [],
    },
    priceTrend: companyData.priceTrend||[],
  };
  console.log("balanceSheet", companyData.balanceSheet)

  return (
    <EditCompanyClient
      sectors={sectorsResponse.data || []}
      deposits={depositsResponse.data || []}
      performances={performancesResponse.data || []}
      categories={categoriesResponse.data || []}
      industries={industriesResponse.data || []}
      dhrps={dhrpResponse.data || []}
      companyData={companyDataHere || []}
    />
  );
}
