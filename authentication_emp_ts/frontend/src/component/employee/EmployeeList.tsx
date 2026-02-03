import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import type { IEmployee } from "../../interface/employee.interface";
import EmployeeRow from "./EmployeeRow";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const EmployeeList = () => {
  const [employeeData, useEmployeeData] = useState<IEmployee[]>([]);
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
      const response = await axios.get(BACKEND_URL + "/api/employees");
      if (response.status === 201) {
        useEmployeeData(response.data.data);
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
      const response = await axios.delete(BACKEND_URL + "/api/employees/" + id);
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
      <h1 className="text-center mb-4">Employee</h1>
      <div className="d-grid gap-2 mt-4">
        <Link to="/employee/add">
          <Button variant="success" size="lg">
            Create Employee
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
            <th>single image</th>
            <th>DOB</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employeeData.map((item) => (
            <EmployeeRow
              key={item._id}
              employeeData={item}
              handleDelete={handleDelete}
            />
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default EmployeeList;
