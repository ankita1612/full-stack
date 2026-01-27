import React, { useState } from "react";
import {
  Stack,
  Button,
  IconButton,
  ButtonGroup,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { Divider } from "@mui/material";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlineIcon from "@mui/icons-material/FormatUnderlined";

function ShowButtons() {
  const [formats, setFormats] = useState<string[] | null>([]);
  console.log(formats);
  const handleFormatChange = (
    _event: React.MouseEvent<HTMLElement>,
    updatedFormats: string[] | null,
  ) => {
    setFormats(updatedFormats);
  };

  return (
    <>
      <Stack spacing={3} direction="row">
        <Button>Click Me Simple - nothing</Button>
        <Button variant="text">Variant-text</Button>
        <Button variant="contained">Variant-contained</Button>
        <Button variant="outlined">Variant-outlined</Button>
      </Stack>
      <Divider />

      <Stack>display="flex" example: default so no need to add </Stack>
      <Stack
        sx={{ border: "1px solid black", height: 30 }}
        direction="row"
        justifyContent="center"
      >
        <Button variant="text" color="primary">
          this is text21
        </Button>
        <Button variant="contained" color="secondary">
          this is text2
        </Button>
        <Button variant="outlined" color="warning">
          this is text2
        </Button>
        <Button variant="contained" color="info">
          this is text2
        </Button>
        <Button variant="text" color="success">
          this is text2
        </Button>
      </Stack>

      <Divider />

      <Stack>display="block" example</Stack>
      <Stack
        display="block"
        spacing={1}
        direction="row"
        sx={{ display: "block !important", border: "2px solid red" }}
      >
        <Button variant="text" color="primary">
          this is text3
        </Button>
        <Button variant="contained" color="secondary">
          this is text3
        </Button>
        <Button variant="outlined" color="warning">
          this is text3
        </Button>
        <Button variant="contained" color="info">
          this is text3
        </Button>
        <Button variant="text" color="success">
          this is text3
        </Button>
      </Stack>

      <Divider />
      <Divider>OR</Divider>
      <Divider sx={{ my: 5 }}>my: 5 means margin of 5 top & bottom</Divider>

      <Stack>Button small medium large</Stack>
      <Stack direction="row">
        <Button variant="contained" size="small">
          this is small
        </Button>
        <Button variant="contained" size="medium" disableElevation>
          this is medium1
        </Button>
        <Button variant="contained" size="large">
          this is large
        </Button>
      </Stack>

      <Stack direction="row" spacing={2} alignItems="center">
        <Button>Left</Button>
        <Divider orientation="vertical" flexItem />
        <Button>Right</Button>
      </Stack>
      <Divider sx={{ my: 5 }}>Button left and right</Divider>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        {/* LEFT SIDE */}
        <Stack direction="row" spacing={1}>
          <Button variant="contained">Back</Button>
          <Button variant="outlined">Edit button 1</Button>
          <Button variant="outlined">Edit button 2</Button>
        </Stack>

        <Stack direction="row" spacing={1}>
          <Button variant="contained">Back</Button>
          <Button variant="outlined">Edit button 1</Button>
        </Stack>

        {/* RIGHT SIDE */}
        <Stack direction="row" spacing={1}>
          <Button variant="contained">Back</Button>
          <Button variant="outlined">Edit</Button>
          <Button variant="outlined">Edit</Button>
        </Stack>
      </Stack>

      <Divider>Right</Divider>
      <Stack
        sx={{ border: "1px solid black", height: 30 }}
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        spacing={1}
      >
        <Button variant="text" color="primary">
          this is text2
        </Button>

        <Button variant="outlined" color="warning">
          this is text2
        </Button>

        <Button variant="text" color="success">
          this is text2
        </Button>
      </Stack>
      <Divider></Divider>
      <Stack direction="row">
        <Button variant="outlined" startIcon={<SendIcon />}>
          Send mail
        </Button>
        <Button variant="outlined" endIcon={<SendIcon />}>
          Send mail
        </Button>
      </Stack>
      <Divider></Divider>
      <Stack direction="row">
        <IconButton>
          <SendIcon />
        </IconButton>
        <IconButton disabled color="primary">
          <SendIcon />
        </IconButton>
        <IconButton color="secondary" aria-label="add an alarm">
          <SendIcon />
        </IconButton>
        <IconButton color="primary" aria-label="add to shopping cart">
          <SendIcon />
        </IconButton>
      </Stack>
      <Stack direction="row">
        <Button variant="contained">Left</Button>
        <Button variant="contained">Center</Button>
        <Button variant="contained">Right</Button>
      </Stack>
      <Divider></Divider>
      <Stack direction="row">
        <ButtonGroup variant="contained">
          <Button>Left</Button>
          <Button>Center</Button>
          <Button>Right</Button>
        </ButtonGroup>
      </Stack>
      <Divider sx={{ my: 2 }}>aaa</Divider>
      <Stack direction="row">
        <ButtonGroup
          variant="text"
          orientation="vertical"
          aria-label="MY firsy"
        >
          <Button>Left</Button>
          <Button>Center</Button>
          <Button>Right</Button>
        </ButtonGroup>
      </Stack>
      <Stack direction="row">
        <ToggleButtonGroup
          aria-label="mytoggle"
          value={formats}
          onChange={handleFormatChange}
          size="small"
          color="success"
          orientation="vertical"
        >
          <ToggleButton value="bold" aria-label="bold">
            <FormatBoldIcon></FormatBoldIcon>
          </ToggleButton>
          <ToggleButton value="underlinr" aria-label="underlinr">
            <FormatUnderlineIcon></FormatUnderlineIcon>
          </ToggleButton>
          <ToggleButton value="italic" aria-label="italic">
            <FormatItalicIcon></FormatItalicIcon>
          </ToggleButton>
        </ToggleButtonGroup>
        [[{formats}]]
      </Stack>
    </>
  );
}

export default ShowButtons;
