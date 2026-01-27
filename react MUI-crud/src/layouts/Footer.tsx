import { Box, Typography } from "@mui/material";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "grey.200",
        py: 2,
        textAlign: "center",
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} My Company
      </Typography>
    </Box>
  );
}

export default Footer;
