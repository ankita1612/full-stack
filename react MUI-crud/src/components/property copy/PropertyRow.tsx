import { TableRow, TableCell, Button } from "@mui/material";
import type { Property } from "../../types/Property";

type Props = {
  property: Property;
  onDelete: (id: number) => void;
  onEdit: (property: Property) => void;
};

export const PropertyRow = ({ property, onDelete, onEdit }: Props) => (
  <TableRow>
    <TableCell>{property.name}</TableCell>
    <TableCell>{property.description}</TableCell>
    <TableCell>
      <Button onClick={() => onEdit(property)}>Edit</Button>
      <Button color="error" onClick={() => onDelete(property.id)}>
        Delete
      </Button>
    </TableCell>
  </TableRow>
);
