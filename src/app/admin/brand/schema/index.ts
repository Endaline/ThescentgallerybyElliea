import z from "zod";

export const addBrand = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
});

export const editBrand = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
});

export type AddBrandType = z.infer<typeof addBrand>;
export type EditBrand = z.infer<typeof editBrand>;
