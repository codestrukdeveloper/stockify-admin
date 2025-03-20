import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/app/components/container/PageContainer";
import BlankCard from "@/app/components/shared/BlankCard";
import BlogTableList from "@/app/components/apps/stocks/BlogTableList/BlogTableList";
import { blogService } from "@/utils/api/blog-service";
import { fetchBlogs } from "../action";
import { isServerError } from "@/app/(DashboardLayout)/action";
import ErrorMessage from "@/app/components/shared/ErrorMessage";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Blogs",
  },
];

export default async function BlogList() {
  const page =  1;
  const limit =10;


  const blogs = await fetchBlogs(page, limit);

  if (isServerError(blogs)) {
    <ErrorMessage error={blogs.error} />
    return
  }

  console.log("blogs..........", blogs.data)


  return (
    <PageContainer title="Blog List" description="this is Blog List">
      {/* Breadcrumb */}
      <Breadcrumb title="Blogs" items={BCrumb} />
      <BlankCard>
        <BlogTableList initialBlogs={blogs.data} totalPages={blogs.totalPage} />
      </BlankCard>
    </PageContainer>
  );
}
