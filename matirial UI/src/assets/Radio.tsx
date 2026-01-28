import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import { useState } from "react";

export default function StatusRadio() {
  const [status, setStatus] = useState("Active");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(e.target.value);
    console.log(e.target.value);
  };

  return (
    <FormControl>
      <FormLabel>Status</FormLabel>
      <RadioGroup row value={status} onChange={handleChange}>
        <FormControlLabel
          value="Active"
          control={<Radio size="small" color="secondary" />}
          label="Active"
        />
        <FormControlLabel
          value="Inactive"
          control={<Radio size="small" color="primary" />}
          label="Inactive"
        />
      </RadioGroup>
    </FormControl>
  );
}
