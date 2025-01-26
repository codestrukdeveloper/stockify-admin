import React from 'react';
import { isServerError } from '@/app/(DashboardLayout)/action';
import ErrorMessage from '@/app/components/shared/ErrorMessage';
import EditBlogClient from '@/app/components/apps/blog/edit/[id]/EditBlogClient';
import { fetchBlogBySlug } from '../../action';

export default async function EditBlog({ params }: { params: { slug: string } }) {
  const data = await fetchBlogBySlug(params.slug);
  console.log("data", data);

  if (isServerError(data)) {
    // Return a valid React component for the error message
    return (
      <div>
        <ErrorMessage error={data.error} />
      </div>
    );
  }

  return (
    <EditBlogClient data={data} />
  );
}