import * as React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";
import MailIcon from "@mui/icons-material/Mail";
export default function BasicList() {
  return (
    <>
      <List>
        <ListItem>
          <ListItemText primary="Inbox" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Sent Mail" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Drafts" />
        </ListItem>
      </List>

      <List>
        <ListItem>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <MailIcon />
          </ListItemIcon>
          <ListItemText primary="Sent Mail" />
        </ListItem>
      </List>

      <List>
        <ListItemButton onClick={() => alert("Inbox Clicked")}>
          <ListItemText primary="Inbox" />
        </ListItemButton>

        <ListItemButton onClick={() => alert("Drafts Clicked")}>
          <ListItemText primary="Drafts" />
        </ListItemButton>
      </List>
    </>
  );
}
