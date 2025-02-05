import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/app/components/container/PageContainer";
import BlankCard from "@/app/components/shared/BlankCard";
import VideoTableList from "@/app/components/apps/ecommerce/VideoTableList/VideoTableList";
import { fetchVideos } from "../action";
import { isServerError } from "@/app/(DashboardLayout)/action";
import ErrorMessage from "@/app/components/shared/ErrorMessage";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Videos",
  },
];

export default async function VideoList() {
  const page =  1;
  const limit =10;


  const video = await fetchVideos(page, limit);

  if (isServerError(video)) {
    <ErrorMessage error={video.error} />
    return
  }

  console.log("video..........", video.data)


  return (
    <PageContainer title="Video List" description="this is Video List">
      {/* Breadcrumb */}
      <Breadcrumb title="Video" items={BCrumb} />
      <BlankCard>
        <VideoTableList initialVideos={video.data} totalPages={video.totalPage} />
      </BlankCard>
    </PageContainer>
  );
}
