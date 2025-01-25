import { z } from "zod";
import { genderEnum } from "./common.dto";

const phoneRegex = /^[0-9]{10}$/;
const aadharRegex = /^[0-9]{12}$/;
const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
const dematRegex = /^[0-9]{16}$/;

export const createUserDto = z.object({
    phone: z.string().regex(phoneRegex, 'Invalid phone number'),
    countryCode: z.string().min(1, 'Country code is required'),
});


export const loginUserDto = z.object({
    phone: z.string().regex(phoneRegex, 'Invalid phone number'),
});

const DocumentBaseDto = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  dob: z.string().or(z.date()).transform((str) => new Date(str)).refine(date => !isNaN(date.getTime()), 'Invalid date format'),
  verified: z.boolean().optional(),
  verifiedAt: z.date().optional()
});

export const updateDocumentDto=z.object({
    documents:z.object({
        aadhar: z.object({
          ...DocumentBaseDto.shape,
          aadharNumber: z.string().regex(aadharRegex, 'Invalid Aadhar number')
        }).optional(),
        pan: z.object({
          ...DocumentBaseDto.shape,
          panNumber: z.string().regex(panRegex, 'Invalid PAN number')
        }).optional(),
        demat: z.object({
          ...DocumentBaseDto.shape,
          dematNumber: z.string().regex(dematRegex, 'Invalid Demat number')
        }).optional()
    })
});

export const UserDto = z.object({
  firstName: z.string().min(1, 'First name is required').optional(),
  lastName: z.string().min(1, 'Last name is required').optional(),
  displayName: z.string().optional().optional(),
  email: z.string().email('Invalid email format').optional(),
  phone: z.string().regex(phoneRegex, 'Invalid phone number').optional(),
  gender: genderEnum.optional(),

  countryCode: z.string().min(1, 'Country code is required').optional(),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must contain uppercase, lowercase, number and special character'
    ).optional(),
    documents:z.object({
        aadhar: z.object({
          ...DocumentBaseDto.shape,
          aadharNumber: z.string().regex(aadharRegex, 'Invalid Aadhar number')
        }).optional(),
        pan: z.object({
          ...DocumentBaseDto.shape,
          panNumber: z.string().regex(panRegex, 'Invalid PAN number')
        }).optional(),
        demat: z.object({
          ...DocumentBaseDto.shape,
          dematNumber: z.string().regex(dematRegex, 'Invalid Demat number')
        }).optional()
    })

});




export const UpdateUserDto = UserDto.partial().extend({
  _id: z.string().min(1, 'User ID is required')
});


export const verifyLoginOtpDto = z.object({
    otp: z.string().length(4, "OTP must be 4 digits"),
    phone: z.string(),
});



export type UserDocumentDtoType = z.infer<typeof updateDocumentDto>;


export type UserDtoType = z.infer<typeof UserDto>;
export type CreateUserDtoType = z.infer<typeof createUserDto>;
export type LoginUserDtoType = z.infer<typeof loginUserDto>;
export type UpdateUserDtoType = z.infer<typeof UpdateUserDto>;


export type VerifyLoginOtpDto = z.infer<typeof verifyLoginOtpDto>;

