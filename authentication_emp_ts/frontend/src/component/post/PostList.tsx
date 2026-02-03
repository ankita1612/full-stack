import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import type { IPost } from "../../interface/post.interface";
import PostRow from "./PostRow";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function PostList() {
  const [postData, usePostData] = useState<IPost[]>([]);
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");
  const location = useLocation();
  useEffect(() => {
    if (msg) {
      const timer = setTimeout(() => {
        setMsg("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [msg]);
  useEffect(() => {
    if (location.state?.msg) {
      setMsg(location.state.msg);
      setMsgType(location.state.type);
    }
  }, [location.state]);
  const fetch = async () => {
    try {
      const response = await axios.get(BACKEND_URL + "/api/posts");
      if (response.status === 201) {
        usePostData(response.data.data);
        console.log(response.data.data);
      }
    } catch (error: any) {
      if (error.status == 422) {
        setMsg(error?.response?.data?.message);
        setMsgType("error");
      }
    }
  };
  useEffect(() => {
    fetch();
  }, []);
  const handleDelete = async (id: string) => {
    try {
      const response = await axios.delete(BACKEND_URL + "/api/posts/" + id);
      fetch();
      setMsg(response?.data?.message);
      setMsgType("success");
      console.log(response?.data?.message);
    } catch (error: any) {
      if (error.status == 422) {
        setMsg(error?.response?.data?.message);
        setMsgType("error");
      }
    }
  };
  return (
    <div style={{ margin: "2rem" }}>
      <h1 className="text-center mb-4">User Management</h1>
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
      <Table striped bordered hover>
        <thead className="thead-dark">
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
          {postData.map((item) => (
            <PostRow
              key={item._id}
              postData={item}
              handleDelete={handleDelete}
            />
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default PostList;
