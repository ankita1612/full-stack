import Container from "react-bootstrap/Container";
import { Button, Table, Spinner, Form, Pagination } from "react-bootstrap";
import React, { useEffect, useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import type { IAdmin } from "../../interfaces/admin.interface";
import AdminRow from "./AdminRow";
import Alert from "react-bootstrap/Alert";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import apiClient from "../../utils/apiClient";

function ListWithPagination() {
  const [adminData, setAdminData] = useState<IAdmin[]>([]);
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState<"success" | "danger" | "">("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [adminsPerPage, setAdminsPerPage] = useState(5);

  const filteredAdmins = adminData.filter((admin) =>
    Object.values(admin).join(" ").toLowerCase().includes(search.toLowerCase()),
  );
  const sortedAdmins = [...filteredAdmins].sort((a, b) => {
    if (!sortField) return 0;

    let aVal: any = a[sortField as keyof IAdmin];
    let bVal: any = b[sortField as keyof IAdmin];

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
  const indexOfLast = currentPage * adminsPerPage;
  const indexOfFirst = indexOfLast - adminsPerPage;
  const currentAdmins = sortedAdmins.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(sortedAdmins.length / adminsPerPage);

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

  // Fetch admins
  const fetchData = useCallback(async () => {
    setLoading(true);

    try {
      const { data } = await apiClient.get(`/api/admin`);
      setAdminData(data.data);
    } catch (error: any) {
      if (error.name !== "CanceledError") {
        setMsg(
          error?.response?.data?.message ||
            error?.message ||
            "Failed to load admins",
        );
        setMsgType("danger");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Delete admin with optimistic delete
  const handleDelete = async (id: string) => {
    const previousData = adminData;
    setAdminData((prev) => prev.filter((p) => p._id !== id));

    try {
      await axios.delete(BACKEND_URL + `/api/admin/${id}`);
      setMsg("Deleted successfully");
      setMsgType("success");
    } catch (error: any) {
      setAdminData(previousData);
      setMsg(error.response?.data?.message || "Delete failed");
      setMsgType("danger");
    }
  };

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Admins</h2>
        <div className="d-flex align-items-center">
          <span className="me-2">Show</span>
          <Form.Select
            size="sm"
            style={{ width: "80px" }}
            value={adminsPerPage}
            onChange={(e) => {
              setAdminsPerPage(Number(e.target.value));
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
        <Link to="/admin/add">
          <Button variant="success">+ Create Admin</Button>
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
            placeholder="Search admins..."
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
              {adminData.length === 0 ? (
                <tr>
                  <td colSpan={10} className="text-center">
                    No admins found
                  </td>
                </tr>
              ) : (
                currentAdmins.map((item) => (
                  <AdminRow
                    key={item._id}
                    adminData={item}
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
