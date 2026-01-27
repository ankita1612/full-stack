import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";

function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        {/* 🔹 Logo Image */}
        <Box
          component="img"
          src="../images/logo.jpg" // put image inside public folder
          alt="Logo"
          sx={{
            height: 50,
            mr: 2,
          }}
        />

        {/* 🔹 Title */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          My App
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
