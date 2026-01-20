import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import type { loginInterface } from "../interface/login.interface";
import loginValidate from "../validation/login.validation";
import { Form, Button, Card, Container, Alert } from "react-bootstrap";
import { useNavigate } from "react-router";
import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Login = () => {
  let navigate = useNavigate();
  const [serverMsg, setServerMsg] = useState("");
  const [serverMsgType, setServerMsgType] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<loginInterface>({ resolver: yupResolver(loginValidate) });

  useEffect(() => {
    if (!serverMsg) return;

    const timer = setTimeout(() => {
      setServerMsg("");
    }, 5000);

    return () => clearTimeout(timer);
  }, [serverMsg]);

  const onSubmit = async (data: loginInterface) => {
    try {
      const userData = {
        email: data.email,
        password: data.password,
      };

      const result = await axios.post(BACKEND_URL + "api/auth/login", userData);
      const user_data = {
        name: result.data.data.user.name,
        token: result.data.data.token,
        id: result.data.data.user._id,
      };
      setServerMsg(result.data.message);
      setServerMsgType("success");
      localStorage.setItem("user_data", JSON.stringify(user_data));
      // navigate("/employee");
    } catch (error: any) {
      setServerMsg(error.response?.data?.message || "Server Error");
      setServerMsgType("fail");
    }
  };

  return (
    <Container className="d-flex justify-content-center mt-5">
      <Card style={{ width: "400px" }}>
        <Card.Body>
          <Card.Title className="text-center mb-4">Login</Card.Title>
          <div>
            {serverMsg && (
              <Alert
                variant={serverMsgType === "success" ? "success" : "danger"}
                className="mt-3"
              >
                {serverMsg}
              </Alert>
            )}
          </div>
          <Form onSubmit={handleSubmit(onSubmit)}>
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
            <Button
              variant="primary"
              type="submit"
              className="w-100"
              disabled={isSubmitting}
            >
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
