import React, { useState } from "react";
import { Box, TextField, MenuItem } from "@mui/material";
function MultiSelect() {
  const [country, setCountry] = useState<string>("in");
  const [city, setCity] = useState<string[]>([]);
  const handleCountry = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountry(e.target.value as string);
    console.log(e.target.value);
  };
  const handleCity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCity(typeof value === "string" ? value.split(",") : value);
    console.log(typeof value);
    console.log(e.target.value);
  };
  return (
    <>
      {city}
      <Box width="200px">
        <TextField
          select
          fullWidth
          name="country"
          value={country}
          onChange={handleCountry}
          size="small"
        >
          <MenuItem value="in">India</MenuItem>
          <MenuItem value="uk">UK</MenuItem>
          <MenuItem value="us">US</MenuItem>
        </TextField>
      </Box>
      <Box width="400px" sx={{ pt: 1 }}>
        <TextField
          select
          fullWidth
          name="ciy"
          value={city}
          size="small"
          onChange={handleCity}
          slotProps={{
            select: {
              multiple: true,
              // renderValue: (selected) => (selected as string[]).join(", "),
            },
          }}
        >
          <MenuItem value="ah">Ahedabad</MenuItem>
          <MenuItem value="br">Baroda</MenuItem>
          <MenuItem value="bn">Bhavnagar</MenuItem>
        </TextField>
      </Box>
    </>
  );
}

export default MultiSelect;
