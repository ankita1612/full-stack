import React from "react";
import { Box, Container } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";

type LayoutProps = {
  children: React.ReactNode;
};

const AppLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Header></Header>

      <Box component="main" sx={{ flex: 1, py: 4 }}>
        <Container maxWidth="md">{children}</Container>
      </Box>
      <Footer></Footer>
    </Box>
  );
};

export default AppLayout;
