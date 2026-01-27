import { useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import PropertyForm from "./ProperyForm";
import { PropertyRow } from "./PropertyRow";
import type { Property } from "../../types/Property";
import type { PropertyFormValues } from "../../validations/Propery";

export default function PropertyCRUD() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<PropertyFormValues | null>(null);

  const saveProperty = (data: PropertyFormValues) => {
    if (editingId !== null) {
      // 🔹 Update
      setProperties((prev) =>
        prev.map((p) => (p.id === editingId ? { ...p, ...data } : p)),
      );
      setEditingId(null);
      setEditData(null);
    } else {
      // 🔹 Add
      setProperties((prev) => [...prev, { id: Date.now(), ...data }]);
    }
  };

  const deleteProperty = (id: number) => {
    setProperties((prev) => prev.filter((p) => p.id !== id));
  };

  const editProperty = (property: Property) => {
    setEditingId(property.id);
    setEditData({
      name: property.name,
      description: property.description,
    });
  };

  return (
    <>
      <PropertyForm onSave={saveProperty} editData={editData} />

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {properties.map((prop) => (
            <PropertyRow
              key={prop.id}
              property={prop}
              onDelete={deleteProperty}
              onEdit={editProperty}
            />
          ))}
        </TableBody>
      </Table>
    </>
  );
}
