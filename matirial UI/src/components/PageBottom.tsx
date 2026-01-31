import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import {
  Avatar,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
function PageBottom() {
  return (
    <BottomNavigation sx={{ width: "100%", position: "absolute", bottom: 0 }}>
      <BottomNavigationAction label="Home" icon={<AccountBalanceIcon />} />
      <BottomNavigationAction label="HomeIcon" icon={<HomeIcon />} />
      <BottomNavigationAction label="HomeIcon" icon={<HomeIcon />} />

      <Avatar>AN</Avatar>
    </BottomNavigation>
  );
}

export default PageBottom;
