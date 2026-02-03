import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import type { IPost } from "../../interface/post.interface";

interface PostRowProps {
  postData: IPost;
  handleDelete: (id: string) => void;
}

function PostRow({ postData, handleDelete }: PostRowProps) {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/post/add/${postData._id}`);
  };

  const confirmDelete = () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this record?",
    );
    if (confirm) handleDelete(postData._id);
  };

  return (
    <tr>
      <td>{postData.title || "-"}</td>
      <td>{postData.email || "-"}</td>
      <td>{postData.description || "-"}</td>
      <td>{postData.author || "-"}</td>
      <td>{postData.published ? "Yes" : "No"}</td>
      <td>{postData.option_type || "-"}</td>
      <td>
        {Array.isArray(postData.skills) && postData.skills.length
          ? postData.skills.join(" | ")
          : "-"}
      </td>
      <td>
        {Array.isArray(postData.tags) && postData.tags.length
          ? postData.tags.join(" | ")
          : "-"}
      </td>

      <td>
        {postData.createdAt
          ? new Date(postData.createdAt).toLocaleDateString()
          : "-"}
      </td>

      <td className="d-flex gap-2">
        <Button variant="info" size="sm" onClick={handleEdit}>
          Update
        </Button>

        <Button
          variant="danger"
          size="sm"
          onClick={confirmDelete}
          aria-label="Delete post"
        >
          Delete
        </Button>
      </td>
    </tr>
  );
}

export default PostRow;
