import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import type { loginInterface } from "../interface/login.interface";
import loginValidate from "../validation/login.validation";
import { Form, Button, Card, Container, Alert } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router";
import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import { useAuth } from "../context/AuthContext";
import apiClient from "../utils/apiClient";

const Login = () => {
  let navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState<"success" | "danger" | "">("");
  const location = useLocation();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<loginInterface>({ resolver: yupResolver(loginValidate) });

  // Message from navigation
  useEffect(() => {
    if (location.state?.msg) {
      setMsg(location.state.msg);
      setMsgType(location.state.type);
    }
  }, [location.state]);

  useEffect(() => {
    if (msg) {
      const timer = setTimeout(() => {
        setMsg("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [msg]);

  const onSubmit = async (data: loginInterface) => {
    try {
      const userData = {
        email: data.email,
        password: data.password,
      };

      const result = await apiClient.post("/api/auth/login", userData);
      const user_data = {
        accessToken: result.data.data.accessToken,
        user: {
          username: result.data.data.user.name,
          id: result.data.data.user._id,
        },
      };
      //console.log(user_data);
      //localStorage.setItem("user_data", JSON.stringify(user_data));

      //context API
      login(user_data.accessToken, user_data.user);
      //end context API
      navigate("/post/list");
    } catch (error: any) {
      setMsg(error.response?.data?.message || "Login failed");
      setMsgType("danger");
    }
  };

  return (
    <Container className="d-flex justify-content-center mt-5">
      <Card style={{ width: "400px" }}>
        <Card.Body>
          <Card.Title className="text-center mb-4">Login</Card.Title>
          <div>
            {msg && (
              <Alert
                variant={msgType === "success" ? "success" : "danger"}
                className="text-center"
              >
                {msg}
              </Alert>
            )}
          </div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                autoFocus
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
            <Button type="submit" className="w-100" disabled={isSubmitting}>
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};
export default Login;
