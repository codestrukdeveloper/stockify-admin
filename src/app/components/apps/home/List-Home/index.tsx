import React from 'react'
import CreateHomeClient from './CreateHomeClient';
import { IHome } from '@/app/(DashboardLayout)/types/apps/home';

const CreateHome = ({ home: initialHome }: { home: IHome}) => {
  
  return (
    <CreateHomeClient initialHome={initialHome} />
  )
}

export default CreateHome