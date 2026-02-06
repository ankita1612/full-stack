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
import type { IEmployee } from "../../interface/employee.interface";

import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
type FormDataType = {
  multi_image: FileList | File[];
};
const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  single_image: yup
    .mixed()
    .required("Image is requireda")
    .test("fileType", "Only JPG or PNG files are allowed", (value) => {
      if (!value || !(value instanceof File)) return false;
      return ["image/jpeg", "image/png"].includes((value as File).type);
    })
    .test("fileSize", "File too large (max 2MB)", (value) => {
      if (!value || !(value instanceof File)) return false;
      return value.size <= 2 * 1024 * 1024;
    }),
  multi_image: yup
    .mixed()
    .test("required", "At least one file required", (value: any) => {
      return value && value.length > 0;
    }),
  DOB: yup
    .date()
    .typeError("Please select a valid date")
    .required("Date is required")
    //.min(new Date(), "Past dates are not allowed"),
    .max(new Date(), "Post dates are not allowed"),
});

const editSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  single_image: yup
    .mixed()
    .test("fileType", "Only JPG or PNG files are allowed", (value) => {
      if (!value) return true;
      if (!value || !(value instanceof File)) return false;
      return ["image/jpeg", "image/png"].includes((value as File).type);
    })
    .test("fileSize", "File too large (max 2MB)", (value) => {
      if (!value) return true;
      if (!value || !(value instanceof File)) return false;
      return value.size <= 2 * 1024 * 1024;
    }),
  DOB: yup
    .date()
    .typeError("Please select a valid date")
    .required("Date is required")
    //.min(new Date(), "Past dates are not allowed"),
    .max(new Date(), "Post dates are not allowed"),
});
function EmployeeAdd() {
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
    const fetchEmployee = async () => {
      setLoading(true);
      const stored = JSON.parse(localStorage.getItem("auth_data") || "{}");
      const token = stored?.accessToken;
      try {
        const { data } = await axios.get(`${BACKEND_URL}/api/employee/${id}`, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        // Object.entries(data.data).forEach(([k, v]) =>
        //   setValue(k as keyof IEmployee, v),
        // );
        setValue("title", data.data.title);
        if (data?.data?.title) {
          const date = new Date(data.data.DOB);
          setValue("DOB", date.toISOString().split("T")[0]);
        }
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

    fetchEmployee();
  }, [id]);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IEmployee>({
    resolver: yupResolver(mode == "edit" ? editSchema : schema),
    defaultValues: {},
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
  const onSubmit = async (data: IEmployee) => {
    setLoading(true);
    try {
      const stored = JSON.parse(localStorage.getItem("auth_data") || "{}");
      const token = stored?.accessToken;
      const header = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      const formData = new FormData();
      formData.append("title", data.title);
      formData.append(
        "DOB",
        typeof data.DOB === "string"
          ? data.DOB
          : new Date(data.DOB).toISOString().split("T")[0],
      );

      if (data.single_image) {
        formData.append("single_image", data.single_image);
      }
      console.log(data.multi_image);
      if (data.multi_image) {
        data.multi_image.forEach((file) => {
          formData.append("multi_image", file);
        });
      }
      let res: any;
      if (mode === "add") {
        res = await axios.post(`${BACKEND_URL}/api/employee`, formData, header);
      } else {
        res = await axios.put(
          `${BACKEND_URL}/api/employee/${id}`,
          formData,
          header,
        );
      }

      navigate("/employee/list", {
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
            Employee
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
            <Form.Group>
              <Form.Label>Upload single_image</Form.Label>
              <Form.Control
                type="file"
                accept=".jpg,.jpeg,.png"
                isInvalid={!!errors.single_image}
                onChange={(e) => {
                  const files = (e.target as HTMLInputElement).files;
                  setValue("single_image", files?.[0] as File);
                }}
              />
              <Form.Control.Feedback type="invalid">
                {errors.single_image?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Upload Multiple Files</Form.Label>

              <Form.Control
                type="file"
                multiple
                accept=".jpg,.jpeg,.png,.pdf"
                isInvalid={!!errors.multi_image}
                onChange={(e) => {
                  const files = (e.target as HTMLInputElement).files;
                  if (files) {
                    setValue("multi_image", Array.from(files)); // File[]
                  }
                }}
              />

              <Form.Control.Feedback type="invalid">
                {errors.multi_image?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Select Date</Form.Label>
              <Form.Control
                type="date"
                {...register("DOB")}
                isInvalid={!!errors.DOB}
              />
              <Form.Control.Feedback type="invalid">
                {errors.DOB?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <div className="d-flex gap-2 justify-content-center mt-3">
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save"}
              </Button>

              <Button
                variant="secondary"
                onClick={() => navigate(`/employee/list`)}
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
export default EmployeeAdd;
