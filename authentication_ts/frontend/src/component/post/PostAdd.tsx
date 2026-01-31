import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";

import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router";
import type { IPost } from "../../interface/post.interface";
import axios from "axios";

// yup schema
const schema = yup.object().shape({
  title: yup.string().required("title is a required field"),
  email: yup
    .string()
    .required("Email is a required field")
    .email()
    .required("valid email"),
  description: yup.string().required("description is a required field"),
  author: yup.string().required("author is a required field"),
  published: yup.boolean().required("published is a required field"),
  skills: yup.string().required("skills is a required field"),
});

const PostAdd: React.FC = () => {
  const { id } = useParams();
  const [mode, setMode] = useState("add");
  let navigate = useNavigate();
  const [skills, setSkills] = useState<string[]>(["cricket", "badminton"]);

  useEffect(() => {
    if (id) {
      setMode("edit");
      const fetchEmp = async () => {
        try {
          const response = await axios.get(
            "http://localhost:5000/api/posts/" + id,
          );
          setValue("title", response.data.data.title);
          setValue("email", response.data.data.email);
          setValue("description", response.data.data.description);
          setValue("author", response.data.data.author);
          setValue("published", response.data.data.published.toString());
          setValue("skills", response.data.data.skills[0]);
        } catch (error: any) {
          if (error.status == 422) {
            setMsg(error?.response?.data?.message);
            setMsgType("error");
            // navigate("employee/list");
          }
        }
      };
      fetchEmp();
    }
  }, []);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IPost>({ resolver: yupResolver(schema) });
  const formValues = watch();
  console.log(formValues);

  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");
  const onSubmit = async (data: IPost) => {
    try {
      const send_data = {
        title: data.title,
        email: data.email,
        description: data.description,
        author: data.author,
        published: data.published,
        skills: [data.skills],
      };
      let response: any;
      if (mode == "add") {
        response = await axios.post(
          "http://localhost:5000/api/posts",
          send_data,
        );
      } else {
        response = await axios.put(
          "http://localhost:5000/api/posts/" + id,
          send_data,
        );
      }

      if (response?.status === 201) {
        setMsg(response.data.message);
        setMsgType("success");
        navigate("/employee/list");
      }
    } catch (error: any) {
      if (error.status == 422) {
        setMsg(error?.response?.data?.message);
        setMsgType("error");
      }
    }
  };

  return (
    <Container>
      {msg && (
        <div style={{ color: msgType === "success" ? "green" : "red" }}>
          {msg}
        </div>
      )}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4">
            <Form.Label>title</Form.Label>
            <Form.Control
              type="text"
              placeholder="title"
              name="title"
              {...register("title")}
              isInvalid={!!errors.title}
            />

            <Form.Control.Feedback type="invalid">
              {errors.title && <p>{errors.title.message}</p>}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} md="4">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="email"
              name="email"
              {...register("email")}
              isInvalid={!!errors.email}
            />

            <Form.Control.Feedback type="invalid">
              {errors.email && <p>{errors.email.message}</p>}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} md="4">
            <Form.Label>Description</Form.Label>

            <FloatingLabel
              controlId="floatingTextarea"
              label="Description"
              className="mb-3"
            >
              <Form.Control
                as="textarea"
                placeholder="description"
                {...register("description")}
                isInvalid={!!errors.description}
              />
              <Form.Control.Feedback type="invalid">
                {errors.description?.message}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
        </Row>

        <Row>
          <Form.Group as={Col} md="4">
            <Form.Label>author</Form.Label>
            <Form.Control
              type="text"
              placeholder="author"
              name="author"
              {...register("author")}
              isInvalid={!!errors.author}
            />
            <Form.Control.Feedback type="invalid">
              {errors.author && <p>{errors.author.message}</p>}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} md="4">
            <Form.Label>Published</Form.Label>

            <Form.Check
              type="radio"
              id="published-yes"
              label="Yes"
              value="true"
              {...register("published")}
              isInvalid={!!errors.published}
            />

            <Form.Check
              type="radio"
              id="published-no"
              label="No"
              value="false"
              {...register("published")}
              isInvalid={!!errors.published}
            />
            {errors.published && (
              <div className="text-danger mt-1">{errors.published.message}</div>
            )}
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} md="4">
            <Form.Label>Skills</Form.Label>

            <Form.Select {...register("skills")} isInvalid={!!errors.skills}>
              <option value="">-- Select skills --</option>
              <option value="cricket">Cricket</option>
              <option value="badminton">Badminton</option>
              <option value="a">a</option>
              <option value="b">b</option>
            </Form.Select>

            <Form.Control.Feedback type="invalid">
              {errors.skills?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Button type="submit">Submit form</Button>
      </Form>
    </Container>
  );
};
export default PostAdd;
