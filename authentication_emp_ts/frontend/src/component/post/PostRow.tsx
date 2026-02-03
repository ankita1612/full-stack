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
    return navigate("/post/add/" + id);
  };

  return (
    <>
      <tr>
        <td>{postData.title}</td>
        <td>{postData.email}</td>
        <td>{postData.description}</td>
        <td>{postData.author}</td>
        <td>{postData.published == false ? "Yes" : "No"}</td>
        <td>{postData.option_type}</td>
        <td>{postData.skills.join(" | ")}</td>
        <td>{postData.tags.join(" | ")}</td>
        <td>{new Date(postData.createdAt).toLocaleDateString()}</td>
        <td>
          <Button onClick={() => handleEdit(postData._id)} variant="info">
            Update
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              if (
                window.confirm("Are you sure you want to delete this record?")
              ) {
                handleDelete(postData._id);
              }
            }}
          >
            Delete
          </Button>
        </td>
      </tr>
    </>
  );
};

export default PostRow;
