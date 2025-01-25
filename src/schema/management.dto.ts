import { z } from "zod";
import { objectIdSchema } from "./common.dto";



export const createManagementDto = z.object({
    name: z.string().max(100, "Name must not exceed 100 characters"),
    position: z.string().max(50, "Percent must not exceed 50 characters"),
});

export const updateManagementDto = createManagementDto;


export type CreateManagementDto = z.infer<typeof createManagementDto>;
export type UpdateManagementDto = z.infer<typeof updateManagementDto>;
