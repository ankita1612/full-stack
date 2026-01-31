import {
  AppBar,
  Toolbar,
  Typography,
  Stack,
  Button,
  Menu,
  MenuItem,
  Link,
} from "@mui/material";
import React from "react";
function TopHeader() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My App
        </Typography>
        <Stack direction="row" spacing={1}>
          <Link href="#" color="inherit">
            Property
          </Link>

          <Link href="#" color="inherit" underline="hover" varient="body2">
            add
          </Link>

          <Link href="#" color="inherit" underline="none">
            edit
          </Link>
        </Stack>
        {/* <Stack direction="row">
          <Button color="inherit">Button</Button>
          <Button color="inherit">Sidebar</Button>
          <Button color="inherit">Card</Button>
        </Stack>
        <Menu id="q">
          <MenuItem>Blog</MenuItem>
          <MenuItem>Podcast</MenuItem>
          <MenuItem>Test</MenuItem>
        </Menu> */}
      </Toolbar>
    </AppBar>
  );
}

export default TopHeader;
