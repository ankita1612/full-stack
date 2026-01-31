import React, { useState } from "react";
import { Box, Stack, TextField, InputAdornment } from "@mui/material";
import { Padding } from "@mui/icons-material";
function TextBox() {
  const [value, setValue] = useState("");
  return (
    <>
      <Stack direction="row" spacing={2} margin={2}>
        <TextField name="name" label="name" variant="outlined"></TextField>
        <TextField
          name="phone_number"
          label="phone number"
          variant="filled"
        ></TextField>
        <TextField name="age" label="age" variant="standard"></TextField>
      </Stack>
      <Stack direction="row" spacing={2} alignItems="center">
        <TextField
          name="address"
          label="name"
          variant="outlined"
          size="small"
          color="secondary"
        ></TextField>
        <TextField
          name="desc"
          label="desc"
          variant="filled"
          color="primary"
        ></TextField>
        <Stack sx={{ flexGrow: 1 }} />

        <TextField
          name="password"
          label="password"
          type="password"
          variant="standard"
          helperText="valid password"
        ></TextField>
      </Stack>
      <Stack direction="row" spacing={2} alignItems="center">
        <TextField
          name="address"
          label="name"
          variant="outlined"
          size="small"
          color="secondary"
        ></TextField>
        <TextField
          name="desc"
          label="desc"
          variant="filled"
          color="primary"
        ></TextField>
        <Stack sx={{ flexGrow: 1 }} />

        <TextField
          name="password"
          label="password"
          type="password"
          variant="standard"
          helperText="valid password"
        ></TextField>
      </Stack>
      <Stack direction="row" sx={{ border: "1px solid" }}>
        {/* Left */}
        <TextField label="Left" />

        {/* Spacer */}
        <Box sx={{ flex: 1, textAlign: "center" }}>
          <TextField label="Center" />
        </Box>

        {/* Right */}
        <TextField label="Right" />
      </Stack>
      <Stack direction="row" sx={{ border: "1px solid" }}>
        {/* Spacer */}
        <Box sx={{ flex: 1, textAlign: "right" }}>
          <TextField label="Center" />
        </Box>
      </Stack>
      <Stack direction="row" margin={3}>
        {/* Left */}
        <TextField
          label="Amount"
          type="number"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            },
          }}
        />

        <TextField
          label="Amount"
          type="number"
          slotProps={{
            input: {
              endAdornment: <InputAdornment position="end">$</InputAdornment>,
            },
          }}
        />

        {/* Right */}
        <TextField label="Right" error />

        <TextField
          label="Amount"
          required
          onChange={(e) => setValue(e.target.value)}
          value={value}
          error={!value}
          helperText={!value ? "Required" : "don't share"}
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="end">$</InputAdornment>,
            },
          }}
        />
      </Stack>
      <Box width="350px">
        <TextField label="Example of full width inside box" fullWidth />
      </Box>
      <Box>
        <TextField label="Example of full width" fullWidth />
      </Box>
    </>
  );
}

export default TextBox;
