import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";

import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import React, { useEffect, useState, useRef } from "react";
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
  const topRef = useRef<HTMLHeadingElement>(null);
  const [mode, setMode] = useState("add");
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState<"success" | "danger" | "">("");

  useEffect(() => {
    if (id) setMode("edit");
  }, [id]);

  useEffect(() => {
    if (msg && msgType === "danger") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      requestAnimationFrame(() => topRef.current?.focus());
    }
  }, [msg, msgType]);
  useEffect(() => {
    if (!id) return;
    const fetchPost = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`${BACKEND_URL}/api/post/${id}`);
        Object.entries(data.data).forEach(([k, v]) =>
          setValue(k as keyof IPost, v),
        );
        setValue("option_type", data.data.option_type);
        setValue("published", data.data.published.toString());
      } catch (error: any) {
        setMsg(
          error?.response?.data?.message ||
            error?.message ||
            "Something went wrong",
        );
        setMsgType("danger");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
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
  // const formValues = watch();
  // console.log(formValues);

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
        res = await axios.post(BACKEND_URL + "/api/post", send_data);
      } else {
        res = await axios.put(BACKEND_URL + "/api/post/" + id, send_data);
      }

      navigate("/post/list", {
        state: { msg: res.data.message, type: "success" },
      });
    } catch (error: any) {
      setMsg(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong",
      );
      setMsgType("danger");
      window.scrollTo({ top: 0, behavior: "smooth" });

      requestAnimationFrame(() => {
        topRef.current?.focus();
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center mt-5">
      <Card style={{ width: "500px" }}>
        <Card.Body>
          <Card.Title className="text-center mb-4" ref={topRef}>
            Post
          </Card.Title>

          {msg && (
            <Alert
              variant={msgType === "success" ? "success" : "danger"}
              className="text-center"
            >
              {msg}
            </Alert>
          )}

          <Form
            onSubmit={handleSubmit(onSubmit)}
            className={loading ? "opacity-50" : ""}
          >
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                autoFocus
                type="text"
                placeholder="Title"
                {...register("title")}
                isInvalid={!!errors.title}
              />
              <Form.Control.Feedback type="invalid">
                {errors.title?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                {...register("email")}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <FloatingLabel label="Description">
                <Form.Control
                  as="textarea"
                  style={{ height: "100px" }}
                  {...register("description")}
                  isInvalid={!!errors.description}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.description?.message}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                {...register("author")}
                isInvalid={!!errors.author}
              />
              <Form.Control.Feedback type="invalid">
                {errors.author?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Published</Form.Label>
              <div>
                <Form.Check
                  inline
                  type="radio"
                  label="Yes"
                  value="true"
                  {...register("published", {
                    setValueAs: (v) => v === "true",
                  })}
                />
                <Form.Check
                  inline
                  type="radio"
                  label="No"
                  value="false"
                  {...register("published", {
                    setValueAs: (v) => v === "true",
                  })}
                />
              </div>
              {errors.published && (
                <div className="text-danger small">
                  {errors.published.message}
                </div>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Option Type</Form.Label>
              <Form.Select
                {...register("option_type")}
                isInvalid={!!errors.option_type}
              >
                <option value="">-- Select --</option>
                <option value="AB">AB</option>
                <option value="BC">BC</option>
                <option value="CD">CD</option>
                <option value="DE">DE</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.option_type?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Skills</Form.Label>
              <Form.Select
                multiple
                {...register("skills")}
                isInvalid={!!errors.skills}
                onChange={(e) =>
                  setValue(
                    "skills",
                    Array.from(e.target.selectedOptions, (o) => o.value),
                    { shouldValidate: true },
                  )
                }
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

            <Form.Group className="mb-4">
              <Form.Label>Tags</Form.Label>
              {tagOptions.map((tag) => (
                <Form.Check
                  key={tag}
                  type="checkbox"
                  label={tag}
                  value={tag}
                  {...register("tags")}
                />
              ))}
              {errors.tags && (
                <div className="text-danger small">{errors.tags.message}</div>
              )}
            </Form.Group>

            <div className="d-flex gap-2 justify-content-center mt-3">
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save"}
              </Button>

              <Button
                variant="secondary"
                onClick={() => navigate(`/post/list`)}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
export default PostAdd;
