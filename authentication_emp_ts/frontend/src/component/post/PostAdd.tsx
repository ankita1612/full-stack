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
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const tagOptions = [
  "Suspense",
  "Informative",
  "Knowledge",
  "Religious",
  "Health",
];
// yup schema
const schema = yup.object().shape({
  title: yup.string().required("Please add title"),
  email: yup
    .string()
    .required("Please add email")
    .email()
    .required("valid email"),
  description: yup.string().required("Please add description"),
  author: yup.string().required("Please add author"),
  published: yup.boolean().required("Please select published"),
  option_type: yup.string().required("Please select option type"),
  skills: yup
    .array()
    .of(yup.string().required())
    .min(1, "Please select at least one skills")
    .required("Please select skills"),
  tags: yup
    .array()
    .of(yup.string())
    .min(1, "Select at least one tag")
    .required("Tags are required"),
});

const PostAdd: React.FC = () => {
  const { id } = useParams();
  const [mode, setMode] = useState("add");
  let navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setMode("edit");
      const fetchPost = async () => {
        try {
          const response = await axios.get(BACKEND_URL + "/api/posts/" + id);
          setValue("title", response.data.data.title);
          setValue("email", response.data.data.email);
          setValue("description", response.data.data.description);
          setValue("author", response.data.data.author);
          setValue("published", response.data.data.published.toString());
          setValue("option_type", response.data.data.option_type);
          setValue("tags", response.data.data.tags);
          setValue("skills", response.data.data.skills);
        } catch (error: any) {
          if (error.status == 422) {
            setMsg(error?.response?.data?.message);
            setMsgType("error");
            // navigate("post/list");
          }
        }
      };
      fetchPost();
    }
  }, []);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IPost>({
    resolver: yupResolver(schema),
    defaultValues: {
      skills: [],
      //  published: "false",
      tags: [],
    },
  });
  const formValues = watch();
  console.log(formValues);

  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");

  useEffect(() => {
    if (msg) {
      const timer = setTimeout(() => {
        setMsg("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [msg]);
  const onSubmit = async (data: IPost) => {
    try {
      const send_data = {
        title: data.title,
        email: data.email,
        description: data.description,
        author: data.author,
        published: data.published,
        option_type: data.option_type,
        tags: data.tags,
        skills: data.skills,
      };
      let response: any;
      if (mode == "add") {
        response = await axios.post(BACKEND_URL + "/api/posts", send_data);
      } else {
        response = await axios.put(BACKEND_URL + "/api/posts/" + id, send_data);
      }

      if (response?.status === 201) {
        setMsg(response.data.message);
        setMsgType("success");
        navigate("/post/list", {
          state: { msg: response?.data?.message, type: "success" },
        });
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
        <div className="d-flex justify-content-center mt-3">
          <div
            className={`alert ${
              msgType === "success" ? "alert-success" : "alert-danger"
            } text-center`}
            role="alert"
            style={{ minWidth: "300px" }}
          >
            {msg}
          </div>
        </div>
      )}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Form.Group as={Col} md="4">
            <Form.Label>Title</Form.Label>
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

            <FloatingLabel controlId="floatingTextarea" label="Description">
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
            <Form.Label>Option Type</Form.Label>
            <Form.Select
              {...register("option_type")}
              isInvalid={!!errors.option_type}
            >
              <option value="">-- Select Option Type --</option>
              <option value="AB">AB</option>
              <option value="BC">BC</option>
              <option value="CE">CD</option>
              <option value="DE">DE</option>
            </Form.Select>

            <Form.Control.Feedback type="invalid">
              {errors.option_type?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} md="4">
            <Form.Label>Skills</Form.Label>

            <Form.Select
              multiple
              isInvalid={!!errors.skills}
              {...register("skills")}
              onChange={(e) => {
                const values = Array.from(
                  e.target.selectedOptions,
                  (option) => option.value,
                );
                setValue("skills", values, { shouldValidate: true });
              }}
            >
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
        <Row>
          <Form.Group as={Col} md="6">
            <Form.Label>Tags</Form.Label>

            {tagOptions.map((tag) => (
              <Form.Check
                key={tag}
                type="checkbox"
                label={tag}
                value={tag}
                {...register("tags")}
                isInvalid={!!errors.tags}
              />
            ))}

            <Form.Control.Feedback type="invalid" className="d-block">
              {errors.tags?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <div className="mt-3 d-flex gap-2">
          <Button type="submit" variant="primary">
            Save
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
        </div>
      </Form>
    </Container>
  );
};
export default PostAdd;
