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
import { ICompany, ICompanyFull, ICompanyFullCreate, IFaq, IFinancialResults, IFinancialResultsWithFile } from "@/app/(DashboardLayout)/types/apps/ICompany";
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
import { createCompanyAction, updateCompany, updateCompanyLogo, uploadImages } from "@/app/(DashboardLayout)/apps/company/action";
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
import toast, { Toaster } from "react-hot-toast";
import ValidationErrors from "@/app/components/shared/ValidationError";
import { uploadFile } from "@/utils/api/uploadAction";



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

    if (validationErrors["company.industryId"] || validationErrors["company.logo"] || validationErrors["company.performanceId"] || validationErrors["company.sectorId"] || validationErrors["company.categoryId"] || validationErrors["company.depositsId"]) {
      const shareholderSection = document.getElementById("company-section");
      if (shareholderSection) {
        shareholderSection.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }

    if (validationErrors["company.aboutus"] || validationErrors["company.videoLink"]) {
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


    if (validationErrors["company.phone"] ||validationErrors["company.management"]|| validationErrors["company.email"] || validationErrors["company.pan"] || validationErrors["company.isin"] || validationErrors["company.website"] || validationErrors["company.management"]) {
      const shareholderSection = document.getElementById("company-information-section");
      if (shareholderSection) {
        shareholderSection.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }

    

    if (validationErrors["company.shareHolders"]) {
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
    if (validationErrors["company.financialResults"]) {
      const shareholderSection = document.getElementById("financial-result-section");
      if (shareholderSection) {
        shareholderSection.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
    if (validationErrors["company.faq"]) {
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
    console.log("validationErrors", validationErrors);

    if (validationErrors["KeyIndicators"]) { // Use "KeyIndicators" (uppercase K)
      console.log("KeyIndicators validation error detected:", validationErrors["KeyIndicators"]);
      const keyIndicatorsSection = document.getElementById("keyIndicators-section");
      if (keyIndicatorsSection) {
        keyIndicatorsSection.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
    if (validationErrors["KeyIndicators"]) { // Use "KeyIndicators" (uppercase K)
      console.log("KeyIndicators validation error detected:", validationErrors["KeyIndicators"]);
      const keyIndicatorsSection = document.getElementById("keyIndicators-section");
      if (keyIndicatorsSection) {
        keyIndicatorsSection.scrollIntoView({ behavior: "smooth", block: "center" });
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

    if (!logo) {
      setValidationErrors({ "company.logo": "logo is required" })
      toast.error("logo is required");
      return
    }

    if (financialResults.length < 1) {
      setValidationErrors({ "company.financialResults": "Financils Results is required" })
      toast.error("Financils Results is required");
      return
    }


    const validationResult = createCompanyDto.safeParse(formData);

    console.log("formData", formData)

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

      const data = validationResult.data.company as unknown as ICompany;
      const formData: ICompanyFullCreate = {
        ...data,
        profitLoss: validationResult.data.profitLoss || [],
        keyIndicators: validationResult.data.keyIndicators || [],
        balanceSheet: validationResult.data.balanceSheet || [],
        cashFlow: validationResult.data.cashFlow || [],
        priceTrend: validationResult.data.priceTrend || [],
      };

      const created = await createCompanyAction(formData);

      console.log("created", created)
      if (isServerError(created)) {
        let errorMessage = "An unexpected error occurred.";

        // Check if errors array exists and has entries
        if (Array.isArray(created.error?.errors) && created.error.errors.length > 0) {
          errorMessage = created.error.errors.join(", "); // Combine error messages
        } else if (created.error?.message) {
          errorMessage = created.error.message; // Use the single error message if present
        }

        if(errorMessage==="Company already exists with this name!"){
          setValidationErrors({"company.name":"Company already exists with this name!"})
        return
        }

        if(errorMessage==="Company already exists with this ticker!"||"Company already exists with this Ticker!"){
          setValidationErrors({"company.ticker":"Company already exists with this Ticker!"});
          return;
        }
        // Display the toast message
        toast.error(errorMessage);
        console.log("created.error", created.error)

        setError(created.error);
        return

      };

      console.log("Succcesfully created", created);

      const uploadedLogo = await uploadFile([logo], "stocks");
      console.log("uploadedLogo created", uploadedLogo);

      if (Array.isArray(uploadedLogo)) {
        const updatedCompanyWithLogo = await updateCompanyLogo(created._id!, uploadedLogo[0]);
        if (isServerError(updatedCompanyWithLogo)) {
          toast.error("Failed to update company logo");
          return;
        }
        console.log("Company logo updated:", updatedCompanyWithLogo);
      }

      console.log("financialResults:", financialResults);
      
      // Upload financial results
      const uploadedFinancialResults = await Promise.all(
        financialResults.map(async (result) => {
          const uploadedFile = await uploadFile([result.document], "financial-results");
          if (isServerError(uploadedFile)) {
            toast.error("Failed to update company logo");
            return;
          }
          return {
            title: result.title,
            period: result.period,
            document: uploadedFile[0], // Assuming uploadFile returns an array of URLs
          };
        })
      );
      console.log("Uploaded financial results:", uploadedFinancialResults);

      // Update company with financial results
      const updatedCompanyWithFinancialResults = await updateCompany(created._id!, {
        financialResults: uploadedFinancialResults,
      });
      if (isServerError(updatedCompanyWithFinancialResults)) {
        toast.error("Failed to update company with financial results");
        return;
      }
      console.log("Company updated with financial results:", updatedCompanyWithFinancialResults);

      toast.success("Company created and files uploaded successfully!");

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
    setFinancialResults((prev) => {
      if (!Array.isArray(prev)) {
        return [data]; // Ensure it's always an array
      }
      return [...prev, data]; // Append new entry to the array
    });
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
      <Toaster />
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
          id="company-information-section"

        />
        <br />

        <FinancialResultUploader
          onUpload={handleFinancialResultUpload}
          onRemove={handleRemove}
          financialResults={financialResults}
          id="financial-result-section"
          validationErrors={validationErrors}


        />
        <br />

        <FaqComponent
          faqs={formData.company.faq}
          onFaqChange={handleFaqChange}
          validationErrors={validationErrors}
          id='faq-section'
        />
        <ValidationErrors errors={validationErrors} />

        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </PageContainer>
  );
};

export default AddCompanyClient;