import Breadcrumb from '@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb';
import PageContainer from '@/app/components/container/PageContainer';
import NewsListing from '@/app/components/apps/news/NewsListing';

const News = () => {
  return (
    <PageContainer title="News" description="this is News">
      <Breadcrumb title="News app" subtitle="Get the latest news" />
      {/* ------------------------------------------- */}
      {/* News Listing */}
      {/* ------------------------------------------- */}
      <NewsListing />
    </PageContainer>
  );
};

export default News;
