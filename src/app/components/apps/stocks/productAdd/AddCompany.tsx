"use client"

import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/app/components/container/PageContainer";
import CompanyLogoAndNameCard from "@/app/components/apps/stocks/productAdd/CompanyLogoAndNameCard";
import KeyIndicators from "@/app/components/apps/stocks/productAdd/KeyIndicators";
import CashFlowSummary from "@/app/components/apps/stocks/productAdd/CashFlowSummary";
import BalanceSheet from "@/app/components/apps/stocks/productAdd/BalanceSheet";
import ProfitLossSummary from "@/app/components/apps/stocks/productAdd/ProfitLossSummary";
import AboutTheCompany from "@/app/components/apps/stocks/productAdd/AboutTheCompany";
import React, { useEffect, useState } from "react";
import { ICompany, ICompanyFull, ICompanyFullExtended, IFaq, IFinancialResults, IFinancialResultsWithFile } from "@/app/(DashboardLayout)/types/apps/ICompany";
import { ISector } from "@/app/(DashboardLayout)/types/apps/sector";
import { IIndustry } from "@/app/(DashboardLayout)/types/apps/industry";
import { IPerformance } from "@/app/(DashboardLayout)/types/apps/peformance";
import { ICategory } from "@/app/(DashboardLayout)/types/apps/category";
import EditableAddressAndManagement from "./EditableAddressManagement";
import { createCompanyAction, fetchPriceTrendsBySlug, updateCompany, updateCompanyLogo, uploadImages } from "@/app/(DashboardLayout)/apps/company/action";
import { isServerError } from "@/app/(DashboardLayout)/action";
import { IError } from "@/app/(DashboardLayout)/types/apps/error";
import { createCompanyDto, updateCompanyDto } from "@/schema/company.dto";
import FinancialResultUploader from "./FinancialResultUpload";
import { IShareholder } from "@/app/(DashboardLayout)/types/apps/IShareholder";
import ShareHolder from "./ShareHolders";
import { IDhrp } from "@/app/(DashboardLayout)/types/apps/IDhrp";
import FaqComponent from "./Faq";
import toast, { Toaster } from "react-hot-toast";
import ValidationErrors from "@/app/components/shared/ValidationError";
import { uploadFile } from "@/utils/api/uploadAction";
import SEOMetaFields from "./SeoMetaFields";
import { IDeposit } from "@/app/(DashboardLayout)/types/apps/deposit";
import { ExcelUploader } from "./ExcelUploader";
import { CompanyOtherUploadData } from "./CompanyOtherUploadData";
import CombinedExcelUploader from "./CombineUploader";
import PriceTrends from "./PriceTrends";



const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Add Product",
  },
];



interface AddCompanyProps {
  sectors: ISector[];
  deposits: IDeposit[];
  industries: IIndustry[];
  performances: IPerformance[];
  categories: ICategory[];
  dhrps: IDhrp[];
  companyData: ICompanyFull,
}

const AddCompanyClient: React.FC<AddCompanyProps> = ({
  sectors,
  deposits,
  industries,
  performances,
  categories,
  dhrps,
  companyData,
}) => {

  console.log("companyData", companyData)
  const [error, setError] = useState<IError>();
  const [loading, setLoading] = useState<boolean>(false);

  const [logo, setLogo] = useState<File>();
  const [name, setName] = useState<string>("");

  const [financialResults, setFinancialResults] = useState<IFinancialResultsWithFile[]>([]);
  const [formData, setFormData] = useState<ICompanyFull>(companyData);

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

    if (validationErrors["company.industryId"] || validationErrors["company.slug"] || validationErrors["company.logo"] || validationErrors["company.performanceId"] || validationErrors["company.sectorId"] || validationErrors["company.categoryId"] || validationErrors["company.depositsId"]) {
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


    if (validationErrors["company.phone"] || validationErrors["company.management"] || validationErrors["company.email"] || validationErrors["company.pan"] || validationErrors["company.isin"] || validationErrors["company.website"] || validationErrors["company.management"]) {
      const shareholderSection = document.getElementById("company-information-section");
      if (shareholderSection) {
        shareholderSection.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }

    if (validationErrors["priceTrend"]) {
      const shareholderSection = document.getElementById("priceTrends-section");
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
    };

    if (validationErrors["company.metaDescription"] || validationErrors["company.metaTitle"] || validationErrors["company.keywords"]) { // Use "KeyIndicators" (uppercase K)
      console.log("KeyIndicators validation error detected:", validationErrors["KeyIndicators"]);
      const keyIndicatorsSection = document.getElementById("seo-section");
      if (keyIndicatorsSection) {
        keyIndicatorsSection.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [validationErrors]);


  useEffect(() => {
    if (companyData && (!companyData.company.aboutus || !companyData.company.videoLink)) {
      setFormData((prev) => ({
        ...prev,
        company: {
          ...prev.company,
          aboutus: prev.company.aboutus || "",
          videoLink: prev.company.videoLink || "",
        },
      }));
    }
  }, [companyData]);


  const onChangeCompany = <K extends keyof ICompanyFull["company"]>(
    key: K,
    value: ICompanyFull["company"][K]
  ) => {
    setFormData((prev) => ({
      ...prev,
      company: { ...prev.company, [key]: value },
    }));

    if (key === "name" && typeof value === "string") {
      setName(value);
    }
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

    if (!logo && !formData.company.logo?.startsWith("https")) {
      setValidationErrors({ "company.logo": "logo is required" })
      toast.error("logo is required");
      return
    }

    if (financialResults.length < 1 && formData.company.financialResults.length < 1) {
      setValidationErrors({ "company.financialResults": "Financial Results is required" })
      toast.error("Financial Results is required");
      return
    }


    let validationResult = createCompanyDto.safeParse(formData);



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
      let uploadedLogo = formData.company.logo;
      if (logo) {
        const uploadLogo = await uploadFile([logo], "stocks");
        console.log("uploadedLogo created", uploadLogo);
        if (isServerError(uploadLogo) || !uploadLogo?.length) {
          toast.error("Failed to upload logo");
        }

        uploadedLogo = uploadLogo[0];

      }

      console.log("financialResults:", financialResults);

      let financialResultsUploaded = formData.company.financialResults;

      if (financialResults) {



        const uploadedFinancialResults: any[] = await Promise.all(
          financialResults.map(async (result) => {
            const uploadedFile = await uploadFile([result.document], "financial-results");

            if (isServerError(uploadedFile) || !uploadedFile?.length) {
              toast.error("Failed to upload financial result document");
              return null;
            }

            return {
              title: result.title,
              period: result.period,
              document: uploadedFile[0], // Assuming uploadFile returns an array of URLs
            };
          })
        );

        // Filter out any `null` values in case of upload failures
        const validUploadedResults = uploadedFinancialResults.filter(Boolean);
        financialResultsUploaded = [...financialResultsUploaded, ...validUploadedResults];

      }
      // console.log("Company updated with financial results:", uploadedFinancialResults);


      const data = validationResult.data.company as unknown as ICompany;

      console.log("priceTrend", validationResult.data.priceTrend)


      const formDataT: ICompanyFullExtended = {
        ...data,
        logo: uploadedLogo + "",
        financialResults: financialResultsUploaded,
        profitLoss: validationResult.data.profitLoss || [],
        keyIndicators: validationResult.data.keyIndicators || [],
        balanceSheet: validationResult.data.balanceSheet || [],
        cashFlow: validationResult.data.cashFlow || [],
        priceTrend: validationResult.data.priceTrend || [],
      };

      let created;
      console.log("formData", formData)



      created = await createCompanyAction(formDataT);

      console.log("created", created)
      if (isServerError(created)) {
        let errorMessage = "An unexpected error occurred.";

        // Check if errors array exists and has entries
        if (Array.isArray(created.error?.errors) && created.error.errors.length > 0) {
          errorMessage = created.error.errors.join(", "); // Combine error messages
        } else if (created.error?.message) {
          errorMessage = created.error.message; // Use the single error message if present
        }

        if (errorMessage === "Company already exists with this name!") {
          setValidationErrors({ "company.name": "Company already exists with this name!" })
          return
        };

        console.log("ERRORMEssag", errorMessage)

        if (errorMessage === "Company already exists with this ticker!" || errorMessage === "Company already exists with this Ticker!") {
          setValidationErrors({ "company.ticker": "Company already exists with this Ticker!" });
          return
        }
        // Display the toast message
        toast.error(errorMessage);
        console.log("created.error", created.error)

        setError(created.error);
        return

      };

      console.log("Succcesfully created", created);


      toast.success("Company created and files uploaded successfully!");
      setValidationErrors({})

    } catch (error) {
      console.log("ERROR", error);
    }
  };
  const handleExcelUpload = (data: Partial<ICompanyFull>) => {
    console.log("Excel Data:", data);

    if (data.company) {
      if (data.company.name) {
        setName(data.company.name);
      }
      const dhrpName = Array.isArray(data.company.dhrpId) ? data.company.dhrpId[0] : data.company.dhrpId;
      const industryName = Array.isArray(data.company.industryId) ? data.company.industryId[0] : data.company.industryId;
      const sectorName = Array.isArray(data.company.sectorId) ? data.company.sectorId[0] : data.company.sectorId;
      const categoryName = Array.isArray(data.company.categoryId) ? data.company.categoryId[0] : data.company.categoryId;

      const depositsNames = Array.isArray(data.company.depositsId) ? data.company.depositsId : [data.company.depositsId];

      console.log("categoryName", categoryName);

      const dhrpId = dhrps?.find((d) => d.name.toLowerCase() === dhrpName?.toLowerCase())?._id;
      const sectorId = sectors?.find((d) => d.name.toLowerCase() === sectorName?.toLowerCase())?._id;
      const industryId = industries?.find((d) => d.name.toLowerCase() === industryName?.toLowerCase())?._id;
      const categoryId = categories?.find((d) => d.name.toLowerCase() === categoryName?.toLowerCase())?._id;

      const depositsIds = depositsNames
        .map((name) => deposits?.find((d) => d.name.toLowerCase() === name?.toLowerCase())?._id)
        .filter((id): id is string => Boolean(id));



      console.log("categoryId", categoryId);

      if (!dhrpId && dhrpName) {
        toast.error("DHRP not found. Create DHRP first, then select it.");
      } else {
        data.company.dhrpId = dhrpId;
      }

      if (!industryId && industryName) {
        toast.error("Industry not found. Create Industry first, then select it.");
      } else {
        data.company.industryId = industryId;
      }

      if (!sectorId && sectorName) {
        toast.error("Sector not found. Create Sector first, then select it.");
      } else {
        data.company.sectorId = sectorId;
      }

      if (!depositsIds.length && depositsNames.some(name => name)) {
        toast.error("Deposits not found. Create deposits first, then select them.");
      } else {
        data.company.depositsId = depositsIds;
      }

      if (!categoryId && !categoryName) {
        toast.error("Category not found. Create category first, then select them.");
      } else {
        data.company.categoryId = categoryId;
      }
    }

    setFormData((prev) => {
      const updatedFormData = {
        ...prev,
        company: {
          ...prev.company,
          ...data.company,
        },
        // profitLoss: data.profitLoss || prev.profitLoss,
        // balanceSheet: data.balanceSheet || prev.balanceSheet,
        // cashFlow: data.cashFlow || prev.cashFlow,
        // keyIndicators: data.keyIndicators || prev.keyIndicators,
      };

      console.log("Updated FormData:", updatedFormData);
      return updatedFormData;
    });

    setValidationErrors({});
  };

  const handleExcelUploadData = (data: Partial<ICompanyFull>) => {
    setFormData((prev) => {
      const updatedFormData = {
        ...prev,
        profitLoss: data.profitLoss || prev.profitLoss,
        balanceSheet: data.balanceSheet || prev.balanceSheet,
        cashFlow: data.cashFlow || prev.cashFlow,
        keyIndicators: data.keyIndicators || prev.keyIndicators,
      };

      console.log("Updated FormData:", updatedFormData);
      return updatedFormData;
    });

    setValidationErrors({});
  };


  const handleFinancialResultUpload = (data: { title: string; period: string; document: File }) => {
    setFinancialResults((prev) => {
      if (!Array.isArray(prev)) {
        return [data]; // Ensure it's always an array
      }
      return [...prev, data]; // Append new entry to the array
    });
    setValidationErrors({})

  };
  const handleRemove = (index: number) => {
    setFinancialResults((prev) => {
      if (!Array.isArray(prev)) {
        return [];
      }
      return prev.filter((_, i) => i !== index);
    });
    setValidationErrors({})

  };
  const handleRemoveFinancialResults = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      company: {
        ...prev.company,
        financialResults: prev.company.financialResults?.filter((_, i) => i !== index) || [],
      },
    }));
  };


  const handleFaqChange = (faqs: IFaq[]) => {
    setFormData((prev) => ({
      ...prev,
      company: { ...prev.company, faq: faqs },
    }));
    setValidationErrors({})

  };


  const handleMetaTitleChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      company: { ...prev.company, metaTitle: value },
    }));
    setValidationErrors({})

  };

  const handleMetaDescriptionChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      company: { ...prev.company, metaDescription: value },
    }));
    setValidationErrors({})
  };
  const handleSeoHeaderChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      company: { ...prev.company, seoHeader: value },
    }));
    setValidationErrors({})
  };

  const handleSeoContentChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      company: { ...prev.company, seoContent: value },
    }));
    setValidationErrors({})
  };

  const handleKeywordsChange = (value: string[]) => {
    setFormData((prev) => ({
      ...prev,
      company: { ...prev.company, keywords: value },
    }));
    setValidationErrors({})

  };

  const handleFetchPriceTrends = async () => {
    setLoading(true);
    try {
      console.log("SLUG", name);
      const response = await fetchPriceTrendsBySlug(name || "");
      console.log("Response PriceTrends", response);

      if (isServerError(response)) {
        toast.error(response.error?.message || "Error getting");
        return;
      }
      console.log("Response PriceTrends", response);
      if (response.length < 0) {
        toast.error(`Price Trend not found for:${name} `)
      }
      setFormData((prev) => {
        const existingPriceTrends = prev.priceTrend || [];
  
        // Merge old and new price trends, avoiding duplicates
        const updatedPriceTrends = [
          ...existingPriceTrends, 
          ...response.map((res) => ({
            period: res.period,
            price: res.price,
            label: res.period,
          })),
        ].filter((trend, index, self) =>
          index === self.findIndex((t) => t.period === trend.period) // Remove duplicates based on `period`
        );
  
        const updatedFormData: ICompanyFull = {
          ...prev,
          priceTrend: updatedPriceTrends,
        };
  
        console.log("Updated FormData:", updatedFormData);
        return updatedFormData;
      });
  

      setValidationErrors({});
    } catch (error) {
      console.error("Failed to fetch price trends:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    console.log("formData updated:", formData);
  }, [formData]);
  return (
    <PageContainer title="Add Product" description="this is Add Product">
      <Toaster />
      <Breadcrumb title="Add Product" items={BCrumb} />
      <form onSubmit={onSubmit} className="flex flex-col gap-5">

        <CombinedExcelUploader
          onUpload={(data, type) => {
            if (type === 'company') {
              handleExcelUpload(data);
            } else {
              handleExcelUploadData(data);
            }
          }}
          oldData={formData} />

        <CompanyLogoAndNameCard
          company={formData.company}
          onChange={(key, value) => onChangeCompany(key, value)}
          sectors={sectors}
          logo={logo || formData.company.logo}
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


        <PriceTrends
          data={formData.priceTrend}
          onChange={(priceTrend) =>
            handleInputChange("priceTrend", priceTrend)
          }
          validationErrors={validationErrors}
          handleFetchPriceTrends={handleFetchPriceTrends}
          id="priceTrends-section"
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
          handleRemoveFinancialResults={handleRemoveFinancialResults}
          financialResults={financialResults}
          uploaded={formData.company.financialResults}
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

        <br />

        <SEOMetaFields
          metaTitle={formData.company.metaTitle || ""}
          metaDescription={formData.company.metaDescription || ""}
          keywords={formData.company.keywords || []}
          seoHeader={formData.company.seoHeader || ""}
          seoContent={formData.company.seoContent || ""}
          onMetaTitleChange={handleMetaTitleChange}
          onMetaDescriptionChange={handleMetaDescriptionChange}
          onKeywordsChange={handleKeywordsChange}
          onSeoHeaderChange={handleSeoHeaderChange}
          onSeoContentChange={handleSeoContentChange}
          validationErrors={validationErrors}
          id="seo-section"
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