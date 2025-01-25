import { handleErrorResponse } from "@/app/(DashboardLayout)/action";
import { uploadService } from "./upload-service";


export const uploadFile =  async(file:File[],folder:string) => {
    try {
        const response = await uploadService.upload(file,folder);
        
        return response.data.data;

    } catch (error: any) {
        console.log("ERROR", error?.response)
        return handleErrorResponse(error);

        

    }
};