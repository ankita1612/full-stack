import type { Employee } from "../../types/Employee";
import { TableRow, TableCell, Button } from "@mui/material";

type Props = {
  emp: Employee;
  onDelete: (id: number) => void;
};

export const EmployeeRow = ({ emp, onDelete }: Props) => (
  <TableRow>
    <TableCell>{emp.name}</TableCell>
    <TableCell>{emp.salary}</TableCell>
    <TableCell>{emp.dob}</TableCell>
    <TableCell>{emp.hobbies.join(", ")}</TableCell>
    <TableCell>{emp.status}</TableCell>
    <TableCell>{emp.highest_degree}</TableCell>
    <TableCell>
      {emp.profile_image && (
        <img
          src={URL.createObjectURL(emp.profile_image)}
          width="40"
          alt="profile"
        />
      )}
    </TableCell>
    <TableCell>
      <Button color="error" onClick={() => onDelete(emp.id)}>
        Delete
      </Button>
    </TableCell>
  </TableRow>
);
