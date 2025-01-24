"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


export const useIndustries = (page: number, limit: number) => {
  return useQuery(
    ["industries", page, limit],
    () => fetchIndustries(page, limit),
    {
      keepPreviousData: true,
      staleTime: 5000, // Data is considered fresh for 5 seconds
    }
  );
};

export const useIndustryById = (id: number) => {
  return useQuery(["industry", id], () => getIndustryById(id), {
    enabled: !!id, // Only fetch if ID is provided
  });
};

export const useCreateIndustry = () => {
  const queryClient = useQueryClient();
  return useMutation(createIndustry, {
    onSuccess: () => {
      queryClient.invalidateQueries(["industries"]);
    },
  });
};

export const useUpdateIndustry = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ id, industryData }: { id: number; industryData: { name: string } }) =>
      updateIndustry(id, industryData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["industries"]);
        queryClient.invalidateQueries(["industry"]);
      },
    }
  );
};

export const useDeleteIndustry = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (id: number) => deleteIndustry(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["industries"]);
      },
    }
  );
};
