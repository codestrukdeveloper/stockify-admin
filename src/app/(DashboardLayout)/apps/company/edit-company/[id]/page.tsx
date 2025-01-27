import { fetchSectors } from "../../../sector/action";
import { fetchIndustries } from "../../../industry/action";
import { fetchPerformances } from "../../../performance/action";
import { isServerError } from "@/app/(DashboardLayout)/action";
import ErrorMessage from "@/app/components/shared/ErrorMessage";
import { fetchDeposits } from "../../../deposit/action";
import { fetchCompanyById } from "../../action";
import { ICashflowSum } from "@/app/(DashboardLayout)/types/apps/ICashflowSum";
import { IPriceTrend } from "@/app/(DashboardLayout)/types/apps/IPricingTrend.interface";
import { IProfitLosses } from "@/app/(DashboardLayout)/types/apps/IProfitLoss";
import { IBalanceSheet } from "@/app/(DashboardLayout)/types/apps/IBalanceSheet";
import { IKeyIndicators } from "@/app/(DashboardLayout)/types/apps/IKeyIndicators";
import { ICompanyFull } from "@/app/(DashboardLayout)/types/apps/ICompany";
import EditCompanyClient from "@/app/components/apps/ecommerce/productAdd/EditCompany";
import { fetchCategories } from "../../../category/action";
import { fetchDhrps } from "../../../dhrps/action";

const keyIndicatorsInitialValue: IKeyIndicators = {
  period: "2025",
  currentSharePrice: "0",
  faceValuePerShare: "0",
  bookValuePerShare: "0",
  priceToEarning: "0",
  priceToSales: "0",
  priceToBook: "0",
  outstandingSharesMillion: "0",
  marketCapMillionRs: "0",
  debtToEquity: "0",
  dividendPercentOnCMP: "0",
  dividendPerShare: "0",
  returnOnEquity: "0",
  returnOnTotalAssets: "0",
  rowc: "0",
};

const initialBalanceSheet: IBalanceSheet = {
  period: new Date().getFullYear().toString(),
  cashEqlt: "0",
  nonCurrentAsset: "0",
  currentAsset: "0",
  totalAsset: "0",
  eqShareCap: "0",
  reserves: "0",
  totalEq: "0",
  nonCurrentLiability: "0",
  currentLiability: "0",
  totalLiability: "0",
  totalEqLiability: "0",
  companyId: "",
};

const initialCashflowSum: ICashflowSum = {
  period: new Date().getFullYear().toString(),
  operatingAct: "0",
  investingAct: "0",
  financialAct: "0",
  netCashFlow: "0",
};

const initialPriceTrend: IPriceTrend = {
  price: "0",
  label: "",
  period: new Date().getFullYear().toString(),
};

const initialProfitLosses: IProfitLosses = {
  period: new Date().getFullYear().toString(),
  revenue: "0",
  expense: "0",
  ebdita: "0",
  otherCost: "0",
  pbt: "0",
  taxExpense: "0",
  pat: "0",
  otherIncExpense: "0",
  incomeNet: "0",
  outstandingShare: "0",
  epsPerShare: "0",
  revGrowth: "0",
  ebitaMargin: "0",
  patMargin: "0",
  epsGrowth: "0",
  companyId: "",
};
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
    profitLoss: companyData.profitLosses || [initialProfitLosses],
    cashFlow: companyData.cashFlow || [initialCashflowSum],
    keyIndicators: companyData.keyIndicators || [keyIndicatorsInitialValue],
    balanceSheet: companyData.balanceSheets || [initialBalanceSheet],
    company: {
      _id: companyData._id,
      name: companyData.name || "",
      ticker: companyData.ticker || "",
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
      depositsId: companyData.depositsId || [],
      dhrpId: companyData.dhrpId || "",
      management: companyData.management || [],
      slug: companyData.slug || "",
      financialResults: companyData.financialResults || [],
      faq: companyData.faq || [],
      shareHolders: companyData.shareHolders || [],
    },
    priceTrend: [initialPriceTrend],
  };
  console.log("profitLoss", companyDataHere.profitLoss)

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
