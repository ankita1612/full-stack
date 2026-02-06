import Container from "react-bootstrap/Container";
import { Button, Table, Spinner, Form, Pagination } from "react-bootstrap";
import React, { useEffect, useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import type { IPost } from "../../interface/post.interface";
import PostRow from "./PostRow";
import Alert from "react-bootstrap/Alert";
import "bootstrap-icons/font/bootstrap-icons.css";

import apiClient from "../../utils/apiClient";

function ListWithPagination() {
  const [postData, setPostData] = useState<IPost[]>([]);
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState<"success" | "danger" | "">("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);

  const filteredPosts = postData.filter((post) =>
    Object.values(post).join(" ").toLowerCase().includes(search.toLowerCase()),
  );
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (!sortField) return 0;

    let aVal: any = a[sortField as keyof IPost];
    let bVal: any = b[sortField as keyof IPost];

    if (aVal == null) return 1;
    if (bVal == null) return -1;

    if (Array.isArray(aVal)) aVal = aVal.join(", ");
    if (Array.isArray(bVal)) bVal = bVal.join(", ");

    if (typeof aVal === "boolean") {
      return sortOrder === "asc"
        ? Number(aVal) - Number(bVal)
        : Number(bVal) - Number(aVal);
    }

    const aDate = Date.parse(aVal);
    const bDate = Date.parse(bVal);
    if (!isNaN(aDate) && !isNaN(bDate)) {
      return sortOrder === "asc" ? aDate - bDate : bDate - aDate;
    }

    return sortOrder === "asc"
      ? String(aVal).localeCompare(String(bVal))
      : String(bVal).localeCompare(String(aVal));
  });

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };
  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = sortedPosts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);

  useEffect(() => {
    if (!msg) return;
    const timer = setTimeout(() => setMsg(""), 5000);
    return () => clearTimeout(timer);
  }, [msg]);

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
      const { data } = await apiClient.get(`/api/post`, {
        signal: controller.signal,
      });
      setPostData(data.data);
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
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Delete post with optimistic delete
  const handleDelete = async (id: string) => {
    const previousData = postData;
    setPostData((prev) => prev.filter((p) => p._id !== id));

    try {
      await apiClient.delete(`/api/post/${id}`);
      setMsg("Deleted successfully");
      setMsgType("success");
    } catch (error: any) {
      setPostData(previousData);
      setMsg(error.response?.data?.message || "Delete failed");
      setMsgType("danger");
    }
  };

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Posts</h2>
        <div className="d-flex align-items-center">
          <span className="me-2">Show</span>
          <Form.Select
            size="sm"
            style={{ width: "80px" }}
            value={postsPerPage}
            onChange={(e) => {
              setPostsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </Form.Select>
          <span className="ms-2">entries</span>
        </div>
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
                    No posts found
                  </td>
                </tr>
              ) : (
                currentPosts.map((item) => (
                  <PostRow
                    key={item._id}
                    postData={item}
                    handleDelete={handleDelete}
                  />
                ))
              )}
            </tbody>
          </Table>
          {totalPages > 1 && (
            <Pagination className="justify-content-center mt-4">
              {[...Array(totalPages)].map((_, i) => (
                <Pagination.Item
                  key={i + 1}
                  active={i + 1 === currentPage}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          )}
        </div>
      )}
    </Container>
  );
}
export default ListWithPagination;
