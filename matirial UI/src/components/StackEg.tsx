import React from "react";
import { Box, colors, Stack, Divider } from "@mui/material";
import { reverse } from "node:dns";

function StackEg() {
  return (
    <>
      <Stack direction="row" spacing={2}>
        <Box
          sx={{
            backgroundColor: "primary.main",
            color: "green",
            height: "100px",
            width: "100px",
            padding: "10px",
            "&:hover": {
              backgroundColor: "error.main",
            },
          }}
        >
          this is y box
        </Box>{" "}
        <Divider orientation="vertical" flexItem />
        <Box
          sx={{
            backgroundColor: "primary.light",
            color: "green",
            height: "100px",
            width: "100px",
            padding: "10px",
            "&:hover": {
              backgroundColor: "error.main",
            },
          }}
        >
          this is y box
        </Box>
      </Stack>

      <Stack spacing={2} sx={{ pt: "10px", width: "100px" }}>
        <Box
          sx={{
            backgroundColor: "primary.main",
            color: "green",
            height: "100px",
            width: "100px",
            padding: "10px",
            "&:hover": {
              backgroundColor: "error.main",
            },
          }}
        >
          this is y box
        </Box>{" "}
        <Divider />
        <Box
          sx={{
            backgroundColor: "primary.light",
            color: "green",
            height: "100px",
            width: "100px",
            padding: "10px",
            "&:hover": {
              backgroundColor: "error.main",
            },
          }}
        >
          this is y box
        </Box>
      </Stack>
    </>
  );
}

export default StackEg;
