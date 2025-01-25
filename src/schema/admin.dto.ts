import { z } from "zod";
import { commonNumber } from "./common.dto";

export const CreateAdminDto = z.object({
    fullName: z.string().min(3).max(255),
    email: z.string().email(),
    phone: z.string().min(13).max(15),
    password: z.string().min(8).max(255),
}).refine((data)=>data.phone.startsWith("+91"),{
    message:"Phone number must start with +91"
});


export const LoginAdminDto = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(255),
});

export const FindAllAdminsDto = z.object({
    fullName: z.string().min(3).max(255).optional(),
    email: z.string().email().optional(),
    phone: z.string().min(10).max(15).optional(),
    limit: commonNumber.optional(),
    page: commonNumber.optional(),
});

export const UpdateAdminDto = z.object({
    _id: z.string(),
    fullName: z.string().min(3).max(255).optional(),
    email: z.string().email().optional(),
    phone: z.string().min(10).max(15).optional(),
}).refine((data)=>data.phone?.startsWith("+91"),{
    message:"Phone number must start with +91"
});

export const findAdminByIdDto = z.object({
    _id: z.string(),
})


export type UpdateAdminDto = z.infer<typeof UpdateAdminDto>;

export type CreateAdminDto = z.infer<typeof CreateAdminDto>;

export type FindAdminsDto = z.infer<typeof FindAllAdminsDto>;

export type FindAdminByIdDto = z.infer<typeof findAdminByIdDto>;


export type LoginAdminDto = z.infer<typeof LoginAdminDto>;

export type FindAllAdminsDto = z.infer<typeof FindAllAdminsDto>;

