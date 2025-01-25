import { authService } from "@/utils/api/auth-service";
import { IServerError, IServerResponse } from "./types/apps/error";
import { IUser } from "./types/apps/users";

export const isServerError = <T>(response: IServerResponse<T>): response is IServerError => {
    return (
        response !== undefined && 
        response !== null && 
        typeof response === 'object' &&
        'error' in response &&
        (response as IServerError).error !== undefined
    );
};
export const getLoggedIndetails = async (): Promise<IServerResponse<IUser>> => {

    try {
        const data = await authService.getLoginDetails();
        console.log("response", data)
        return data;
    } catch (error: any) {
        console.error(":ERROR LOGIN DETILAS", error);
        return {
            error: {
                message: error.message,
                errors: error.errors
            }
        }




    }
}


export function handleErrorResponse(error: any): IServerResponse<any> {
    console.log("handleErrorResponse",error.response.data)
    return {
        error: {
            message: error.response?.data?.message || "An error occurred",
            errors: error.response?.data?.details||error.response?.data?.errors || [],
        },
    };
}
