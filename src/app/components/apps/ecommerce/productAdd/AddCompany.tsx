"use client"

import { Box, Button, Grid, Stack } from "@mui/material";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/app/components/container/PageContainer";
import CompanyLogoAndNameCard from "@/app/components/apps/ecommerce/productAdd/CompanyLogoAndNameCard";
import KeyIndicators from "@/app/components/apps/ecommerce/productAdd/KeyIndicators";
import CashFlowSummary from "@/app/components/apps/ecommerce/productAdd/CashFlowSummary";
import BalanceSheet from "@/app/components/apps/ecommerce/productAdd/BalanceSheet";
import ProfitLossSummary from "@/app/components/apps/ecommerce/productAdd/ProfitLossSummary";
import AboutTheCompany from "@/app/components/apps/ecommerce/productAdd/AboutTheCompany";
import React, { useEffect, useState } from "react";
import { ICompanyFull, IFaq, IFinancialResults, IFinancialResultsWithFile } from "@/app/(DashboardLayout)/types/apps/ICompany";
import { ISector } from "@/app/(DashboardLayout)/types/apps/sector";
import { IDeposit, IIndustry } from "@/app/(DashboardLayout)/types/apps/industry";
import { IPerformance } from "@/app/(DashboardLayout)/types/apps/peformance";
import { ICategory } from "@/app/(DashboardLayout)/types/apps/category";
import { IKeyIndicators } from "@/app/(DashboardLayout)/types/apps/IKeyIndicators";
import { IBalanceSheet } from "@/app/(DashboardLayout)/types/apps/IBalanceSheet";
import { ICashflowSum } from "@/app/(DashboardLayout)/types/apps/ICashflowSum";
import { IPriceTrend } from "@/app/(DashboardLayout)/types/apps/IPricingTrend.interface";
import { IProfitLosses } from "@/app/(DashboardLayout)/types/apps/IProfitLoss";
import EditableAddressAndManagement from "./EditableAddressManagement";
import { createCompanyAction, uploadImages } from "@/app/(DashboardLayout)/apps/company/action";
import { isServerError } from "@/app/(DashboardLayout)/action";
import { IError } from "@/app/(DashboardLayout)/types/apps/error";
import ErrorMessage from "@/app/components/shared/ErrorMessage";
import { createCompanyDto } from "@/schema/company.dto";
import ExcelUploader from "./ExcelUploader";
import FinancialResultUploader from "./FinancialResultUpload";
import { IShareholder } from "@/app/(DashboardLayout)/types/apps/IShareholder";
import ShareHolder from "./ShareHolders";
import { IDhrp } from "@/app/(DashboardLayout)/types/apps/IDhrp";
import FaqComponent from "./Faq";



const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Add Product",
  },
];

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

interface AddCompanyProps {
  sectors: ISector[];
  deposits: IDeposit[];
  industries: IIndustry[];
  performances: IPerformance[];
  categories: ICategory[];
  dhrps: IDhrp[];

}

const AddCompanyClient: React.FC<AddCompanyProps> = ({
  sectors,
  deposits,
  industries,
  performances,
  categories,
  dhrps
}) => {
  const [error, setError] = useState<IError>();
  const [logo, setLogo] = useState<File>();
  const [financialResults, setFinancialResults] = useState<IFinancialResultsWithFile[]>([]);

  const [formData, setFormData] = useState<ICompanyFull>({
    company: {
      name: "",
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
      videoLink:"",
      categoryId: "",
      industryId: "",
      sectorId: "",
      performanceId: "",
      depositsId: [],
      dhrpId: "",
      management: [],
      shareHolders: [],
      slug: "",
      financialResults: [],
      faq: []

    },
    profitLoss: [initialProfitLosses],
    priceTrend: [initialPriceTrend],
    keyIndicators: [keyIndicatorsInitialValue],
    balanceSheet: [initialBalanceSheet],
    cashFlow: [initialCashflowSum],
  });

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});



  useEffect(() => {
    if (Object.keys(validationErrors).length > 0) {
      const firstErrorKey = Object.keys(validationErrors)[0];
      const firstErrorElement = document.getElementById(firstErrorKey);
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({ behavior: "smooth", block: "center" });
        firstErrorElement.focus(); // Optional: Focus on the field
      }
    }

    if (validationErrors["company.industryId"]||validationErrors["company.performanceId"]||validationErrors["company.sectorId"]||validationErrors["company.categoryId"]||validationErrors["company.depositsId"]) {
      const shareholderSection = document.getElementById("company-section");
      if (shareholderSection) {
        shareholderSection.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }

    if (validationErrors["company.aboutus"]||validationErrors["company.videLink"]) {
      const shareholderSection = document.getElementById("company-about-section");
      if (shareholderSection) {
        shareholderSection.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }

    if (validationErrors["company.shareHolders"]) {
      const shareholderSection = document.getElementById("shareHolders-section");
      if (shareholderSection) {
        shareholderSection.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    };


    if (validationErrors["company.phone"]||validationErrors["company.email"]||validationErrors["company.pan"]||validationErrors["company.isin"]||validationErrors["company.website"]||validationErrors["company.management"]) {
      const shareholderSection = document.getElementById("company-information-section");
      if (shareholderSection) {
        shareholderSection.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }

    if (validationErrors["shareholders"]) {
      const shareholderSection = document.getElementById("shareholder-section");
      if (shareholderSection) {
        shareholderSection.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
    if (validationErrors["cashflow"]) {
      const shareholderSection = document.getElementById("cashflow-section");
      if (shareholderSection) {
        shareholderSection.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
    if (validationErrors["financialResults"]) {
      const shareholderSection = document.getElementById("balancesheet-financialResults");
      if (shareholderSection) {
        shareholderSection.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
    if (validationErrors["faq"]) {
      const shareholderSection = document.getElementById("faq-section");
      if (shareholderSection) {
        shareholderSection.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
    if (validationErrors["balancesheet"]) {
      const shareholderSection = document.getElementById("balancesheet-section");
      if (shareholderSection) {
        shareholderSection.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
    if (validationErrors["profitLoss"]) {
      const shareholderSection = document.getElementById("profitLoss-section");
      if (shareholderSection) {
        shareholderSection.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
    if (validationErrors["keyIndicators"]) {
      const shareholderSection = document.getElementById("keyIndicators-section");
      if (shareholderSection) {
        shareholderSection.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [validationErrors]);





  const onChangeCompany = <K extends keyof ICompanyFull["company"]>(
    key: K,
    value: ICompanyFull["company"][K]
  ) => {
    setFormData((prev) => ({
      ...prev,
      company: { ...prev.company, [key]: value },
    }));


  };


  const handleInputChange = (key: keyof ICompanyFull, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };


  const handleAddShareholder = (shareholder: IShareholder) => {
    setFormData((prev) => ({
      ...prev,
      company: {
        ...prev.company,
        shareHolders: [...(prev.company.shareHolders || []), shareholder], // Initialize as empty array if undefined
      },
    }));
  };

  // Handle removing a shareholder
  const handleRemoveShareholder = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      company: {
        ...prev.company,
        shareHolders: (prev.company.shareHolders || []).filter((_, i) => i !== index), // Initialize as empty array if undefined
      },
    }));
  };

  const handleSelectChange = (key: keyof ICompanyFull["company"], value: string) => {
    setFormData((prev) => ({
      ...prev,
      company: { ...prev.company, [key]: value },
    }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("formData", formData)


    const validationResult = createCompanyDto.safeParse(formData);


    console.log("ValidationResult", validationResult)

    if (!validationResult.success) {
      const errors: Record<string, string> = {};
      validationResult.error.errors.forEach((err) => {
        errors[err.path.join(".")] = err.message;
      });
      console.log("errors", errors)

      setValidationErrors(errors);
      return;
    }

    setValidationErrors({});

    try {
      const created = await createCompanyAction(formData);

      if (isServerError(created)) {
        setError(created.error);
      }
    } catch (error) {
      
      console.log("ERROR", error);
    }
  };

  const handleExcelUpload = (data: Partial<ICompanyFull>) => {
    console.log("Excel Data:", data);

    setFormData((prev) => {
      const updatedFormData = {
        ...prev,
        company: {
          ...prev.company,
          ...data.company,
        },
        profitLoss: data.profitLoss || prev.profitLoss,
        balanceSheet: data.balanceSheet || prev.balanceSheet,
        cashFlow: data.cashFlow || prev.cashFlow,
        keyIndicators: data.keyIndicators || prev.keyIndicators,
      };

      console.log("Updated FormData:", updatedFormData);
      return updatedFormData;
    });
  };

  const handleFinancialResultUpload = (data: { title: string; period: string; document: File }) => {
    setFinancialResults((prev) => ({
      ...prev,
      title: data.title,
      period: data.period,
      document: data.document.name,
    }));

    // Optionally, upload the file to a server or storage service
    // uploadFile(data.document);
    console.log("FInalicaionRes", financialResults)
  };

  const handleRemove = (index: number) => {
    setFinancialResults((prev) => {
      if (!Array.isArray(prev)) {
        return [];
      }
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleFaqChange = (faqs: IFaq[]) => {
    setFormData((prev) => ({
      ...prev,
      company: { ...prev.company, faq: faqs },
    }));
  };











  return (
    <PageContainer title="Add Product" description="this is Add Product">
      <Breadcrumb title="Add Product" items={BCrumb} />
      <form onSubmit={onSubmit} className="flex flex-col gap-5">
        <ExcelUploader onUpload={handleExcelUpload} oldData={formData} /> {/* Add the ExcelUploader component */}

        <CompanyLogoAndNameCard
          company={formData.company}
          onChange={(key, value) => onChangeCompany(key, value)}
          sectors={sectors}
          logo={logo}
          handleLogo={setLogo}
          industries={industries}
          dhrps={dhrps}
          performances={performances}
          deposits={deposits}
          categories={categories}
          validationErrors={validationErrors}
          id="company-section"

        />

        <KeyIndicators
          data={formData.keyIndicators}
          onChange={(updatedIndicators) =>
            handleInputChange("keyIndicators", updatedIndicators)
          }
          validationErrors={validationErrors}
          id="keyIndicators-section"
        />

        <AboutTheCompany
          aboutus={formData.company.aboutus}
          videoLink={formData.company.videoLink}
          onAboutChange={(about: string) =>
            handleInputChange("company", { ...formData.company, aboutus: about })
          }
          onVideoLinkChange={(newLink: string) =>
            handleInputChange("company", { ...formData.company, videoLink: newLink })
          }
          validationErrors={validationErrors}
          id="company-about-section"
        />

        <ProfitLossSummary
          data={formData.profitLoss}
          onChange={(updatedProfitLoss) =>
            handleInputChange("profitLoss", updatedProfitLoss)
          }
          validationErrors={validationErrors}
          id="profitLoss-section"
        />

        <BalanceSheet
          data={formData.balanceSheet}
          onChange={(updatedBalanceSheet) =>
            handleInputChange("balanceSheet", updatedBalanceSheet)
          }
          validationErrors={validationErrors}
          id="balancesheet-section"

        />

        <CashFlowSummary
          data={formData.cashFlow}
          onChange={(updatedCashFlow) =>
            handleInputChange("cashFlow", updatedCashFlow)
          }
          validationErrors={validationErrors}
          id="cashflow-section"

        />
        <ShareHolder
          shareholders={formData.company?.shareHolders || []}
          onAdd={handleAddShareholder}
          onRemove={handleRemoveShareholder}
          id="shareholder-section"

          validationErrors={validationErrors}

        />
        <br />
        <EditableAddressAndManagement
          address={formData.company.location}
          pan={formData.company.pan}
          isin={formData.company.isin}
          email={formData.company.email}
          phone={formData.company.phone}
          website={formData.company.website}
          management={formData.company.management}
          onAddressChange={(address) => onChangeCompany("location", address)}
          onPanChange={(pan) => onChangeCompany("pan", pan)}
          onIsinChange={(isin) => onChangeCompany("isin", isin)}
          onEmailChange={(email) => onChangeCompany("email", email)}
          onPhoneChange={(phone) => onChangeCompany("phone", phone)}
          onWebsiteChange={(website) => onChangeCompany("website", website)}
          onLocationChange={(location) => onChangeCompany("location", location)}
          location={formData.company.location}
          onManagementChange={(management) =>
            onChangeCompany("management", management)
          }
          validationErrors={validationErrors}
          id="company-introduction-section"

        />
        <br />

        <FinancialResultUploader
          onUpload={handleFinancialResultUpload}
          onRemove={handleRemove}
          financialResults={financialResults}
          id="financial-result-section"

        />
        <br />

        <FaqComponent
          faqs={formData.company.faq}
          onFaqChange={handleFaqChange}
          validationErrors={validationErrors}
          id='faq-section'
        />

        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </PageContainer>
  );
};

export default AddCompanyClient;