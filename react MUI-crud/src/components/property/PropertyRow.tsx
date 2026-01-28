import CardContent from "@mui/material/CardContent";
import { Paper, Typography, Button, Stack } from "@mui/material";
import type { Property } from "../../types/Property";

type Props = {
  property: Property;
  onDelete: (id: number) => void;
  onEdit: (property: Property) => void;
};

export const PropertyRow = ({ property, onDelete, onEdit }: Props) => {
  return (
    <CardContent>
      <Typography variant="h6">{property.name}</Typography>
      <Typography variant="body2">{property.description}</Typography>

      <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
        <Button size="small" onClick={() => onEdit(property)}>
          Edit
        </Button>
        <Button
          size="small"
          color="error"
          onClick={() => onDelete(property.id)}
        >
          Delete
        </Button>
      </Stack>
    </CardContent>
  );
};
