import { z } from "zod";

export const addressSchema = z.object({
  id: z.string().optional(),
  label: z
    .string()
    .min(1, "Label is required")
    .max(50, "Label must be less than 50 characters"),
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name must be less than 50 characters"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name must be less than 50 characters"),
  company: z.string().optional(),
  phone: z
    .string()
    .min(1, "Phone is required")
    .max(20, "Phone must be less than 20 characters"),
  addressLine1: z
    .string()
    .min(1, "Address line 1 is required")
    .max(100, "Address line 1 must be less than 100 characters"),
  addressLine2: z.string().optional(),
  city: z
    .string()
    .min(1, "City is required")
    .max(50, "City must be less than 50 characters"),
  state: z
    .string()
    .min(1, "State is required")
    .max(50, "State must be less than 50 characters"),
  postalCode: z
    .string()
    .min(1, "Postal code is required")
    .max(20, "Postal code must be less than 20 characters"),
  country: z
    .string()
    .min(1, "Country is required")
    .max(50, "Country must be less than 50 characters"),
});

export type Address = z.infer<typeof addressSchema>;
