import { authService } from "@/utils/api/auth-service";
import { useMutation, useQuery } from "@tanstack/react-query";


export const useLogin = () => {
    return useMutation(
        {
            mutationFn: async ({ email, password }: { email: string; password: string }) => {
                const data = await authService.login(email, password );
                console.log("data",data)
                return data;
            },

            onError: (error: any) => {
                const errorMessage = error.response.data;
                return errorMessage||error
               
            },
            onSuccess: (data) => {
                console.log("data")
            },
        },

    );
};

export const useLoginDetails = () => {

    return useQuery(
        {
            queryKey: ["me"],
            queryFn: async () => {
                const data = await authService.getLoginDetails()
                console.log("data",data)
                return data;
            },
            throwOnError:true,
            
        },
    );
}