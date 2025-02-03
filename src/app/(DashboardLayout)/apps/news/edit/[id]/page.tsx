import React from 'react';
import { isServerError } from '@/app/(DashboardLayout)/action';
import ErrorMessage from '@/app/components/shared/ErrorMessage';
import EditNewsClient from '@/app/components/apps/news/edit/[id]/EditNewsClient';
import { fetchNewsById } from '../../action';

export default async function EditNews({ params }: { params: { id: string } }) {
  console.log("edit data id", params?.id);
  const data = await fetchNewsById(params.id);
  console.log("edit data", data);

  if (isServerError(data)) {
    return (
      <div>
        <ErrorMessage error={data.error} />
      </div>
    );
  }

  return (
    <EditNewsClient data={data} />
  );
}