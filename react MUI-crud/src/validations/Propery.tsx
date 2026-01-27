import * as yup from "yup";
import type { InferType } from "yup";

export const propertySchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Minimum 3 characters"),

  description: yup
    .string()
    .required("Description is required")
    .min(5, "Minimum 5 characters"),
});

export type PropertyFormValues = InferType<typeof propertySchema>;
