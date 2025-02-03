import CreateNews from '@/app/components/apps/news/create/page';
import PageContainer from '@/app/components/container/PageContainer';

const CreateNewsPage = () => {
  return (
    <PageContainer title="News Create" description="this is News Create">
      <CreateNews />
    </PageContainer>
  );
};

export default CreateNewsPage;
