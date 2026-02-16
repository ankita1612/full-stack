import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import type { IAdmin } from "../../interfaces/admin.interface";

interface AdminRowProps {
  adminData: IAdmin;
  handleDelete: (id: string) => void;
}

function AdminRow({ adminData, handleDelete }: AdminRowProps) {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/admin/add/${adminData._id}`);
  };

  const confirmDelete = () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this record?",
    );
    if (confirm) handleDelete(adminData._id);
  };

  return (
    <tr>
      <td>{adminData.title || "-"}</td>
      <td>{adminData.email || "-"}</td>
      <td>{adminData.description || "-"}</td>
      <td>{adminData.author || "-"}</td>
      <td>{adminData.published ? "Yes" : "No"}</td>
      <td>{adminData.option_type || "-"}</td>
      <td>
        {Array.isArray(adminData.skills) && adminData.skills.length
          ? adminData.skills.join(" | ")
          : "-"}
      </td>
      <td>
        {Array.isArray(adminData.tags) && adminData.tags.length
          ? adminData.tags.join(" | ")
          : "-"}
      </td>

      <td>
        {adminData.createdAt
          ? new Date(adminData.createdAt).toLocaleDateString()
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
          aria-label="Delete admin"
        >
          Delete
        </Button>
      </td>
    </tr>
  );
}
export default AdminRow;
