'use server'

import { redirect } from 'next/navigation';
import LayoutWrapper from './LayoutWrapper';
import { getLoggedIndetails, isServerError } from './action';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  // const data = await getLoggedIndetails();

  // if (isServerError(data)) {
  //   // if (data.error.message) {

  //   console.log("serverError", data.error);
  //   // redirect('/auth/auth1/login');
  //   // }
  // }

  return <LayoutWrapper>{children}</LayoutWrapper>;
}
