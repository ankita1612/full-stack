import {
  TextField,
  Button,
  Box,
  Checkbox,
  FormControlLabel,
  RadioGroup,
  Radio,
  MenuItem,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
//import { employeeSchema } from "../../validations/Employee";
import type { Employee } from "../../types/Employee";
import { employeeSchema } from "../../validations/Employee";
import type { EmployeeFormValues } from "../../validations/Employee";
type Props = {
  onSave: (data: Employee) => void;
};

const hobbiesList = ["cricket", "football", "tennis"];

export default function EmployeeForm({ onSave }: Props) {
  const { control, handleSubmit, setValue } = useForm<EmployeeFormValues>({
    resolver: yupResolver(employeeSchema),
    // defaultValues: { hobbies: [], status: "Active" },
  });

  const onSubmit = (data: Employee) => {
    onSave({ ...data, id: Date.now() });
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="name"
        control={control}
        render={({ field }) => <TextField {...field} label="Name" fullWidth />}
      />

      <Controller
        name="salary"
        control={control}
        render={({ field }) => (
          <TextField {...field} label="Salary" fullWidth />
        )}
      />

      <Controller
        name="dob"
        control={control}
        render={({ field }) => <TextField {...field} type="date" fullWidth />}
      />

      {/* Hobbies */}
      {hobbiesList.map((hobby) => (
        <Controller
          key={hobby}
          name="hobbies"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={
                <Checkbox
                  checked={field.value.includes(hobby)}
                  onChange={(e) => {
                    const updated = e.target.checked
                      ? [...field.value, hobby]
                      : field.value.filter((h: string) => h !== hobby);
                    field.onChange(updated);
                  }}
                />
              }
              label={hobby}
            />
          )}
        />
      ))}

      {/* Status */}
      <Controller
        name="status"
        control={control}
        render={({ field }) => (
          <RadioGroup row {...field}>
            <FormControlLabel
              value="Active"
              control={<Radio />}
              label="Active"
            />
            <FormControlLabel
              value="Inactive"
              control={<Radio />}
              label="Inactive"
            />
          </RadioGroup>
        )}
      />

      {/* Degree */}
      <Controller
        name="highest_degree"
        control={control}
        render={({ field }) => (
          <TextField select label="Degree" fullWidth {...field}>
            <MenuItem value="post graduate">Post Graduate</MenuItem>
            <MenuItem value="graduate">Graduate</MenuItem>
            <MenuItem value="HSC">HSC</MenuItem>
          </TextField>
        )}
      />

      {/* File Upload */}
      <input
        type="file"
        onChange={(e) => setValue("profile_image", e.target.files?.[0] || null)}
      />

      <Button type="submit" variant="contained">
        Save
      </Button>
    </Box>
  );
}
