import React from "react";
import { Box, colors } from "@mui/material";

function BoxEg() {
  return (
    <>
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
      </Box>
      <Box sx={{ color: "primary.main" }}>primary.main</Box>
      <Box sx={{ color: "primary" }}>primary----------No effect</Box>
      <Box sx={{ color: "primary.light" }}>primary.light</Box>
      <Box sx={{ color: "primary.dark" }}>primary.dark</Box>
      <Box>------------------------ </Box>
      <Box sx={{ color: "secondary.main" }}>secondary.main</Box>
      <Box sx={{ color: "secondary" }}>secondary</Box>
      <Box sx={{ color: "secondary.light" }}>secondary.light</Box>
      <Box sx={{ color: "secondary.dark" }}>secondary.dark</Box>
      <Box>------------------------ </Box>
      <Box sx={{ color: "error.main" }}>error.main</Box>
      <Box sx={{ color: "error" }}>error</Box>
      <Box sx={{ color: "error.light" }}>error.light</Box>
      <Box sx={{ color: "error.dark" }}>error.dark</Box>
      <Box>------------------------ </Box>
      <Box sx={{ color: "warning.main" }}>warning.main</Box>
      <Box sx={{ color: "warning" }}>warning</Box>
      <Box sx={{ color: "warning.light" }}>warning.light</Box>
      <Box sx={{ color: "warning.dark" }}>warning.dark</Box>
      <Box>------------------------ </Box>
      <Box sx={{ color: "success.main" }}>success.main</Box>
      <Box sx={{ color: "success" }}>success</Box>
      <Box sx={{ color: "success.light" }}>success.light</Box>
      <Box sx={{ color: "success.dark" }}>success.dark</Box>
      <Box>------------------------ </Box>
      <Box sx={{ color: "info.main" }}>info.main</Box>
      <Box sx={{ color: "info" }}>info</Box>
      <Box sx={{ color: "info.light" }}>info.light</Box>
      <Box sx={{ color: "info.dark" }}>info.dark</Box>
    </>
  );
}

export default BoxEg;
