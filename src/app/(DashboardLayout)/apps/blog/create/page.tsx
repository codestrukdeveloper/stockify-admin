import CreateBlog from '@/app/components/apps/blog/create';
import PageContainer from '@/app/components/container/PageContainer';

const CreateBlogPage = () => {
  return (
    <PageContainer title="Blog Create" description="this is Blog Create">

      <CreateBlog />
    </PageContainer>
  );
};

export default CreateBlogPage;
