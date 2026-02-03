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
const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  email: yup.string().email("Enter valid email").required("Email required"),
  description: yup.string().required("Description is required"),
  author: yup.string().required("Author is required"),
  published: yup.boolean().required("Published is required"),
  option_type: yup.string().required("Option type is required"),
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

function PostAdd() {
  const { id } = useParams();
  const [mode, setMode] = useState("add");
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState<"success" | "error" | "">("");
  useEffect(() => {
    if (id) setMode("edit");
  }, [id]);

  useEffect(() => {
    if (!id) return;
    let mounted = true;

    const fetchPost = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`${BACKEND_URL}/api/posts/${id}`);
        Object.entries(data.data).forEach(([k, v]) =>
          setValue(k as keyof IPost, v),
        );
      } catch {
        setMsg("Failed to load post");
        setMsgType("error");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
    return () => {
      mounted = false;
    };
  }, [id]);
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

  useEffect(() => {
    if (msg) {
      const timer = setTimeout(() => {
        setMsg("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [msg]);
  const onSubmit = async (data: IPost) => {
    setLoading(true);
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
      let res: any;
      if (mode == "add") {
        res = await axios.post(BACKEND_URL + "/api/posts", send_data);
      } else {
        res = await axios.put(BACKEND_URL + "/api/posts/" + id, send_data);
      }

      navigate("/post/list", {
        state: { msg: res.data.message, type: "success" },
      });
    } catch (error: any) {
      setMsg(error.response?.data?.message || "Request failed");
      setMsgType("error");
    } finally {
      setLoading(false);
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
              type="email"
              placeholder="email"
              {...register("email")}
              isInvalid={!!errors.email}
            />

            <Form.Control.Feedback type="invalid">
              {errors.email?.message}
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
              {...register("author")}
              isInvalid={!!errors.author}
            />
            <Form.Control.Feedback type="invalid">
              {errors.author?.message}
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
              {...register("published", {
                setValueAs: (v: string) => v === "true",
              })}
              isInvalid={!!errors.published}
            />

            <Form.Check
              type="radio"
              id="published-no"
              label="No"
              value="false"
              {...register("published", {
                setValueAs: (v: string) => v === "true",
              })}
              isInvalid={!!errors.published}
            />

            {errors.published && (
              <Form.Control.Feedback type="invalid" className="d-block">
                {errors.published.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} md="4">
            <Form.Label>Option Type</Form.Label>
            <Form.Select
              {...register("option_type")}
              isInvalid={!!errors.option_type}
              aria-invalid={!!errors.option_type}
            >
              <option value="">-- Select Option Type --</option>
              <option value="AB">AB</option>
              <option value="BC">BC</option>
              <option value="CD">CD</option>
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
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save"}
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
}
export default PostAdd;
