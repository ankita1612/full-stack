import * as yup from "yup";
import type { InferType } from "yup";

export const employeeSchema = yup.object({
  name: yup.string().required(),
  salary: yup.number().required(),
  dob: yup.string().required(),
  hobbies: yup.array().of(yup.string()).required(),
  status: yup.mixed<"Active" | "Inactive">().required(),
  highest_degree: yup.mixed<"post graduate" | "graduate" | "HSC">().required(),
  profile_image: yup.mixed<File>().nullable().notRequired(),
});

// 👇 THIS IS STEP 2
export type EmployeeFormValues = InferType<typeof employeeSchema>;
