import Container from "react-bootstrap/Container";
import React, { useEffect, useState, useCallback } from "react";
import { Button, Table, Spinner } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import type { IPost } from "../../interface/post.interface";
import PostRow from "./PostRow";
import Alert from "react-bootstrap/Alert";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function PostList() {
  const [postData, setPostData] = useState<IPost[]>([]);
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState<"success" | "danger" | "">("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  // Auto hide message
  useEffect(() => {
    if (!msg) return;
    const timer = setTimeout(() => setMsg(""), 3000);
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
      const { data } = await axios.get(`${BACKEND_URL}/api/post`, {
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
      await axios.delete(`${BACKEND_URL}/api/post/${id}`);
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
      {/* Header Row */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Posts</h2>
        <Link to="/post/add">
          <Button variant="success">+ Create Post</Button>
        </Link>
      </div>

      {/* Alert */}
      {msg && (
        <Alert
          variant={msgType === "success" ? "success" : "danger"}
          className="text-center"
        >
          {msg}
        </Alert>
      )}

      {/* Loader */}
      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" />
        </div>
      ) : (
        <div className="table-responsive">
          <Table striped hover className="align-middle">
            <thead className="table-light">
              <tr>
                <th>Title</th>
                <th>Email</th>
                <th>Desc</th>
                <th>Author</th>
                <th>Published</th>
                <th>Type</th>
                <th>Skills</th>
                <th>Tags</th>
                <th>Date</th>
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
        </div>
      )}
    </Container>
  );
}

export default PostList;
