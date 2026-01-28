import { Switch, FormControlLabel } from "@mui/material";
import { useState } from "react";

export default function SwitchEg() {
  const [checked, setChecked] = useState(false);
  console.log(checked);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };

  return (
    <>
      [{checked}]
      <FormControlLabel
        control={
          <Switch checked={checked} onChange={handleChange} color="success" />
        }
        label={checked ? "ON" : "OFF"}
      />
    </>
  );
}
