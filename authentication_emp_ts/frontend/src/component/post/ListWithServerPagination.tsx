import Container from "react-bootstrap/Container";
import React, { useEffect, useState, useCallback, useRef } from "react";
import { Button, Table, Spinner, Form } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import type { IPost } from "../../interface/post.interface";
import PostRow from "./PostRow";
import Alert from "react-bootstrap/Alert";
import apiClient from "../../utils/apiClient";
import "bootstrap-icons/font/bootstrap-icons.css";

function ListWithServerPagination() {
  const [postData, setPostData] = useState<IPost[]>([]);
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState<"success" | "danger" | "">("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [total, setTotal] = useState(0);
  const searchRef = useRef<HTMLInputElement>(null);

  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("_id");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  // Auto hide message
  useEffect(() => {
    if (!msg) return;
    const timer = setTimeout(() => setMsg(""), 5000);
    return () => clearTimeout(timer);
  }, [msg]);

  // Message from navigation
  useEffect(() => {
    if (location.state?.msg) {
      setMsg(location.state.msg);
      setMsgType(location.state.type);
    }
  }, [location.state]);

  // Fetch posts
  const fetchData = useCallback(async () => {
    const controller = new AbortController();
    setLoading(true);

    try {
      const { data } = await apiClient.get("/api/post/serverPagination", {
        signal: controller.signal,
        params: {
          page,
          limit,
          search,
          sortField,
          sortOrder,
        },
      });

      setPostData(data.data);
      setTotal(data.total);
    } catch (error: any) {
      if (error.name !== "CanceledError") {
        setMsg(
          error?.response?.data?.message ||
            error?.message ||
            "Failed to load posts",
        );
        setMsgType("danger");
      }
    } finally {
      setLoading(false);
    }

    return () => controller.abort();
  }, [page, limit, search, sortField, sortOrder]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Delete post with optimistic delete
  const handleDelete = async (id: string) => {
    const previousData = postData;
    setPostData((prev) => prev.filter((p) => p._id !== id));
    try {
      const res = await apiClient.delete(`/api/post/${id}`);
      setMsg(res.data.message);
      setMsgType("success");
    } catch (error: any) {
      setPostData(previousData);
      setMsg(error.response?.data?.message || "Delete failed");
      setMsgType("danger");
    }
  };
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  useEffect(() => {
    if (searchRef.current) {
      searchRef.current.focus();
    }
  }, [postData]); // or [loading]
  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Posts</h2>
        <Link to="/post/add">
          <Button variant="success">+ Create Post</Button>
        </Link>
      </div>

      {msg && (
        <Alert
          variant={msgType === "success" ? "success" : "danger"}
          className="text-center"
        >
          {msg}
        </Alert>
      )}

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" />
        </div>
      ) : (
        <div className="table-responsive">
          <Form.Control
            ref={searchRef}
            type="text"
            placeholder="Search posts..."
            className="mb-3"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Table striped hover className="align-middle">
            <thead className="table-light">
              <tr>
                <th
                  onClick={() => handleSort("title")}
                  style={{ cursor: "pointer" }}
                >
                  Title{" "}
                  {sortField === "title" &&
                    (sortOrder === "asc" ? (
                      <i className="bi bi-arrow-up"></i>
                    ) : (
                      <i className="bi bi-arrow-down"></i>
                    ))}
                </th>
                <th
                  onClick={() => handleSort("email")}
                  style={{ cursor: "pointer" }}
                >
                  Email{" "}
                  {sortField === "email" &&
                    (sortOrder === "asc" ? (
                      <i className="bi bi-arrow-up"></i>
                    ) : (
                      <i className="bi bi-arrow-down"></i>
                    ))}
                </th>

                <th
                  onClick={() => handleSort("description")}
                  style={{ cursor: "pointer" }}
                >
                  Desc{" "}
                  {sortField === "description" &&
                    (sortOrder === "asc" ? (
                      <i className="bi bi-arrow-up"></i>
                    ) : (
                      <i className="bi bi-arrow-down"></i>
                    ))}
                </th>
                <th
                  onClick={() => handleSort("author")}
                  style={{ cursor: "pointer" }}
                >
                  Author{" "}
                  {sortField === "author" &&
                    (sortOrder === "asc" ? (
                      <i className="bi bi-arrow-up"></i>
                    ) : (
                      <i className="bi bi-arrow-down"></i>
                    ))}
                </th>
                <th
                  onClick={() => handleSort("published")}
                  style={{ cursor: "pointer" }}
                >
                  Published{" "}
                  {sortField === "published" &&
                    (sortOrder === "asc" ? (
                      <i className="bi bi-arrow-up"></i>
                    ) : (
                      <i className="bi bi-arrow-down"></i>
                    ))}
                </th>
                <th
                  onClick={() => handleSort("option_type")}
                  style={{ cursor: "pointer" }}
                >
                  Type{" "}
                  {sortField === "option_type" &&
                    (sortOrder === "asc" ? (
                      <i className="bi bi-arrow-up"></i>
                    ) : (
                      <i className="bi bi-arrow-down"></i>
                    ))}
                </th>
                <th>Skills</th>
                <th>Tags</th>
                <th
                  onClick={() => handleSort("createdAt")}
                  style={{ cursor: "pointer" }}
                >
                  Date{" "}
                  {sortField === "createdAt" &&
                    (sortOrder === "asc" ? (
                      <i className="bi bi-arrow-up"></i>
                    ) : (
                      <i className="bi bi-arrow-down"></i>
                    ))}
                </th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {postData.length === 0 ? (
                <tr>
                  <td colSpan={10} className="text-center">
                    No post found
                  </td>
                </tr>
              ) : (
                postData.map((item) => (
                  <PostRow
                    key={item._id}
                    postData={item}
                    handleDelete={handleDelete}
                  />
                ))
              )}
            </tbody>
          </Table>
          {total > limit && (
            <div className="d-flex justify-content-center mt-3">
              {Array.from({ length: Math.ceil(total / limit) }, (_, i) => (
                <Button
                  key={i}
                  variant={page === i + 1 ? "primary" : "outline-primary"}
                  className="mx-1"
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </Button>
              ))}
            </div>
          )}
        </div>
      )}
    </Container>
  );
}
export default ListWithServerPagination;
