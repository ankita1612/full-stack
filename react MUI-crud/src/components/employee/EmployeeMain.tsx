import { useState } from "react";
import EmployeeForm from "./EmployeeAdd";
import { EmployeeRow } from "./EmployeeRow";
import type { Employee } from "../../types/Employee";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import type { EmployeeFormValues } from "../../validations/Employee";

export default function EmployeeCRUD() {
  const [employees, setEmployees] = useState<Employee[]>([]);

  // const addEmployee = (emp: Employee) => {
  //   setEmployees((prev) => [...prev, emp]);
  // };
  const addEmployee = (data: EmployeeFormValues) => {
    const newEmployee: Employee = {
      id: Date.now(),
      ...data,
    };
    setEmployees((prev) => [...prev, newEmployee]);
  };
  const deleteEmployee = (id: number) => {
    setEmployees((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <>
      <EmployeeForm onSave={addEmployee} />

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Salary</TableCell>
            <TableCell>DOB</TableCell>
            <TableCell>Hobbies</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Degree</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((emp) => (
            <EmployeeRow key={emp.id} emp={emp} onDelete={deleteEmployee} />
          ))}
        </TableBody>
      </Table>
    </>
  );
}
