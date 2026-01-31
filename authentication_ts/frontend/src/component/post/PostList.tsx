import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import axios from "axios";
import type { IPost } from "../../interface/post.interface";
import PostRow from "./PostRow";
function PostList() {
  const [postData, usePostData] = useState<IPost[]>([]);
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");

  const fetch = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/posts");
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
      const response = await axios.delete(
        "http://localhost:5000/api/posts/" + id,
      );
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
        <Link to="/employee/add">
          <Button variant="success" size="lg">
            Create New User
          </Button>
        </Link>
      </div>
      {msg && (
        <div style={{ color: msgType === "success" ? "green" : "red" }}>
          {msg}
        </div>
      )}
      <Table striped bordered hover>
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
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
