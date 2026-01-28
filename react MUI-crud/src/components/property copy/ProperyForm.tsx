import { Box, TextField, Button, Paper } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { propertySchema } from "../../validations/Propery";
import type { PropertyFormValues } from "../../validations/Propery";

type Props = {
  onSave: (data: PropertyFormValues) => void;
  editData?: PropertyFormValues | null;
};

export default function PropertyForm({ onSave, editData }: Props) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PropertyFormValues>({
    resolver: yupResolver(propertySchema),
  });

  // 🔹 When editData changes, fill form
  useEffect(() => {
    if (editData) {
      reset(editData);
    }
  }, [editData, reset]);

  const onSubmit = (data: PropertyFormValues) => {
    onSave(data);
    reset();
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Property Name"
              fullWidth
              margin="normal"
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          )}
        />

        <Controller
          name="description"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Description"
              fullWidth
              margin="normal"
              error={!!errors.description}
              helperText={errors.description?.message}
            />
          )}
        />

        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          {editData ? "Update Property" : "Add Property"}
        </Button>
      </Box>
    </Paper>
  );
}
