import Button from "@mui/material/Button";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
function IncrDecr() {
  const [cntr, setCntr] = useState<number>(0);
  enum ActionType {
    INCREMENT = "incr",
    DECREMENT = "decr",
    RESET = "reset",
  }
  type UserData = {
    id: number;
    name: string;
    active: boolean;
  };
  const printData = (axn: UserData) => {
    console.log(axn.id);
    console.log(axn.name);
    console.log(axn.active);
  };
  const calculate = (num1: number, num2: number): number => {
    return num1 + num2;
  };

  const handleCounter = (axn: ActionType) => {
    if (axn == "incr") {
      setCntr((p) => p + 1);
    } else if (axn == "decr") {
      if (cntr > 1) {
        setCntr((p) => p - 1);
      }
    } else if (axn == "reset") {
      setCntr(0);
    } else {
      const result = calculate(1, 2);
      console.log(result);
    }
  };
  return (
    <Box sx={{ width: 300, margin: "auto", mt: 5 }}>
      <Stack spacing={3} direction="row">
        <TextField variant="outlined" value={cntr} disabled />
      </Stack>
      <Stack spacing={1} direction="row">
        <Button
          variant="contained"
          onClick={() => handleCounter(ActionType.INCREMENT)}
        >
          +
        </Button>
        <Button
          variant="contained"
          onClick={() => handleCounter(ActionType.DECREMENT)}
        >
          -
        </Button>
        <Button
          variant="contained"
          onClick={() => handleCounter(ActionType.RESET)}
        >
          Reset
        </Button>
        <Button
          onClick={() => printData({ id: 101, name: "ankita", active: true })}
        >
          Print userdata
        </Button>
      </Stack>
    </Box>
  );
}

export default IncrDecr;
