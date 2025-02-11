import React from 'react';
import { isServerError } from '@/app/(DashboardLayout)/action';
import ErrorMessage from '@/app/components/shared/ErrorMessage';
import EditVideoClient from '@/app/components/apps/video/edit/[id]/EditVideoClient';
import { fetchVideoById } from '../../action';

export default async function EditVideo({ params }: { params: { id: string } }) {
  console.log("edit data id", params?.id);
  const data = await fetchVideoById(params.id);
  console.log("edit data", data);

  if (isServerError(data)) {
    return (
      <div>
        <ErrorMessage error={data.error} />
      </div>
    );
  }

  return (
    <EditVideoClient data={data} />
  );
}