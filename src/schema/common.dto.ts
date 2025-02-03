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
    message: "Invalid id", // Custom error message
  });
export const idDto = z.object({
  _id: objectIdSchema
});

export const commonNumber = z.union([z.string(), z.number()]).transform((val) => {
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


export const commonString = z.union([z.string(), z.number()]).transform((value) => {
  // Convert to string if it's a number
  if (typeof value === "number") {
    return value.toString();
  }
  // Return the string as-is
  return value;
});

export const periodString = z.string().transform((data) => {
  // Try to parse the input as a date
  const date = new Date(data);

  // Check if the parsed date is valid
  if (!isNaN(date.getTime())) {
    // If it's a valid date, extract and return the year
    const year = date.getFullYear();
    return year.toString();
  }

  // If the input is not a valid date, return undefined (or null)
  throw new Error("invalid period")
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