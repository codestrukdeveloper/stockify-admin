import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/app/components/container/PageContainer";
import BlankCard from "@/app/components/shared/BlankCard";
import NewsTableList from "@/app/components/apps/stocks/NewsTableList/NewsTableList";
import { newsService } from "@/utils/api/news-service";
import { fetchNewss } from "../action";
import { isServerError } from "@/app/(DashboardLayout)/action";
import ErrorMessage from "@/app/components/shared/ErrorMessage";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Newss",
  },
];

export default async function NewsList() {
  const page =  1;
  const limit =10;


  const news = await fetchNewss(page, limit);

  if (isServerError(news)) {
    <ErrorMessage error={news.error} />
    return
  }



  return (
    <PageContainer title="News List" description="this is News List">
      {/* Breadcrumb */}
      <Breadcrumb title="News" items={BCrumb} />
      <BlankCard>
        <NewsTableList initialNewss={news.data} totalPages={news.totalPage} />
      </BlankCard>
    </PageContainer>
  );
}
