import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form, Button, Card, Container, Alert } from "react-bootstrap";
import registrationValidate from "../validation/registration.validations";
import type { registrationInterface } from "../interface/registrations.interface";

import { useNavigate } from "react-router-dom";
//const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import apiClient from "../utils/apiClient";

const Registration = () => {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState<"success" | "danger" | "">("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<registrationInterface>({
    resolver: yupResolver(registrationValidate),
  });

  useEffect(() => {
    if (!msg) return;

    const timer = setTimeout(() => {
      setMsg("");
    }, 5000);

    return () => clearTimeout(timer);
  }, [msg]);

  const onSubmit = async (data: registrationInterface) => {
    try {
      data.status = "active";
      const result = await apiClient.post("/api/auth/register", data);
      setMsg(result.data.message);
      setMsgType("success");
      return navigate("/login", {
        state: { msg: result.data.message, type: "success" },
      });
    } catch (error: any) {
      setMsg(error.response?.data?.message || "Server Error");
      setMsgType("danger");
    }
  };

  return (
    <Container className="d-flex justify-content-center mt-5">
      <Card style={{ width: "400px" }}>
        <Card.Body>
          <Card.Title className="text-center mb-4">Register</Card.Title>
          <div>
            {msg && (
              <Alert
                variant={msgType === "success" ? "success" : "danger"}
                className="mt-3"
              >
                {msg}
              </Alert>
            )}
          </div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                {...register("name")}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                {...register("email")}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                {...register("password")}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                {...register("confirmPassword")}
                isInvalid={!!errors.confirmPassword}
              />
              <Form.Control.Feedback type="invalid">
                {errors.confirmPassword?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                {...register("DOB", {
                  setValueAs: (value: Date) => (value ? new Date(value) : null),
                })}
                isInvalid={!!errors.DOB}
              />
              <Form.Control.Feedback type="invalid">
                {errors.DOB?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="w-100"
              disabled={isSubmitting}
            >
              Register
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Registration;
