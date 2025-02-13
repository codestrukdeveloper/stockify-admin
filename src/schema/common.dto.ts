import { GenderType } from "@/enum/user.enum";
import { z } from "zod";

export const objectIdSchema = z.string()
  .optional() // Allow the field to be optional
  .refine((id) => {
    // If the string is empty, return true (valid)
    if (id === "") return true;
    // Otherwise, validate the length
    return id && id?.length > 20;
  }, {
    message: "Invalid id",
  });
export const idDto = z.object({
  _id: objectIdSchema
});

export const commonNumber = z.union([z.string(), z.number()]).transform((val) => {
  console.log("val", val);
  if (typeof val === "string") {
    const parsed = parseFloat(val);
    if (isNaN(parsed)) {
      throw new Error("Invalid number");
    }
    return parsed;
  }
  return val;
});
export const allDataDto = z.object({
  page: z
    .union([z.string(), commonNumber])
    .default(1)
    .transform((val) => Number(val) || 1),
  limit: z
    .union([z.string(), commonNumber])
    .default(10)
    .transform((val) => Number(val) || 10),
  sortBy: z.enum(["asc", "desc"]).default("desc"),
  sortField: z.enum(["byCreation", "byAlphabet"]).default("byCreation"),
  search: z.string().optional(),
});
export const commonAnyDate = z.string().refine((val) => {
  return !val || !isNaN(Date.parse(val));
}, {
  message: "Invalid date format",
});

export const genderEnum = z.enum([GenderType.MALE, GenderType.FEMALE, GenderType.OTHER]);

// export const commonString = z.union([z.string(), commonNumber]).transform((value) =>
// typeof value === "number" ? value.toString() : value
// );


export const phoneSchema = z
  .string({ required_error: "Phone number is required" })
  .max(25, "Phone number must be at most 25 characters")
  // .refine(
  //   (value) => /^[0-9]{10,12}$/.test(value),
  //   { message: "Phone number must be a valid 10 to 12-digit number" }
  // );

export const commonString = z.union([z.string(), z.number()]).transform((value) => {
  // Convert to string if it's a number
  if (typeof value === "number") {
    return value.toString();
  }
  // Return the string as-is
  return value;
});


export const periodString = z.string()
  .refine(
    (data) => {
      const year = parseInt(data, 10);
      
      if (!isNaN(year) && year >= 1900 && year <= 9999) {
        return true;
      }
      
      return false; 
    },
    {
      message: "Invalid year. Please enter a valid year between 1900 and 9999."
    }
  )
  .transform((data) => {
    return data.toString();
  });

export const searchDto = z.object({
  search: z.string().optional(),
  searchBy: z.string().optional(),
  searchIn: z.string().optional(),
  searchType: z.string().optional(),
  searchFields: z.array(z.string()).optional(),
  page: commonNumber.default(1),
  limit: commonNumber.default(10),
  sortBy: z.enum(["asc", "desc", "oldest", "latest"]).default("latest"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export type idDto = z.infer<typeof idDto>;
export type allDataDto = z.infer<typeof allDataDto>;
export type searchDto = z.infer<typeof searchDto>;


export interface QueryResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}