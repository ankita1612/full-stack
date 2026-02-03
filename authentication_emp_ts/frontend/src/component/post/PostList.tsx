import React, { useEffect, useState, useCallback } from "react";
import { Button, Table, Spinner } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import type { IPost } from "../../interface/post.interface";
import PostRow from "./PostRow";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function PostList() {
  const [postData, setPostData] = useState<IPost[]>([]);
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState<"success" | "error" | "">("");
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
    setLoading(true);
    try {
      const { data } = await axios.get(`${BACKEND_URL}/api/posts`);
      setPostData(data.data);
    } catch (error: unknown) {
      setMsg("Failed to load posts");
      setMsgType("error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Delete post
  const handleDelete = async (id: string) => {
    try {
      const { data } = await axios.delete(`${BACKEND_URL}/api/posts/${id}`);
      setPostData((prev) => prev.filter((p) => p._id !== id)); // optimistic update
      setMsg(data?.message || "Deleted successfully");
      setMsgType("success");
    } catch (error: any) {
      setMsg(error.response?.data?.message || "Delete failed");
      setMsgType("error");
    }
  };

  return (
    <div style={{ margin: "2rem" }}>
      <h1 className="text-center mb-4">Post</h1>

      <div className="d-grid gap-2 mt-4">
        <Link to="/post/add">
          <Button variant="success" size="lg">
            Create New Post
          </Button>
        </Link>
      </div>

      {msg && (
        <div className="d-flex justify-content-center mt-3">
          <div
            className={`alert ${msgType === "success" ? "alert-success" : "alert-danger"} text-center`}
            role="alert"
            style={{ minWidth: "300px" }}
          >
            {msg}
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center mt-4">
          <Spinner animation="border" />
        </div>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Title</th>
              <th>Email</th>
              <th>Description</th>
              <th>Author</th>
              <th>Published</th>
              <th>Type</th>
              <th>Skills</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {postData.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center text-muted py-4">
                  No records found
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
      )}
    </div>
  );
}

export default PostList;
