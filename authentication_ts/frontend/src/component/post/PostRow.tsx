import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import type { IPost } from "../../interface/post.interface";
interface PostRowProps {
  postData: IPost;
  handleDelete: (id: string) => void;
}

const PostRow = ({ postData, handleDelete }: PostRowProps) => {
  const navigate = useNavigate();

  const handleEdit = (id: string) => {
    return navigate("/employee/add/" + id);
  };

  return (
    <>
      {}
      <tr>
        <td>{postData.title}</td>
        <td>{postData.email}</td>
        {
          <td>
            <Button
              onClick={() => handleEdit(postData._id)}
              variant="info"
              className="me-2"
            >
              Update
            </Button>
            <Button onClick={() => handleDelete(postData._id)} variant="danger">
              Delete
            </Button>
          </td>
        }
      </tr>
    </>
  );
};

export default PostRow;
