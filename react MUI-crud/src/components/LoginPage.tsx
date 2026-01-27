import React from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type LoginFormInputs = {
  email: string;
  password: string;
};

const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Minimum 6 characters")
    .required("Password is required"),
});

const LoginPage: React.FC = () => {
  console.log("Rerender");
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: LoginFormInputs) => {
    console.log("Form Data:", data);
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper elevation={1} sx={{ p: 4, width: "100%" }}>
          <Typography variant="h5" align="center" gutterBottom>
            Login
          </Typography>

          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            {/* Email Field */}
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  fullWidth
                  margin="normal"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />

            {/* Password Field */}
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Password"
                  type="password"
                  fullWidth
                  margin="normal"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              )}
            />

            <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
              Login
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default LoginPage;
