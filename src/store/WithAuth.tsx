import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import Loading from "@/app/loading";
import { useSelector } from "./hooks";
import { loginDetails } from "@/store/apps/auth/auth-action";
import { AppDispatch } from "./store";
import { hasError } from "./apps/auth/AuthSlice";
import { fetchCompanys } from "@/utils/api/company-action";
import { fetchSectors } from "@/utils/api/sector-api";
import { fetchIndustries } from "@/utils/api/industry-api";
import { fetchDhrps } from "@/utils/api/dhrps-api";
import { fetchDeposits } from "@/store/apps/deposits/deposits-action";

const WithAuth = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, isAuthenticated, loading, error } = useSelector((state: any) => state.authReducer);
  const [hasHandledError, setHasHandledError] = useState(false);

  useEffect(() => {
    dispatch(loginDetails());
  }, []);

  useEffect(() => {
    if (error && !hasHandledError) {
      console.log("Error");
      dispatch(hasError(null));
      setHasHandledError(true);
    }
  }, [error, hasHandledError, dispatch]);

  if (loading) {
    return <Loading />;
  }

  return <>{children}</>;
};

export default WithAuth;