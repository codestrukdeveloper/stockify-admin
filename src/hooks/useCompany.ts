import { ICompany, ICompanyFull } from "@/app/(DashboardLayout)/types/apps/ICompany"
import { companyService } from "@/utils/api/company-service"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useCreateCompany = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (companyData: ICompanyFull) => companyService.createCompany(companyData),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['companies'] })
    //   toast.success('Company created successfully')
    },
    onError: (error) => {
    //   toast.error('Failed to create company')
      console.error(error)
    }
  })
}

export const useGetCompanyById = (id: string) => {
  return useQuery({
    queryKey: ['company', id],
    queryFn: () => companyService.fetchCompanyById(id),
    enabled: !!id
  })
};


export const useGetCompanyAll = (pageNo:number,limit:number,searchQuery:string="") => {
    return useQuery({
      queryKey: ['companies', pageNo,limit,searchQuery],
      queryFn: () => companyService.searchCompanies(pageNo,limit,searchQuery),
    //   enabled: !!id
    })
  };

export const useDeleteCompanyById = (id: string) => {
    const queryClient = useQueryClient()
  
    return useMutation({
      mutationFn: (id:string) => companyService.deleteCompanyById(id),
      onSuccess: (data) => {
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ['companies'] })
      //   toast.success('Company created successfully')
      },
      onError: (error) => {
      //   toast.error('Failed to create company')
        console.error(error)
      }
    })
  }

export const useUpdateCompany = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string, data: Partial<ICompanyFull> }) => 
      companyService.updateCompany(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['company', variables.id] })
      queryClient.invalidateQueries({ queryKey: ['companies'] })
    //   toast.success('Company updated successfully')
    },
    onError: (error) => {
    //   toast.error('Failed to update company')
      console.error(error)
    }
  })
}